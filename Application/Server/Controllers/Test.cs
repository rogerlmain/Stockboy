using Microsoft.AspNetCore.Mvc;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;


namespace Stockboy.Controllers {

	public class TestController: BaseController {

		[HttpPost]
		[Route ("TestMe")]
		public IActionResult TestMe () {
			HoldingsData data = HoldingsData.Current (http_context);
			return new JsonResult (Message ("Peachy"));
		}// TestMe;

	}// TestController;

}// Stockboy.Controllers;
