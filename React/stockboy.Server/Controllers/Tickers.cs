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

/*
		[HttpPost]
		[Route ("GetTickers")]
		public IActionResult GetTickers ([FromBody] TickerParameters parameters) {
			try {
				var result = new JsonResult (Database.CallProcedure<TickerModel> ("get_tickers", parameters));
				return result;
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetTickers;
*/

		[HttpPost]
		[Route ("SaveTicker")]
		public IActionResult SaveTicker ([FromBody] TickerModel ticker) {
			try {
				context.tickers.UpdateRow<TickerModel> (ticker);
				context.SaveChanges ();
				return new JsonResult (new { message = "Record updated." });
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// SaveTicker;

	}// Tickers;

}// Stockboy.Server.Controllers;