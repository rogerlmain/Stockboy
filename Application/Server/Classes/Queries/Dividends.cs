using Stockboy.Models;

namespace Stockboy.Classes.Queries {

	public static class DividendQueries {

		private static IQueryable<DividendListModel> select_query (DataContext context) { 
			return from dvd in context.dividends
			join brk in context.brokers on dvd.broker_id equals brk.id
			join tck in context.tickers on dvd.ticker_id equals tck.id
			where (!dvd.deleted)
			select new DividendListModel () {
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
		}// select_query;


		public static List<DividendListModel> get_dividends (DataContext context) => select_query (context).ToList ();


		public static DividendListModel? get_dividend_by_id (DataContext context, Guid id) { 
			return select_query (context).Where ((DividendListModel item) => item.id == id).FirstOrDefault ();
		}// get_dividend_by_id;
		
	}// DividendQueries;

}// Stockboy.Classes.Queries;