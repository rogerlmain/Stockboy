using Mysqlx.Crud;
using Stockboy.Classes.Queries;
using Stockboy.Controllers;
using Stockboy.Models;
using System.Runtime.CompilerServices;


namespace Stockboy.Classes {

	public class HoldingsData {

		private const int batch_size = 5;


		private readonly DataContext context;
		private readonly StockAPIClient client;


		private static class TransactionTypes {
			public const string buy = "Buy";
			public const string sell = "Sell";
			public const string split = "Split";
			public const string reinvestment = "Reinvestment";
		}// TransactionTypes;


		private HoldingsData (DataContext context, StockAPIClient client) {
			this.context = context;
			this.client = client;
		}// constructor;


		/********/


		private static DateTime? get_payment_date (TickerTableRecord ticker, DateTime? last_payment_date, DateTime? next_payment_date) {
			if (isset (next_payment_date)) return next_payment_date;
			if (isset (ticker.frequency) && isset (last_payment_date)) {
				DateTime payment_date = (DateTime) last_payment_date!;
				return payment_date.AddMonths ((int) ticker.frequency!);
			}// if;
			return null;
		}// get_payment_date;


		private static void set_stock_data (TickerTableRecord ticker, HistoricalStockList? dividends, ShortStockQuote? price) {

			StockDividendData last_payment_date = (from date in dividends!.historical
				where date.paymentDate < DateTime.Now
				select date
			).OrderByDescending (date => date.paymentDate).First ();

			StockDividendData? next_payment_date = (from date in dividends.historical
				where date.paymentDate > DateTime.Now select date
			).OrderBy (date => date.paymentDate).FirstOrDefault ();

			ticker.price = price?.price ?? -1;
			ticker.volume = price?.volume;

			ticker.last_payment_date = last_payment_date?.paymentDate;
			ticker.next_payment_date = get_payment_date (ticker, last_payment_date?.paymentDate, next_payment_date?.paymentDate);
			ticker.ex_dividend_date = next_payment_date?.recordDate;
			ticker.dividend_payout = next_payment_date?.dividend ?? last_payment_date?.dividend;

		}// set_stock_data;


		private List<DividendHistoryList>? dividend_history_query (StockDividendHistory? history) {

			if (is_null (history)) return null;

			List<DividendHistoryList>? result = (from his in history!.historicalStockList
				join tck in context.tickers on his.symbol equals tck.symbol
				select (from hpy in his.historical select new DividendHistory () {
					ticker_id = tck.id,
					symbol = tck.symbol,
					payment_date = hpy.paymentDate ?? DateTime.MinValue
				}).OrderByDescending (dhq => dhq.payment_date).Take (2).ToList ()
			).ToList ();

			return result;

		}// dividend_history_query;


		private StockDividendHistory? update_dividend_frequency (StockDividendHistory? history, TickersTableList tickers) {

			List<DividendHistoryList>? history_list = dividend_history_query (history);

			if (is_null (history_list)) return null;

            foreach (DividendHistoryList items in history_list!) {
				if (items.Count < 2) continue;
				tickers = context.tickers.Where (tkr => tkr.id == items [0].ticker_id).ToList ();
				tickers.ForEach (tck => {
					tck.frequency = (int) Math.Round ((items [0].payment_date - items [1].payment_date).Days / 30.437);
					if (tck.frequency < 1) tck.frequency = 1;
				});
				context.SaveChanges ();
            }// foreach;

			return history;

		}// update_dividend_frequency;


		private async Task<StockDividendHistory?> get_dividend_history (StringList symbols) {

			int index = 0;
			StockDividendHistory? result = null;

			while (index < symbols.Count) {
				StockDividendHistory? sublist = await client.GetDividendHistory (String.Join (comma, symbols.Skip (index).Take (batch_size)));
				if (isset (sublist)) {
					result ??= new ();
					result.historicalStockList = result.historicalStockList.Concat (sublist!.historicalStockList).ToArray ();
				}// if;
				index += batch_size;
			}// while;

			return result;

		}// get_dividend_history;


		private async Task update_stock_data () {
			try {
				SettingsTableRecord? settings = (from set in context.settings where set.name == "last_updated" select set).FirstOrDefault ();

				if (isset (settings) && DateTime.Parse (settings!.value).LaterThan (DateTime.Now.AddHours (-1))) return;

				TickersTableList tickers = (from ticker in context.tickers.ToList ()
					where (ticker.price != -1) select ticker).ToList ();

				if (tickers.Count == 0) return;

				StringList symbols = (from tck in tickers select tck.symbol).ToList ();
				ShortStockQuoteList? stock_prices = await client.GetStockQuotes (String.Join (comma, symbols)) ?? this.Abort ();
				StockDividendHistory? dividend_data = update_dividend_frequency (await get_dividend_history (symbols), tickers!) ?? this.Abort ();

				if (is_null (stock_prices) && is_null (dividend_data)) return; // Nothing to update

				symbols.ForEach ((string symbol) => {
					TickerTableRecord ticker = (tickers!.Find ((TickerTableRecord ticker) => ticker.symbol == symbol))!;
					ShortStockQuote? price = stock_prices?.Find ((ShortStockQuote stock_price) => stock_price.symbol == symbol);
					HistoricalStockList? dividends = dividend_data?.historicalStockList?.Find ((HistoricalStockList item) => item.symbol == symbol);

					if (isset (dividends?.historical)) set_stock_data (ticker, dividends, price);
					
				});

				if (not_set (settings)) settings = new SettingsTableRecord () { name = "last_updated" };

				settings!.value = DateTime.Now.ToString ();
				context.settings.Save (settings);

			} catch (Exception except) {
				if (except is not AbortException) throw;
			}// try;

		}// update_stock_data;


		/********/


		public HoldingsModelList? GetHoldingsData (Guid user_id, StockDateModelList? report_dates = null) {

			String? previous_broker = null;
			String? previous_company = null;

			HoldingsModelList? holdings = null;
			HoldingsModel? holding = null;

			ActivityViewList activity = (from atv in context.activity_view.ToList ()
				where is_null (report_dates) || atv.transaction_date.EarlierThan ((from rdt in report_dates
					where 
						(rdt.ticker_id == atv.ticker_id) &&
						(atv.user_id == user_id)
					select rdt.date).FirstOrDefault ()
				) select atv
			).ToList ();

			foreach (ActivityView item in activity) {

				if ((item.broker != previous_broker) || (item.company != previous_company)) {

					if (item.transaction_type != TransactionTypes.buy) continue; // Initial buy required. None registered. Move on.

					holding = new () {
						broker_id = item.broker_id,
						ticker_id = item.ticker_id,
						broker = item.broker,
						symbol = item.symbol,
						company = item.company,
						cost_price = item.cost_price,
						current_price = item.current_price,
					};

					(holdings ??= new ()).Add (holding);
				}// if;

				if ((item.transaction_type == TransactionTypes.buy) || (item.transaction_type == TransactionTypes.reinvestment)) {

					Decimal purchase_price = (item.cost_price * item.quantity).round (2);

					holding!.total_purchase_cost += purchase_price;
					holding!.current_purchase_cost += purchase_price;
					holding!.quantity += item.quantity;

				}// if;

				if (item.transaction_type == TransactionTypes.sell) {

					Decimal per_stock_cost = (holding!.current_purchase_cost / holding!.quantity);
					Decimal sale_price = (item.cost_price * item.quantity).round (2);
					Decimal shares_remaining = (holding!.quantity - item.quantity).round (6);
					Decimal sold_stock_cost = (per_stock_cost * item.quantity);

					holding.sales_profit += (sale_price - sold_stock_cost).round (2);
					holding.total_sales_amount += sale_price.round (2);
					holding.current_purchase_cost -= sold_stock_cost.round (2);
					holding.quantity = shares_remaining;

				}// if;

				if (item.transaction_type == TransactionTypes.split) holding!.quantity = (holding.quantity * item.quantity).round (6);

				previous_broker = item.broker;
				previous_company = item.company;

			}// foreach;

			return holdings;

		}// GetHoldingsData;


		public HoldingsModelList? HoldingsPriceList (Guid user_id, StockDateModelList? report_dates = null) {

			HoldingsModelList? holdings = GetHoldingsData (user_id, report_dates);

			if (is_null (holdings)) return null;
			TickersTableList stock_prices = context.tickers.ToList ();

			holdings!.ForEach ((HoldingsModel holding) => {
				TickerTableRecord? stock_price = stock_prices?.Find ((TickerTableRecord item) => holding.ticker_id == item.id);
				if (isset (stock_price)) holding.current_price = stock_price?.price;
				holding.value = (holding.current_price < 0) ? 0 : holding.quantity * holding.current_price;
				holding.status = (holding.current_price == -1) ? HoldingStatus.defunct : ((holding.quantity == 0) ? HoldingStatus.dead : HoldingStatus.live);
			});

			return holdings;
		
		}// HoldingsPriceList;


		public ProfitLossModelList? GetProfitLossList (Guid user_id) {

  			HoldingsModelList? holdings_data = HoldingsPriceList (user_id);

			if (is_null (holdings_data)) return null;

			ProfitLossDetailsList profit_loss_details = ProfitLossQueries.GetProfitLossDetails (context, holdings_data!).ToList ();

			return (from pld in ProfitLossQueries.GetProfitLossDetails (context, holdings_data!) 
			select new ProfitLossModel () {
				broker_id = pld.broker_id,
				ticker_id = pld.ticker_id,
				broker = pld.broker,
				symbol = pld.symbol,
				company = pld.company,
				status = pld.status,
				sales_profit = pld.sales_profit,
				dividend_payout = pld.dividend_payout,
				value_profit = pld.value_profit,
				overall_profit = pld.sales_profit + pld.value_profit + pld.dividend_payout,
			}).ToList ();

		}// GetProfitLossList;


		public async static Task<HoldingsData> Create (DataContext context, StockAPIClient client) {
			HoldingsData holdings_data = new (context, client);
			await holdings_data.update_stock_data ();
			return holdings_data;
		}// Create;

	}// HoldingsData;

}// Stockboy.Classes;