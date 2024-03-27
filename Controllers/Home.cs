using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Data;
using Stockboy.Models;

using static Stockboy.Classes.Globals;

namespace Stockboy.Controllers {

	public class HomeController : BaseController {


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
		public async Task<IActionResult> Home () => View ("Home", Stocks.get_holdings (context));


		public HomeController (StockContext context) => this.context = context;

	}// HomeController;

}// namespace
