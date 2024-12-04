using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;


namespace Stockboy.Controllers {

	public class StringParameter {
		public String? value { get; set; } = null;
		//public Guid? user_id { get; set; } = null;
	}// StringParameter;


	public class TestController (DataContext context): BaseController (context) {

		[HttpPost]
		[Route ("TestMe")]
		public IActionResult TestMe ([FromBody] StringParameter parameters /*String value*/) {
			return new JsonResult (new { message = parameters.value });
		}// TestMe;

	}// TestController;

}// Stockboy.Controllers;
