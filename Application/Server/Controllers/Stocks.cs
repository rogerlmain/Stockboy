using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;

namespace Stockboy.Controllers {

	public class Stocks (DataContext context, StockAPIClient client): Controller {

		[HttpGet]
		[Route ("GetHoldings")]
		public async Task<IActionResult> GetHoldings () {
			try {

				DividendsHandler dividends = new DividendsHandler (context);
				HoldingsData holdings_data = await HoldingsData.Create (context, client);
				HoldingsModelList? price_list = holdings_data.HoldingsPriceList ();

				if (is_null (price_list)) return new JsonResult (new { data = no_data });

				return new JsonResult (new HomeModel () {
					payments_list = dividends.GetPendingPayments (holdings_data),
					holdings_list = price_list,
					monthly_payout = dividends.GetMonthlyPayout (price_list!)
				});

			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetHoldings;


		[HttpPost]
		[Route ("GetStockDetails")]
		public IActionResult GetStockDetails ([FromBody] StockModel stock) {
			try {
				return new JsonResult (new StockDetails (context, client).GetStockDetails (stock));
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetStockDetails;


	}// Holdings;

}// Stockboy.Controllers;