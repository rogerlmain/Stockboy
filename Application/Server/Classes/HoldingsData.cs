global using GuidList = System.Collections.Generic.List<System.Guid>;
global using IntegerList = System.Collections.Generic.List<int>;

global using ActivityViewQueryable = System.Linq.IQueryable<Stockboy.Models.ActivityView>;


using Stockboy.Models;


namespace Stockboy.Classes {

	public class HoldingsData {

		private const int batch_size = 5;


		private readonly DataContext data_context;
		private readonly StockAPIClient stock_api_client;


		private ActivityDataList? activity = null;
		private HoldingsStatusList? holdings_status = null;
		private Boolean refreshing = false;


		private static class TransactionTypes {
			public const string buy = "Buy";
			public const string sell = "Sell";
			public const string split = "Split";
			public const string reinvestment = "Reinvestment";
			public const string dividend = "Dividend";
		}// TransactionTypes;


		GuidList? DefunctStocks { get { return (from tck in data_context.tickers where tck.price == -1 select (Guid) tck.id!).ToList (); } }


		private ActivityDataList? GetActivityData (string? transaction_type) {

			ActivityDataList? activity = (from atv in data_context.activity_view 
				where atv.transaction_type != TransactionTypes.dividend
				select atv
			).ToList ().Downcast<ActivityDataList> ();


			if (activity is not null) foreach (ActivityData view in activity) {

				ActivityData? previous = (from act in activity
					where
						(act.broker_id == view.broker_id) &&
						(act.ticker_id == view.ticker_id) &&
						(activity.IndexOf (act) == (activity.IndexOf (view) - 1))
					select act
				).OrderByDescending (view => view.transaction_date).FirstOrDefault ();

				if (previous is null) {
					view.total_quantity = view.quantity;
					view.total_cost = (view.quantity * view.cost_price);
					continue;
				}// if;

				if (view.transaction_type == TransactionTypes.split) {
					view.total_quantity = previous.total_quantity * view.quantity;
					view.total_cost = previous.total_cost * view.quantity;
					continue;
				}// if;

				if (view.transaction_type == TransactionTypes.sell) {
					view.total_quantity = previous.total_quantity - view.quantity;
					view.total_cost = previous.total_cost - (view.quantity * view.cost_price);
					continue;
				}// if;

				if (transaction_type is null || (view.transaction_type == transaction_type)) {
					view.total_quantity = previous.total_quantity + view.quantity;
					view.total_cost = previous.total_cost + (view.quantity * view.cost_price);
				}// if;

			}// if;

			return activity;

		}// GetActivityData;


		private ActivityDataList? GetActivityData () => GetActivityData (null);


		private DividendSummaryList GetDividendHoldings () {

			ActivityViewQueryable dividend_list = (from dividends in data_context.activity_view 
				where (dividends.transaction_type == TransactionTypes.dividend) &&
					(dividends.transaction_date > (from activity in data_context.activity_view 
						where (activity.transaction_type == TransactionTypes.sell)
						select activity.transaction_date
					).Max ())
				select dividends
			);

			DividendSummaryList result = (from dividends in dividend_list
				group dividends by new {dividends.broker_id, dividends.ticker_id} into totals
				select new DividendSummary () {
					broker_id = totals.Key.broker_id,
					ticker_id = totals.Key.ticker_id,
					payout = totals.Sum ((ActivityView activity) => activity.payment_amount) ?? 0
				}
			).ToList ();

			return result;

		}// GetDividendHoldings;


		private HoldingsData (HttpContext context) {
			data_context = context.RequestServices.GetRequiredService<DataContext> ();
			stock_api_client = context.RequestServices.GetRequiredService<StockAPIClient> ();
		}// constructor;


		private static DateTime? GetPaymentDate (TickerTableModel ticker, DateTime? last_payment_date, DateTime? next_payment_date) {
			if (isset (next_payment_date)) return next_payment_date;
			if (isset (ticker.frequency) && isset (last_payment_date)) {
				DateTime payment_date = (DateTime) last_payment_date!;
				return payment_date.AddMonths ((int) ticker.frequency!);
			}// if;
			return null;
		}// GetPaymentDate;


		private async Task<StockDividendHistory?> GetDividendHistories (StringList symbols) {

			int index = 0;
			StockDividendHistory? result = null;

			while (index < symbols.Count) {
				StockDividendHistory? sublist = await stock_api_client.GetDividendHistories (String.Join (comma, symbols.Skip (index).Take (batch_size)));
				if (isset (sublist)) {
					result ??= new ();
					result.historicalStockList = result.historicalStockList.Concat (sublist!.historicalStockList).ToArray ();
				}// if;
				index += batch_size;
			}// while;

			return result;

		}// GetDividendHistories;


		private List<DividendHistoryList>? DividendHistoryQuery (StockDividendHistory? history) {

			if (is_null (history)) return null;

			List<DividendHistoryList>? result = (from his in history!.historicalStockList
				join tck in data_context.tickers on his.symbol equals tck.symbol
				select (from hpy in his.historical select new DividendHistory () {
					ticker_id = tck.id,
					symbol = tck.symbol,
					payment_date = hpy.paymentDate ?? DateTime.MinValue
				}).OrderByDescending (dhq => dhq.payment_date).Take (2).ToList ()
			).ToList ();

			return result;

		}// DividendHistoryQuery;


		private StockDividendHistory? UpdateDividendFrequencyList (StockDividendHistory? history) {

			List<DividendHistoryList>? history_list = DividendHistoryQuery (history);

			if (is_null (history_list)) return null;

            foreach (DividendHistoryList items in history_list!) {
				if (items.Count < 2) continue;
				TickersTableList tickers = data_context.tickers.Where (tkr => tkr.id == items [0].ticker_id).ToList ();
				tickers.ForEach (tck => {
					tck.frequency = (int) Math.Round ((items [0].payment_date - items [1].payment_date).Days / 30.437);
					if (tck.frequency < 1) tck.frequency = 1;
				});
				data_context.SaveChanges ();
            }// foreach;

			return history;

		}// UpdateDividendFrequencies;


		private async Task UpdateStockData () {

			TickersTableList tickers = (from ticker in data_context.tickers.ToList () where (ticker.price != -1) select ticker).ToList ();

			if (tickers.Count == 0) return;

			StringList symbols = (from tck in tickers select tck.symbol).ToList ();
			ShortStockQuoteList? stock_prices = await stock_api_client.GetStockQuotes (String.Join (comma, symbols)) ?? this.Abort ();
			StockDividendHistory? dividend_data = UpdateDividendFrequencyList (await GetDividendHistories (symbols)) ?? this.Abort ();

			if (is_null (stock_prices) && is_null (dividend_data)) return; // Nothing to update

			symbols.ForEach ((string symbol) => {
				TickerTableModel ticker = (tickers!.Find ((TickerTableModel ticker) => ticker.symbol == symbol))!;
				ShortStockQuote? price = stock_prices?.Find ((ShortStockQuote stock_price) => stock_price.symbol == symbol);
				HistoricalStockList? dividends = dividend_data?.historicalStockList?.Find ((HistoricalStockList item) => item.symbol == symbol);

				if (isset (dividends?.historical)) SetStockData (ticker, dividends, price);
					
			});

		}// UpdateStockData;


		private async Task LoadStockPrices () {

  			SettingsTableRecord? settings = (from set in data_context.settings where set.name == "last_updated" select set).FirstOrDefault ();

			if (not_set (settings) || DateTime.Parse (settings!.value).EarlierThan (DateTime.Now.AddHours (-1)) || refreshing) {

				await UpdateStockData ();
				if (settings is null) settings = new () { name = "last_updated" };

				settings!.value = DateTime.Now.ToString ();
				data_context.settings.Save (settings);

			}// if;

		}// LoadStockPrices;


		/********/


		public ActivityDataList? GetActivity { get { return activity; } }
		public HoldingsStatusList? GetStatus { get { return holdings_status; } }


		public HoldingsModelList? GetActivityList (string? transaction_type = null) {

			ActivityDataList? activity_list = (transaction_type is null) ? activity : GetActivityData (transaction_type);

			HoldingsModelList? result = (activity_list is null) ? null : (from act in activity_list
				group act by new {
					act.broker_id,
					act.ticker_id
				} into gac
				select gac.Last () into lga
				select new HoldingsModel () {
					broker_id = lga.broker_id,
					ticker_id = lga.ticker_id,
  					broker = lga.broker,
					company = lga.company,
					symbol = lga.symbol,
					quantity = lga.total_quantity ?? 0,
					current_price = lga.current_price,
					current_purchase_cost = lga.total_cost
				}// select;
			).ToList ();

			return (result?.Count == 0) ? null : result;

		}// ActivityList;


		public static int? GetDividendFrequency (HistoricalStockList? history) {

			IntegerList? frequencies = null;
			DateTime? previous_paydate = null;

			if (history is null) return null;

			foreach (StockDividendData data in history!.historical.ToList ().Take (12).ToList ().Sort ("paymentDate")) {

				if ((previous_paydate is not null) && (data.paymentDate is not null)) {

					int lapse = (int) Math.Round (((DateTime) data.paymentDate! - (DateTime) previous_paydate!).Days / 30.437);

					if (lapse > 0) {
						frequencies ??= new ();
						frequencies.Add (lapse);
					}// if;

				}// if;

				previous_paydate = data.paymentDate;

			}// foreach;

			if (frequencies is null) return null;
			return (int) Math.Round (frequencies.Average ());

		}// GetDividendFrequency;


		public static async Task<StockStatistics> GetStockStatistics (HttpContext context, String symbol) {

			HoldingsData data = new HoldingsData (context);

			StockAPIClient api_client = context.RequestServices.GetRequiredService<StockAPIClient> ();
			ShortStockQuoteList? stock_prices = await data.stock_api_client.GetStockQuotes (String.Join (comma, symbol));

			return new StockStatistics () {
				price = (await data.stock_api_client.GetStockQuotes (String.Join (comma, symbol)))?.FirstOrDefault (),
				history = await api_client.GetDividendHistory (symbol)
			}; 

		}// GetStockStatistics;


		public static void SetStockData (TickerTableModel ticker, HistoricalStockList? dividends, ShortStockQuote? price) {

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
			ticker.next_payment_date = GetPaymentDate (ticker, last_payment_date?.paymentDate, next_payment_date?.paymentDate);
			ticker.ex_dividend_date = next_payment_date?.recordDate;
			ticker.dividend_payout = next_payment_date?.dividend ?? last_payment_date?.dividend;

		}// SetStockData;


		public HoldingsStatusList? GetHoldingsStatus () {

			TickersTableList tickers = (from tck in data_context.tickers 
				where tck.price != -1
				select tck
			).ToList ();

			return (from tck in tickers
				join ftr in (
					from ftr in (
						from tra in (
							from act in activity
							group act by new {
								act.ticker_id,
								act.broker_id,
							} into gct
							select new {
								gct.Last ().ticker_id,
								gct.Last ().broker_id,
								quantity = gct.Last ().total_quantity
							}
						) 
						select new {
							tra.broker_id,
							tra.ticker_id,
							tra.quantity
						}
					) 
					group ftr by ftr.ticker_id into gtr
					select new {
						ticker_id = gtr.Key,
						quantity = gtr.Sum (hld => hld.quantity)
					}
				) on tck.id equals ftr.ticker_id into jtr
				from jtt in jtr.DefaultIfEmpty ()
				select new HoldingsStatusModel () {
					ticker_id = (Guid) tck.id!,
					status = (jtt?.quantity > 0) ? HoldingStatus.live : HoldingStatus.dead
				}
			).Union (from dst in (from dst in DefunctStocks select new HoldingsStatusModel () {
				ticker_id = dst,
				status = HoldingStatus.defunct
			}) select dst).ToList ();

		}// GetHoldingsStatus;


		public ProfitLossModelList? GetProfitAndLoss () {

			HoldingsModelList? reinvestment_list = GetActivityList (TransactionTypes.reinvestment);
			DividendSummaryList dividend_holdings = GetDividendHoldings ();

			ProfitLossModelList result = (from buys in GetActivityList (TransactionTypes.buy)
				join reinvestments in reinvestment_list on new {
					buys.broker_id,
					buys.ticker_id
				} equals new {
					reinvestments.broker_id,
					reinvestments.ticker_id
				}
				join dividends in dividend_holdings on new {
					buys.broker_id,
					buys.ticker_id
				} equals new {
					dividends.broker_id,
					dividends.ticker_id
				}
				select new ProfitLossModel () {
					broker = buys.broker,
					company = buys.company,
					symbol = buys.symbol,
					sales_profit = 0,		// FIX THIS - GET SALES SUBTRACTED FROM COSTS
					dividend_payout = dividends.payout,
					value_profit = buys.profit,
					reinvestment_profit = buys.profit + reinvestments.profit,
					overall_profit = buys.profit + reinvestments.profit + dividends.payout
				}
			).ToList ();

			return result;

		}// GetProfitLossList;


		public HoldingsModelList? HoldingsPriceList (StockDateModelList dates) {
			// DO MORE HERE
			return null;
		}// HoldingsPriceList;


		public static async Task<HoldingsData> Current (HttpContext context, Boolean refresh = false) {

			HoldingsData? holdings_data = new (context);

			holdings_data.refreshing = refresh;
			
			await holdings_data.LoadStockPrices ();

			holdings_data.activity = refresh ? holdings_data.GetActivityData () : context.Session.GetSessionData<ActivityDataList> ("activity", holdings_data.GetActivityData);
			holdings_data.holdings_status = refresh ? holdings_data.GetHoldingsStatus () : context.Session.GetSessionData ("status", holdings_data.GetHoldingsStatus);

			holdings_data.activity = (from act in holdings_data.activity
				join hst in holdings_data.holdings_status! on act.ticker_id equals hst.ticker_id into jst
				from jha in jst.DefaultIfEmpty ()
				select act.Merge (new { jha.status })
			).ToList ();

			return holdings_data;

		}// Current;

	}// HoldingsData;

}// Stockboy.Classes;