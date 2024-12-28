using Stockboy.Controllers.Abstract;
using Stockboy.Models;

namespace Stockboy.Classes {

	public class StockDetails (HttpContext http_context): BaseClass (http_context) {

		public async Task<StockDetailsModel> GetStockDetails (StockModel stock) {

			HoldingsModelList holdings = (await HoldingsData.Current (http_context)).Holdings;

			StockDetailsModel result = ((
				from tck in data_context.tickers
				join trn in data_context.transactions on tck.id equals trn.ticker_id
				join tby in data_context.transaction_types on trn.transaction_type_id equals tby.id
				where tck.id == stock.ticker_id && tby.name == "buy"
				select new StockDetailsModel () {
					company = tck.name ?? String.Empty,
					brokers = (from hld in holdings select $"{hld.broker} ({hld.status})").Distinct ().ToList (),
					ticker = tck.symbol,
					first_purchased = (from trn in data_context.transactions select trn.transaction_date).Min (),
					last_purchased = (from trn in data_context.transactions select trn.transaction_date).Max (),
					first_dividend_date = (from dvd in data_context.dividends where dvd.ticker_id == tck.id select dvd.issue_date).Min (),
					last_dividend_date = (from dvd in data_context.dividends where dvd.ticker_id == tck.id && dvd.issue_date < DateTime.Now select dvd.issue_date).Max (),
					next_dividend_date = (from dvd in data_context.dividends where dvd.ticker_id == tck.id && dvd.issue_date > DateTime.Now select dvd.issue_date).Min ()
				}
			)).Distinct ().First ();

			return result;

		}// GetStockDetails;

	}// StockDetails;

}// Stockboy.Classes;