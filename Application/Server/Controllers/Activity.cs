using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Activity: BaseController {

		[HttpPost]
		[Route ("GetActivity")]
		public async Task<IActionResult> GetActivity ([FromBody] StockModel parameters) {

			ActivityDataList? data = (await HoldingsData.Current (http_context)).GetActivity;

			Decimal total_quantity = 0;
			Decimal total_cost = 0;

			ActivityModelList activity = ActivityQueries.get_activity (data_context, parameters.broker_id, parameters.ticker_id).ToList ();

			foreach (ActivityModel item in activity) {

				if (item.transaction_type == "Split") {
					item.total_quantity = total_quantity *= item.quantity!.Value;
					continue;
				}// if;

				item.cost = item.quantity * item.price;

				if (item.transaction_type == "Dividend") item.total_quantity = null;

				if ((item.transaction_type == "Buy") || (item.transaction_type == "Reinvestment")) {
					item.total_quantity = total_quantity += item.quantity ?? 0;
					item.total_cost = total_cost += item.cost ?? 0;
				}// if;

				if (item.transaction_type == "Sell") {
					item.total_quantity = total_quantity -= item.quantity ?? 0;
					item.total_cost = total_cost -= item.cost ?? 0;
				}// if;

			}// foreach

			return new JsonResult (activity);

		}// GetActivity;

	}// Activity;

}// Stockboy.Controllers;