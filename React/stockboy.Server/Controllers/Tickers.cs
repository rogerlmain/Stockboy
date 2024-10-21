using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Collections;


namespace Stockboy.Server.Controllers {

	public class Tickers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetTickers")]
		public IActionResult GetTickers () => new JsonResult (context?.tickers.Where (ticker => !ticker.deleted).ToList ().OrderBy ("name"));


		[HttpPost]
		[Route ("GetTickersById")]
		public IActionResult GetTickersById ([FromBody] Guid [] ids) => new JsonResult (context?.tickers.Where (item => ((IList) ids).Contains (item.id)));


		[HttpPost]
		[Route ("SaveTicker")]
		public IActionResult SaveTicker ([FromBody] TickerModel ticker) => context.tickers.Save (ticker);


		[HttpPost]
		[Route ("DeleteTicker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (context.tickers, parameters);

	}// Tickers;

}// Stockboy.Server.Controllers;