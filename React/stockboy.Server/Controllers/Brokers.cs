using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;


namespace Stockboy.Server.Controllers {

	public class Brokers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers () => new JsonResult (context?.brokers.SelectAll ().OrderBy ("ticker"));

	}// Brokers;

}// Stockboy.Server.Controllers;