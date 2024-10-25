namespace Stockboy.Server.Classes.Queries {

	public static class DividendQueries {

		public static dynamic? get_dividend_by_id (DataContext context, Guid id) => (from dvd in context.dividends
			join brk in context.brokers on dvd.broker_id equals brk.id
			join tck in context.tickers on dvd.ticker_id equals tck.id
			where (dvd.id == id)
			select new {
				dvd.id,
				broker = brk.name,
				company = tck.name,
				ticker = tck.symbol,
				dvd.broker_id,
				dvd.ticker_id,
				dvd.issue_date,
				dvd.amount_per_share,
				dvd.share_quantity,
				payout = dvd.amount_per_share * dvd.share_quantity
			}
		).FirstOrDefault ();

	}// DividendQueries;

}// Stockboy.Server.Classes.Queries;