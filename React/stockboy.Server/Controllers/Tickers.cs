using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;


namespace Stockboy.Server.Controllers {


	public class Tickers (DataContext context) : Controller {


		/********/

		[HttpGet]
		[Route ("GetTickers")]
		public IActionResult GetTickers () => new JsonResult (context?.tickers.SelectAll ().OrderBy ("name"));


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