using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class UserController (DataContext context): BaseController {

		private const String invalid_email = "Not a valid email address.";

		private String? valid_email (String email_address) {

			if ((from usr in context.users
				where usr.email_address == email_address
				select usr
			).Count () > 0) return "Email address already in use.";

			if (email_address.Count (character => character == '@') != 1) return invalid_email;
			if (email_address.LastIndexOf (".") < email_address.IndexOf ("@")) return invalid_email;
			if (email_address.Length < 4) return invalid_email;

			return null;

		}// valid_email;


		[HttpPost]
		[Route ("LoginUser")]
		public IActionResult LoginUser ([FromBody] Credentials credentials) {
			try {

				UsersTableRecord? user = (from usr in context.users where
					(usr.email_address == credentials.email_address) &&
					(usr.password == credentials.password)
				select usr).FirstOrDefault ();

				if (not_set (user)) throw new Exception ("Invalid username or password.");

				return new JsonResult (new { 
					message = "validated",
					user_id = user!.id
				});

			} catch (Exception except) {
				return Error (except);
			}// try;

		}// LoginUser;


		[HttpPost]
		[Route ("SaveUser")]
		public IActionResult SaveUser ([FromBody] UsersTableRecord account) {
			try {
				return context.users.Save (account);
			} catch (Exception except) {
				return Error (except);
			}// try;
		}// SaveUser;


		[HttpPost]
		[Route ("ValidateEmailAddress")]
		public IActionResult ValidateEmailAddress ([FromBody] TextModel email_address) {
			try {
				return new JsonResult (new { message = valid_email (email_address.text) });
			} catch (Exception except) {
				return Error (except);
			}// try;
		}// ValidateUsername;

	}// UserController;

}// Stockboy.Controllers;