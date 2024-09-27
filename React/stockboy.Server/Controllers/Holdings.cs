using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Holdings (DataContext context) : Controller {

		public async static Task<List<HoldingsModel>?> GetHoldings (DataContext context) {

			List<HoldingsView>? holdings = context.holdings_view.SelectAll ().OrderBy ("name");
			List<HoldingsModel>? holdings_model = new ();

			StockDetailsModel? stock_details = await APIs.get_stock_details (String.Join (comma, holdings.Select (holding => holding.symbol).ToArray ()));

			foreach (HoldingsView holding in holdings) {
				HoldingsModel? data = holding.Export<HoldingsModel> ();
				if (data is null) continue;

				data.cost = Math.Round (data.cost, 2);
				data.price = Math.Round (stock_details?.get_details (data.symbol)?.regularMarketPrice ?? 0, 2);
				data.value = Math.Round (data.quantity * data.price ?? 0, 2);
				data.profit = Math.Round (data.value - data.cost ?? 0, 2);

				holdings_model ??= new ();
				holdings_model.Add (data);
			}
			return holdings_model;

		}// GetHoldings;


		private DataContext? context { get; set; } = context;


		[HttpGet]
		[Route ("GetHoldings")]
		public async Task<IActionResult> GetHoldings () => new JsonResult (await GetHoldings (context!));

	}// Holdings;

}// Stockboy.Server.Controllers;