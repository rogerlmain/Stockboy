using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Data;
using Stockboy.Models;
using Stockboy.Models.APIs;

using static Stockboy.Classes.Globals;

namespace Stockboy.Controllers {

	public class MainController : BaseController {


		private async Task<StockDetailsModel?> get_stock_details (List<HoldingsModel> holdings) {
			List<String>? tickers = null;

			foreach (HoldingsModel holding in holdings) {
				tickers ??= new ();
				tickers.Add (holding.symbol);
			}

			if (tickers is null) throw new Exception ("Tickers is null");
			return await APIs.get_stock_details (String.Join (comma, tickers.ToArray ()));
		}


		[Route ("/")]
		public async Task<IActionResult> home () => View ("Home", new TableModel () { list = await Stocks.get_holdings (context) });


		[Route ("/Dividends")]
		public async Task<IActionResult> dividends () {

			List<DividendsModel>? dividends = Stocks.get_dividends_view (context)?.Export<List<DividendsModel>> ();
			List<String> tickers = dividends.Select (dividend => dividend.symbol).Distinct ().ToList ();

			Dictionary<String, FMPHistory> histories = new ();

			foreach (String ticker in tickers) {

				DateOnly max_date = dividends.Max (dividend => dividend.issue_date);
				DateOnly min_date = dividends.Min (dividend => dividend.issue_date);

				histories.Add (ticker, new () {
					dividends = await APIs.get_historical_dividends (ticker),
					stocks = await APIs.get_historical_pricing (ticker, min_date, max_date)
				});

			}

			foreach (DividendsModel dividend in dividends) {

				FMPDividendHistoryItem historical_dividend = histories [dividend.symbol].dividends.historical.Single (value => value.paymentDate == dividend.issue_date);
				FMPDividendHistoryItem previous_historical_dividend = histories [dividend.symbol].dividends.historical [histories [dividend.symbol].dividends.historical.FindIndex (value => value == historical_dividend) - 1];

				if ((historical_dividend is not null) && (previous_historical_dividend is not null)) {
					dividend.frequency = (previous_historical_dividend.paymentDate.DayNumber - historical_dividend.paymentDate.DayNumber);
					dividend.ex_dividend_date = historical_dividend.date;
				}

				dividend.total_amount = Math.Round (dividend.amount_per_share * dividend.number_of_shares, 2);
				dividend.stock_price = histories[dividend.symbol].stocks.historical.Single (value => value.date == dividend.issue_date).close;
				dividend.percentage_yield = Math.Round (dividend.total_amount / (dividend.stock_price * dividend.number_of_shares) * 100, 2);
			}

			return View ("Dividends", new TableModel () { list = dividends });
		}


		[Route ("/Purchases")]
		public IActionResult purchases () {
			List<PurchasesView>? purchase_list = Stocks.get_purchases_view (context);

			List<TickersTable>? tickers_list = purchase_list.Select (item => new TickersTable () {
				symbol = item.symbol,
				name = item.asset
			}).DistinctBy (ticker => ticker.symbol).ToList ().OrderBy ("ticker");

			return View ("Purchases", new PurchasePageModel () {
				table_data = new TableModel () { list = purchase_list },
				tickers = tickers_list
			});
		}


		[Route ("/Tickers")]
		public IActionResult tickers () => View ("Tickers", new TableModel () { list = Stocks.get_tickers_view (context) });


		public MainController (StockContext context) => this.context = context;

	}// MainController;

}// namespace
