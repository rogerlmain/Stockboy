using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;


namespace Stockboy.Server.Controllers {

	public class Tickers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetTickers")]
		public IActionResult GetTickers () => new JsonResult (context?.tickers.SelectAll ().OrderBy ("name"));

	}// Tickers;

}// Stockboy.Server.Controllers;