using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Tickers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetTickers")]
		public IActionResult GetTickers () => new JsonResult (context?.tickers.SelectAll ().OrderBy ("name")?.Where (ticker => !ticker.deleted));


		[HttpPost]
		[Route ("SaveTicker")]
		public IActionResult SaveTicker ([FromBody] TickerModel ticker) => context.tickers.Save (ticker);


		[HttpPost]
		[Route ("DeleteTicker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (context.tickers, parameters);

	}// Tickers;

}// Stockboy.Server.Controllers;