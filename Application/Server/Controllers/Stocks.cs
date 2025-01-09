using Microsoft.AspNetCore.Mvc;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class StocksController: BaseController {

		[HttpPost]
		[Route ("GetHoldings")]
		public async Task<IActionResult> GetHoldings () {

			//DividendsHandler dividends = new (data_context);
			//HoldingsData holdings_data = await HoldingsData.Current (http_context);
			//HoldingsModelList? price_list = holdings_data.GetHoldings ();

			//if (is_null (price_list)) return new JsonResult (null);

			//return new JsonResult (new HomeModel () {
			//	payments_list = dividends.GetPendingPayments (holdings_data),
			//	holdings_list = price_list,
			//	monthly_payout = dividends.GetMonthlyPayout (price_list!)
			//});

return null;

		}// GetHoldings;


		[HttpPost]
		[Route ("GetStockDetails")]
		public IActionResult GetStockDetails ([FromBody] StockModel stock) {
			return new JsonResult (new StockDetails (http_context).GetStockDetails (stock));
		}// GetStockDetails;

	}// Holdings;

}// Stockboy.Controllers;