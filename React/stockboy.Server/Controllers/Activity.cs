using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Classes.Queries;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Activity (DataContext context): Controller {

		[HttpPost]
		[Route ("GetActivities")]
		public IActionResult GetActivities ([FromBody] StockModel parameters) {
			try {

				Decimal total_quantity = 0;

				List<ActivityModel> activity = ActivityQueries.get_activity (context, parameters.broker_id, parameters.ticker_id).ToList ();

				foreach (ActivityModel item in activity) {

					if (item.transaction_type == "Dividend") {
						item.quantity = null;
						item.total_quantity = null;
						continue;
					}

					if (item.transaction_type == "Split") {
						item.total_quantity = total_quantity = (total_quantity * item.quantity.Value);
						continue;
					}// if;

					if ((item.transaction_type == "Buy") || (item.transaction_type == "Reinvestment")) item.total_quantity = total_quantity += item.quantity.Value;
					
					if (item.transaction_type == "Sell") item.total_quantity = total_quantity -= item.quantity.Value;

				}// foreach

				return new JsonResult (activity);

			} catch (Exception except) {
				return this.error_message (except.Message);
			}// try;
		}// GetActivity;

	}// Activity;

}// Stockboy.Server.Controllers;