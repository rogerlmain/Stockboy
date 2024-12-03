using Stockboy.Models;

namespace Stockboy.Classes.Queries {

	public static class SplitsQueries {

		public static IQueryable<SplitListModel> get_splits (DataContext context) => (from spl in context.splits
			join brk in context.brokers on spl.broker_id equals brk.id 
			join tck in context.tickers on spl.ticker_id equals tck.id
			select new SplitListModel () {
				id = spl.id,
				broker_id = brk.id,
				ticker_id = tck.id,
				broker = brk.name ?? String.Empty,
				company = tck.name ?? String.Empty,
				symbol = tck.symbol,
				previous = spl.previous,
				current = spl.current,
				split_date = spl.split_date
			}
		);

	}// SplitsQuery;

}// Stockboy.Classes.Queries