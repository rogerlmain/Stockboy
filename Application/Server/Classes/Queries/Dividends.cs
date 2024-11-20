using Stockboy.Models;

namespace Stockboy.Classes.Queries {

	public static class DividendQueries {

		public static IQueryable<DividendModel> SelectQuery (DataContext context) { 
			return from dvd in context.dividends
			join brk in context.brokers on dvd.broker_id equals brk.id
			join tck in context.tickers on dvd.ticker_id equals tck.id
			where (!dvd.deleted)
			select new DividendModel () {
				id = dvd.id,
				broker = brk.name,
				company = tck.name,
				ticker = tck.symbol,
				broker_id = dvd.broker_id,
				ticker_id = dvd.ticker_id,
				issue_date = dvd.issue_date,
				amount_per_share = dvd.amount_per_share,
				share_quantity = dvd.share_quantity,
				payout = dvd.amount_per_share * dvd.share_quantity
			};
		}// SelectQuery;


		public static IEnumerable<DividendSummary> GetDividendTotals (DataContext context) {
			return from dvd in context.dividends
			group dvd by new {
				dvd.broker_id,
				dvd.ticker_id,
			} into dvg
			select new DividendSummary () {
				broker_id = dvg.Key.broker_id,
				ticker_id = dvg.Key.ticker_id,
				payout = dvg.Sum (div => div.amount_per_share * div.share_quantity)
			};
		}// GetDividendTotals;



		public static DividendModel? GetDividendById (DataContext context, Guid id) { 
			return SelectQuery (context).Where ((DividendModel item) => item.id == id).FirstOrDefault ();
		}// GetDividendById;
		
	}// DividendQueries;

}// Stockboy.Classes.Queries;