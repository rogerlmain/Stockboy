using Stockboy.Models;

namespace Stockboy.Classes.Queries {

	public static class ProfitLossQueries {

		public static IEnumerable<ProfitLossDetailsModel> GetProfitLossDetails (DataContext context, HoldingsModelList holdings_data) {

			return from hdd in holdings_data
				join dvd in DividendQueries.GetDividendTotals (context)
				on new { hdd.broker_id, hdd.ticker_id } equals new { dvd.broker_id, dvd.ticker_id } into dvj
			from div in dvj.DefaultIfEmpty ()

			select new ProfitLossDetailsModel () {
				user_id = current_user!.user_id,
				broker_id = hdd.broker_id ?? Guid.Empty,
				ticker_id = hdd.ticker_id ?? Guid.Empty,
				broker = hdd.broker,
				symbol = hdd.symbol,
				company = hdd.company,
				status = hdd.status,
				sales_profit = hdd.sales_profit,
				value = hdd.value ?? 0,
				value_profit = (hdd.value ?? 0) - hdd.current_purchase_cost,
				dividend_payout = div?.payout ?? Decimal.Zero,
			};
		}// GetProfitLossDetails;


		public static IEnumerable<ProfitLossModel> GetProfitLossTotals (ProfitLossDetailsList profit_loss_details) {
			return from pld in profit_loss_details
			group pld by new {
				pld.user_id,
				pld.broker_id,
				pld.ticker_id,
				pld.broker,
				pld.symbol,
				pld.status,
				pld.company,
				pld.sales_profit,
				pld.value_profit,
				pld.dividend_payout
			} into ghd
			select new ProfitLossModel () {
				user_id = ghd.Key.user_id,
				broker_id = ghd.Key.broker_id,
				ticker_id = ghd.Key.ticker_id,
				broker = ghd.Key.broker,
				symbol = ghd.Key.symbol,
				status = ghd.Key.status,
				company = ghd.Key.company,
				sales_profit = ghd.Key.sales_profit,
				//dividend_payout = ghd.Sum (plm => (plm.share_quantity) * (plm.amount_per_share)),
				value_profit = ghd.Sum (plm => plm.value_profit),
			};
		}// GetProfitLossTotals;

	}// ProfitLossQueries;

}// Stockboy.Classes.Queries;