using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Tickers (DataContext context) : BaseController {

		[HttpPost]
		[Route ("GetTickers")]
		public IActionResult GetTickers ([FromBody] UserCredentialsRecord user) {
			try {
				return new JsonResult ((
					from ust in context.user_stocks
					join tck in context.tickers on
						ust.ticker_id equals tck.id
					where
						(ust.user_id == user.user_id) &&
						(!ust.deleted)
					select new {
						tck.id,
						tck.name
					}
				).Distinct ().OrderBy (result => result.name));
			} catch (Exception except) {
				return Error (except);
			}// try;
		}// GetTickers;


		[HttpPost]
		[Route ("SaveTicker")]
		public IActionResult SaveTicker ([FromBody] TickerTableRecord ticker) => context.tickers.Save (ticker);


		[HttpPost]
		[Route ("DeleteTicker")]
		public IActionResult DeleteTicker ([FromBody] DataModel parameters) => this.DeleteRecord (context.tickers, parameters);

	}// Tickers;

}// Stockboy.Controllers;