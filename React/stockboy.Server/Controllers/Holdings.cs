using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Holdings (DataContext context) : Controller {


		[HttpGet]
		[Route ("GetHoldings")]
		public IActionResult GetHoldings () {
			try {

				String? previous_broker = null;
				String? previous_company = null;

				List<HoldingsModel>? holdings = null;
				List<ActivityView> activity = context.activity_view.SelectAll ();
				HoldingsModel? holding = null;

				foreach (ActivityView item in activity) {

					if ((item.broker != previous_broker) || (item.company != previous_company)) {
						holding = new () {
							broker_id = item.broker_id,
							ticker_id = item.ticker_id,
							broker = item.broker,
							symbol = item.symbol,
							company = item.company,
							cost_price = item.cost_price,
							current_price = item.current_price,
						};

						(holdings ??= new ()).Add (holding);
					}// if;

					holding!.last_updated = item.last_updated;

					switch (item.transaction_type) {
						case "Buy": holding.quantity += item.quantity; break;
						case "Sell": holding.quantity -= item.quantity; break;
						case "Split": holding.quantity *= item.quantity; break;
					}// switch;

					if (item.transaction_type == "Buy") holding!.total_purchase_price += item.cost_price * item.quantity;
					if (item.transaction_type == "Sell") holding!.total_sale_price += item.cost_price * item.quantity;

					previous_broker = item.broker;
					previous_company = item.company;

				}// foreach;

				return new JsonResult (holdings);

			} catch (Exception except) { 
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetHoldings;

	}// Holdings;

}// Stockboy.Server.Controllers;