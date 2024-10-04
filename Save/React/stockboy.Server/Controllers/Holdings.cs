using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Holdings (DataContext context) : Controller {

		public static List<HoldingsModel>? GetHoldings (DataContext context) {

			List<HoldingsModel>? holdings_model = new ();
			List<HoldingsView>? holdings = context.holdings_view.SelectAll ().OrderBy ("name");

			if (is_null (holdings)) return null;

			foreach (HoldingsView holding in holdings!) {

				HoldingsModel? data = holding.Export<HoldingsModel> ();
				if (data is null) continue;

				data.cost = Math.Round (data.cost, 2);

				holdings_model ??= new ();
				holdings_model.Add (data);

			}// foreach;

			return holdings_model;

		}// GetHoldings;


		private DataContext? context { get; set; } = context;


		[HttpGet]
		[Route ("GetHoldings")]
		public IActionResult GetHoldings () {
			try {
				return new JsonResult (GetHoldings (context!));
			} catch (Exception except) { 
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetHoldings;

	}// Holdings;

}// Stockboy.Server.Controllers;