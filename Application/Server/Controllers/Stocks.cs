using Microsoft.AspNetCore.Mvc;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

public class StringModel {
	public required String junk { get; set; }
}

	public class Stocks (DataContext context, StockAPIClient client): BaseController (context) {

		[HttpPost]
		[Route ("GetHoldings")]
		public async Task<IActionResult?> GetHoldings ([FromBody] StringModel junk) {

			DividendsHandler dividends = new (context);
			HoldingsData holdings_data = await HoldingsData.Create (context, client);
			HoldingsModelList? price_list = holdings_data.HoldingsPriceList ();

			if (is_null (price_list)) return new JsonResult (null);

			return new JsonResult (new HomeModel () {
				payments_list = dividends.GetPendingPayments (holdings_data),
				holdings_list = price_list,
				monthly_payout = dividends.GetMonthlyPayout (price_list!)
			});

		}// GetHoldings;


		[HttpPost]
		[Route ("GetStockDetails")]
		public IActionResult GetStockDetails ([FromBody] StockModel stock) {
			return new JsonResult (new StockDetails (context, client).GetStockDetails (stock));
		}// GetStockDetails;

	}// Holdings;

}// Stockboy.Controllers;