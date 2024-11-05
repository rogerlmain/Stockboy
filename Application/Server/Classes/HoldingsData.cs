using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stockboy.Classes.Queries;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class HoldingsData (DataContext context, StockAPIClient client) {

		private const long one_hour = 60 * 60 * 1000;


		private static class TransactionTypes {
			public const string buy = "Buy";
			public const string sell = "Sell";
			public const string split = "Split";
			public const string reinvestment = "Reinvestment";
		}// TransactionTypes;


		/********/


		private async Task<List<TickersTable>?> get_outdated_tickers (List<HoldingsModel> holdings) {

			List<Guid>? ticker_list = null;

			holdings.ForEach ((HoldingsModel item) => {

				Boolean ticker_exists = ticker_list?.Exists (ticker => item.ticker_id == ticker) ?? false;

				if (is_null (item.ticker_id) || ticker_exists || (item.current_price == -1)) return;
				if ((DateTime.Now.UnixTimestamp () - (item.last_updated ?? DateTime.Now).UnixTimestamp ()) <= one_hour) return;
				if (is_null (ticker_list)) ticker_list = new ();

				ticker_list!.Add (item.ticker_id!.Value);
			});

			return is_null (ticker_list) ? null : context?.tickers.Where ((TickersTable item) => ticker_list!.Contains (item.id ?? Guid.Empty)).ToList ();
			
		}// get_outdated_tickers;


		private async Task<List<TickersTable>?> get_stock_prices (List<HoldingsModel> holdings) { 
			try {
				List<TickersTable>? outdated_prices = await this.get_outdated_tickers (holdings) ?? this.Abort ();
				List<string> symbol_list = (from opr in outdated_prices select opr.symbol).ToList ();
				String symbols_string = String.Join (comma, symbol_list);

				List<ShortStockQuote>? stock_prices = await client.GetStockQuotes (symbols_string);
				StockDividendHistory? dividend_data = await client.GetDividendHistory (symbols_string);

				if (is_null (stock_prices) && is_null (dividend_data)) return null; // Nothing to update

				symbol_list.ForEach ((string symbol) => {
					TickersTable ticker = (outdated_prices!.Find ((TickersTable ticker) => ticker.symbol == symbol) ?? this.Abort ())!;
					ShortStockQuote? price = stock_prices?.Find ((ShortStockQuote stock_price) => stock_price.symbol == symbol);
					HistoricalStockList? dividend = dividend_data?.historicalStockList?.Find ((HistoricalStockList item) => item.symbol == symbol);
					
					List<DateTime?>? date_list = isset (dividend) ? (
						from history in dividend?.historical
						orderby history.paymentDate descending
						select history.paymentDate
					).ToList () : null;

					ticker.price = price?.price ?? -1;
					ticker.volume = price?.volume;

					ticker.last_payment_date = date_list?.Find ((DateTime? date) => date < DateTime.Now);
					ticker.next_payment_date = date_list?.Find ((DateTime? date) => date > DateTime.Now);

					ticker.last_updated = DateTime.Now;

				});

				context.tickers.UpdateRange (outdated_prices!);
				context.SaveChanges ();

				return outdated_prices;

			} catch (Exception except) {
				if (except is not AbortException) throw;
				return null;
			}// try;
		}// get_stock_prices;


		/********/


		public List<HoldingsModel>? GetHoldingsData () {

			String? previous_broker = null;
			String? previous_company = null;

			List<HoldingsModel>? holdings = null;
			List<ActivityView> activity = context.activity_view.AsEnumerable ().ToList ();
			HoldingsModel? holding = null;

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

				holding!.last_updated = item.last_updated;

				if ((item.transaction_type == TransactionTypes.buy) || (item.transaction_type == TransactionTypes.reinvestment)) {

					Decimal purchase_price = (item.cost_price * item.quantity).round (2);

					holding.total_purchase_cost += purchase_price;
					holding.current_purchase_cost += purchase_price;
					holding.quantity += item.quantity;

				}// if;

				if (item.transaction_type == TransactionTypes.sell) {

					Decimal per_stock_cost = (holding.current_purchase_cost / holding.quantity);
					Decimal sale_price = (item.cost_price * item.quantity).round (2);
					Decimal shares_remaining = (holding.quantity - item.quantity).round (6);
					Decimal sold_stock_cost = (per_stock_cost * item.quantity);

					holding.sales_profit += (sale_price - sold_stock_cost).round (2);
					holding.total_sales_amount += sale_price.round (2);
					holding.current_purchase_cost -= sold_stock_cost.round (2);
					holding.quantity = shares_remaining;

				}// if;

				if (item.transaction_type == TransactionTypes.split) holding.quantity = (holding.quantity * item.quantity).round (6);

				previous_broker = item.broker;
				previous_company = item.company;

			}// foreach;

			return holdings;

		}// GetHoldingsData;


		public async Task<List<HoldingsModel>?> GetHoldingsList () {

			List<HoldingsModel>? holdings = GetHoldingsData ();

			if (is_null (holdings)) return null;
			List<TickersTable> stock_prices = (await this.get_stock_prices (holdings!))!;

			holdings!.ForEach ((HoldingsModel holding) => {
				TickersTable? stock_price = stock_prices?.Find ((TickersTable item) => holding.ticker_id == item.id);
				if (isset (stock_price)) holding.current_price = stock_price?.price;
				holding.value = (holding.current_price < 0) ? 0 : holding.quantity * holding.current_price;
			});

			return holdings;
		
		}// get_holdings_list;


		public async Task<List<ProfitLossModel>?> GetProfitLossList () {
  				List<HoldingsModel>? holdings_data = await new HoldingsData (context, client).GetHoldingsList ();

				if (is_null (holdings_data)) return null;

				return (from jtb in (
					from hdd in holdings_data
						join div in context.dividends on new { hdd.broker_id, hdd.ticker_id } equals new { div.broker_id, div.ticker_id } into jdv
						from ndv in jdv.DefaultIfEmpty ()
						select new {
							hdd.broker_id,
							hdd.ticker_id,
							hdd.broker,
							hdd.symbol,
							hdd.company,
							hdd.sales_profit,
							hdd.value,
							value_profit = (hdd.value ?? 0) - hdd.current_purchase_cost,
							hdd.current_purchase_cost,
							hdd.total_purchase_cost,
							ndv?.amount_per_share,
							ndv?.share_quantity
						}
					) group jtb by new {
						jtb.broker_id,
						jtb.ticker_id,
						jtb.broker,
						jtb.symbol,
						jtb.company,
						jtb.sales_profit,
						jtb.value,
						jtb.current_purchase_cost,
						jtb.total_purchase_cost
					} into ghd
					select new ProfitLossModel () {
						broker_id = ghd.Key.broker_id,
						ticker_id = ghd.Key.ticker_id,
						broker = ghd.Key.broker,
						symbol = ghd.Key.symbol,
						company = ghd.Key.company,
						sales_profit = ghd.Key.sales_profit,
						dividend_payout = ghd.Sum (ssa => (ssa.share_quantity ?? 0) * (ssa.amount_per_share ?? 0)),
						overall_profit = ghd.Key.sales_profit + ghd.Sum (ssa => (ssa.share_quantity ?? 0) * (ssa.amount_per_share ?? 0)) + ((ghd.Key.value ?? 0) - ghd.Key.current_purchase_cost)
					}
				).ToList ();

		}// GetProfitLossList;

	}// HoldingsData;

}// Stockboy.Classes;