using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Text.Json;
using System.Text.Json.Nodes;


namespace Stockboy.Server.Controllers {

	public class Holdings (DataContext context) : Controller {

		private static class TransactionTypes {
			public const string buy = "Buy";
			public const string sell = "Sell";
			public const string split = "Split";
		}// TransactionTypes;


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

						if (item.transaction_type == TransactionTypes.split) continue; // Not a split. Move on.

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

					if (item.transaction_type == TransactionTypes.buy) {

						Decimal purchase_price = (item.cost_price * item.quantity).round (2);

						holding.total_purchase_cost += purchase_price;
						holding.current_purchase_cost += purchase_price;
						holding.quantity += item.quantity;

					}// if;
					if (item.transaction_type == TransactionTypes.sell) {

						Decimal per_stock_cost = (holding.current_purchase_cost / holding.quantity);
						Decimal sale_price = (item.cost_price * item.quantity).round (2);
						Decimal shares_remaining = (holding.quantity - item.quantity).round (6);
						Decimal sold_stock_cost = (per_stock_cost * item.quantity);

						holding.sales_profit += (sale_price - sold_stock_cost).round (2);
						holding.total_sales_amount += sale_price.round (2);
						holding.current_purchase_cost -= sold_stock_cost.round (2);
						holding.quantity = shares_remaining;

					}// if;

					if (item.transaction_type == TransactionTypes.split) holding.quantity = (holding.quantity * item.quantity).round (6);

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