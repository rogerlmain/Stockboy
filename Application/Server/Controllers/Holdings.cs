using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Holdings (DataContext context, StockAPIClient client): Controller {


		[HttpGet]
		[Route ("GetHoldings")]
		public async Task<IActionResult> GetHoldings () {
			try {
				List<HoldingsModel>? holdings_list = await new HoldingsData (context, client).GetHoldingsList ();
				return new JsonResult (is_null (holdings_list) ? new { data = no_data } : holdings_list);
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetHoldings;


	}// Holdings;

}// Stockboy.Controllers;