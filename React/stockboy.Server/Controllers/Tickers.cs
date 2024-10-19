using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {


	public class TickerParameters {
		public Guid broker_id { get; set; }
	}// TickerParameters;


	public class Tickers (DataContext context) : Controller {


		/********/


		[HttpGet]
		[Route ("GetTickers")]
		public IActionResult GetTickers () {
			var result = new JsonResult (context?.tickers.SelectAll ().OrderBy ("name"));
			return result;
		}


		[HttpPost]
		[Route ("SaveTicker")]
		public IActionResult SaveTicker ([FromBody] TickerModel ticker) {
			try {
				return new JsonResult (context.tickers.Save (ticker));
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// SaveTicker;

	}// Tickers;

}// Stockboy.Server.Controllers;