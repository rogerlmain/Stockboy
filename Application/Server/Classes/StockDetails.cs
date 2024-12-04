using Stockboy.Models;

namespace Stockboy.Classes {

	public class StockDetails (DataContext context, StockAPIClient client) {

		public async Task<StockDetailsModel> GetStockDetails (StockModel stock) {

			HoldingsModelList? holdings = (await HoldingsData.Create (context, client)).GetHoldingsData ();

			StockDetailsModel result = ((
				from tck in context.tickers
				join trn in context.transactions on tck.id equals trn.ticker_id
				join tby in context.transaction_types on trn.transaction_type_id equals tby.id
				//join dvd in context.dividends on tck.id equals dvd.ticker_id
				where tck.id == stock.ticker_id && tby.name == "buy"
				select new StockDetailsModel () {
					company = tck.name ?? String.Empty,
					brokers = (from hld in holdings select $"{hld.broker} ({hld.status})").Distinct ().ToList (),
					ticker = tck.symbol,
					first_purchased = (from trn in context.transactions select trn.transaction_date).Min (),
					last_purchased = (from trn in context.transactions select trn.transaction_date).Max (),
					first_dividend_date = (from dvd in context.dividends where dvd.ticker_id == tck.id select dvd.issue_date).Min (),
					last_dividend_date = (from dvd in context.dividends where dvd.ticker_id == tck.id && dvd.issue_date < DateTime.Now select dvd.issue_date).Max (),
					next_dividend_date = (from dvd in context.dividends where dvd.ticker_id == tck.id && dvd.issue_date > DateTime.Now select dvd.issue_date).Min ()
				}
			)).Distinct ().First ();

			return result;

		}// GetStockDetails;

	}// StockDetails;

}// Stockboy.Classes;