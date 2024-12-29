using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class UserController: BaseController {

		private const String invalid_email = "Not a valid email address.";

		private String? valid_email (String email_address) {

			if ((from usr in data_context.users
				where usr.email_address == email_address
				select usr
			).Any ()) return "Email address already in use.";

			if (email_address.Count (character => character == '@') != 1) return invalid_email;
			if (email_address.LastIndexOf ('.') < email_address.IndexOf ('@')) return invalid_email;
			if (email_address.Length < 4) return invalid_email;

			return null;

		}// valid_email;


		/********/


		[HttpPost]
		[Route ("LoginUser")]
		public IActionResult LoginUser ([FromBody] Credentials credentials) {

			UserRecord? user = (from usr in data_context.users 
				where
					(usr.email_address == credentials.email_address) &&
					(usr.password == credentials.password)
				select new UserRecord () {
					user_id = usr.id,
					first_name = usr.first_name,
					last_name = usr.last_name,
					email_address = usr.email_address,
					administrator = usr.administrator
				}// select
			).FirstOrDefault ();

			if (not_set (user)) throw new Exception ("Invalid username or password.");

			current_user = user;

			UserRecord some_user = current_user!;

			return new JsonResult (new { 
				message = "validated",
				user!.user_id
			});

		}// LoginUser;


		[HttpPost]
		[Route ("SaveUser")]
		public IActionResult SaveUser ([FromBody] UsersTableRecord account) => new JsonResult (data_context.users.Save (account));


		[HttpPost]
		[Route ("ValidateEmailAddress")]
		public IActionResult ValidateEmailAddress ([FromBody] TextModel email_address) => new JsonResult (Message (valid_email (email_address.text)));

	}// UserController;

}// Stockboy.Controllers;