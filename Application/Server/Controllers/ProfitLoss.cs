using Microsoft.AspNetCore.Mvc;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class ProfitLoss: BaseController {

		[HttpPost]
		[Route ("GetProfitAndLoss")]
		public async Task<IActionResult> GetProfitAndLoss () {
			ProfitLossModelList? profit_loss_list = (await HoldingsData.Current (http_context)).GetProfitLossList ();
			return new JsonResult (is_null (profit_loss_list) ? new { data = no_data } : profit_loss_list);
		}// GetProfitAndLoss;

	}// ProfitLoss;

}// Stockboy.Controllers