using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Data;
using Stockboy.Models;

using static Stockboy.Classes.Globals;

namespace Stockboy.Controllers {

	public class MainController : BaseController {


		private async Task<StockDetailsModel?> get_stock_details (List<HoldingsModel> holdings) {
  			List<String>? tickers = null;

			foreach (HoldingsModel holding in holdings) {
				tickers ??= new ();
				tickers.Add (holding.ticker);
			}

			if (is_null (tickers)) throw new Exception ("Tickers is null");
			return await Stocks.get_stock_details (String.Join (comma, tickers.ToArray ()));
		}


		private decimal? get_stock_price (StockDetailsModel? stock_details, string ticker) => stock_details?.get_details (ticker)?.regularMarketPrice;


		[Route ("/")]
		public IActionResult home () {
			List<HoldingsData> holdings = Stocks.get_holdings (context);
			return View ("Home", Stocks.get_holdings (context)); //holdings.OrderByDescending (item => {
			//	return item.GetType ().BaseType?.Name;
			//})/*.ThenBy (item => item.GetType ().Name)*/.ToList ());
		}


		[Route ("/Purchases")]
		public IActionResult purchases () => View ("Purchases", Stocks.get_purchases (context));


		public MainController (StockContext context) => this.context = context;

	}// MainController;

}// namespace
