using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Tickers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetTickers")]
		public IActionResult GetTickers () => new JsonResult (context?.tickers.Where (ticker => !ticker.deleted).ToList ().OrderBy ("name"));


		[HttpPost]
		[Route ("SaveTicker")]
		public IActionResult SaveTicker ([FromBody] TickersTableRecord ticker) => context.tickers.Save (ticker);


		[HttpPost]
		[Route ("DeleteTicker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (context.tickers, parameters);

	}// Tickers;

}// Stockboy.Controllers;