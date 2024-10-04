using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;

namespace Stockboy.Server.Controllers {

	[EnableCors]
	public class Splits: Controller {

		[HttpGet]
		[Route ("GetSplits")]
		public IActionResult GetSplits () => new JsonResult (Database.CallProcedure<SplitsModel> ("get_splits", new GetParameters ()));

	}// Splits;

}// Stockboy.Server.Controllers;