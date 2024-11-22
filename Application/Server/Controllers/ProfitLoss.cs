﻿using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;


namespace Stockboy.Controllers {

	public class ProfitLoss (DataContext context, StockAPIClient client): Controller {

		[HttpGet]
		[Route ("GetProfitAndLoss")]
		public async Task<IActionResult> GetProfitAndLoss () {
			try {
				ProfitLossModelList? profit_loss_list = (await HoldingsData.Create (context, client)).GetProfitLossList ();
				return new JsonResult (is_null (profit_loss_list) ? new { data = no_data } : profit_loss_list);
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetProfitAndLoss;

	}// ProfitLoss;

}// Stockboy.Controllers