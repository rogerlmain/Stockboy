﻿using Microsoft.AspNetCore.Mvc;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;


namespace Stockboy.Controllers {

	public class StringParameter {
		public String? value { get; set; } = null;
		//public Guid? user_id { get; set; } = null;
	}// StringParameter;


	public class TestController: BaseController {

		[HttpPost]
		[Route ("TestMe")]
		public IActionResult TestMe ([FromBody] StringParameter parameters /*String value*/) {
			return new JsonResult (Message (parameters.value));
		}// TestMe;

	}// TestController;

}// Stockboy.Controllers;
