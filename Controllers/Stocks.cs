using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Data;

namespace Stockboy.Controllers {


	public class TickerModel {
		public string? ticker { get; set; } = String.Empty;
	}


	public class StocksController : BaseController {

		[Route ("lookup")]
		[HttpPost]
		public async Task<IActionResult> Lookup ([FromBody] TickerModel ticker) => new JsonResult (await Stocks.get_stock_details (ticker.ticker));


		[Route ("UpdateHoldings")]
		public IActionResult update_holdings () => View ("Partials/CurrentHoldings", Stocks.get_holdings (context));

		
		public StocksController (StockContext context) => this.context = context;

	}

}
