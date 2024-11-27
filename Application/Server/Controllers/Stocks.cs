using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;

namespace Stockboy.Controllers {

	public class Stocks (DataContext context, StockAPIClient client): Controller {

		[HttpPost]
		[Route ("GetHoldings")]
		public async Task<IActionResult?> GetHoldings ([FromBody] UserCredentialsRecord user) {
			try {

				DividendsHandler dividends = new (context);
				HoldingsData holdings_data = await HoldingsData.Create (context, client);
				HoldingsModelList? price_list = holdings_data.HoldingsPriceList (user.user_id);

				if (is_null (price_list)) return new JsonResult (null);//new JsonResult (new { data = no_data });

				return new JsonResult (new HomeModel () {
					payments_list = dividends.GetPendingPayments (user.user_id, holdings_data),
					holdings_list = price_list,
					monthly_payout = dividends.GetMonthlyPayout (user.user_id, price_list!)
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


		[HttpGet]
		[Route ("TestMe")]
		public IActionResult TestMe () {
			return new JsonResult (new { message = "faboo" });
		}


	}// Holdings;

}// Stockboy.Controllers;