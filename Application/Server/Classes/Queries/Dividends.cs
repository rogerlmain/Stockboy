using Stockboy.Models;

namespace Stockboy.Classes.Queries {

	public static class DividendQueries {

		public static IEnumerable<DividendSummary> GetDividendTotals (DataContext context) {
			return from dvd in context.dividends
			group dvd by new {
				dvd.broker_id,
				dvd.ticker_id,
			} into dvg
			select new DividendSummary () {
				broker_id = (Guid) dvg.Key.broker_id!,
				ticker_id = (Guid) dvg.Key.ticker_id!,
				payout = dvg.Sum (div => div.amount_per_share * div.share_quantity)
			};
		}// GetDividendTotals;

	}// DividendQueries;

}// Stockboy.Classes.Queries;