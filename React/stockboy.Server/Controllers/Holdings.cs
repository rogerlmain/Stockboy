using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Holdings (DataContext context) : Controller {


		private decimal? calculate_holding (string transaction_type, decimal? existing_value, decimal? new_value) {
			switch (transaction_type) {
				case "Buy": return existing_value + new_value;
				case "Sell": return existing_value - new_value;
				case "Split": return existing_value * new_value;
				default: return existing_value; // Should never happen
			}// switch;
		}// calculate_holding;


		/********/


		[HttpGet]
		[Route ("GetHoldings")]
		public IActionResult GetHoldings () {
			try {

				String? previous_company = null;
				List<HoldingsModel>? holdings = null;
				List<ActivityView> activity = context.activity_view.SelectAll ();
 
				foreach (ActivityView item in activity) {

					HoldingsModel? holding = null;

					if (item.company != previous_company) holding = holdings?.Find (holding => (holding.broker_id == item.broker_id) && (holding.ticker_id == item.ticker_id));

					if (is_null (holding)) {
						holding = new () {
							broker_id = item.broker_id,
							ticker_id = item.ticker_id,
							broker = item.broker,
							symbol = item.symbol,
							company = item.company,
							cost = 0,
						};

						(holdings ??= new ()).Add (holding);
					}// if;

					holding!.price = item.price;
					holding!.quantity = item.quantity;
					holding!.last_updated = item.transaction_date;

					holding!.cost = calculate_holding (item.transaction_type, holding.price * holding.quantity, item.price) ?? 0;
					holding!.quantity = calculate_holding (item.transaction_type, holding.quantity, item.quantity) ?? 0;
					
					if (item.transaction_type == "Sell") holding!.total_sale_price += holding.price * holding.quantity;

				}// foreach;

				return new JsonResult (holdings);

			} catch (Exception except) { 
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetHoldings;

	}// Holdings;

}// Stockboy.Server.Controllers;