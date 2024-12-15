using Microsoft.AspNetCore.Mvc;
using Server.Classes;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Activity (DataContext context): BaseController (context) {

		[HttpPost]
		[Route ("GetActivity")]
		public IActionResult GetActivity ([FromBody] StockModel parameters) {
			try {

				Decimal total_quantity = 0;

				ActivityModelList activity = ActivityQueries.get_activity (context, parameters.broker_id, parameters.ticker_id).ToList ();

				foreach (ActivityModel item in activity) {

					if (item.transaction_type == "Dividend") {
						item.quantity = null;
						item.total_quantity = null;
						continue;
					}

					if (item.transaction_type == "Split") {
						item.total_quantity = total_quantity = (total_quantity * item.quantity!.Value);
						continue;
					}// if;

					if ((item.transaction_type == "Buy") || (item.transaction_type == "Reinvestment")) item.total_quantity = total_quantity += item.quantity ?? 0;
					
					if (item.transaction_type == "Sell") item.total_quantity = total_quantity -= item.quantity!.Value;

				}// foreach

				return new JsonResult (activity);

			} catch (Exception except) {
				return this.error_message (except.Message);
			}// try;
		}// GetActivity;

	}// Activity;

}// Stockboy.Controllers;