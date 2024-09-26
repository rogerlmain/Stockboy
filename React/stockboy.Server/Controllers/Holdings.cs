using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Classes.Data;


namespace Stockboy.Server.Controllers {

	public class Holdings: BaseController {

		[HttpGet]
		[Route ("GetHoldings")]
		public async Task<IActionResult> home () => new JsonResult (await Stocks.GetHoldings (context!));


		public Holdings (StockContext context) => this.context = context;

	}// Holdings;

}// Stockboy.Server.Controllers;