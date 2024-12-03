using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class UserController (DataContext context): BaseController (context) {

		private const String invalid_email = "Not a valid email address.";

		private String? valid_email (String email_address) {

			if ((from usr in context.users
				where usr.email_address == email_address
				select usr
			).Any ()) return "Email address already in use.";

			if (email_address.Count (character => character == '@') != 1) return invalid_email;
			if (email_address.LastIndexOf ('.') < email_address.IndexOf ('@')) return invalid_email;
			if (email_address.Length < 4) return invalid_email;

			return null;

		}// valid_email;


		[HttpPost]
		[Route ("LoginUser")]
		public IActionResult LoginUser ([FromBody] Credentials credentials) {

			UsersTableRecord? user = (from usr in context.users where
				(usr.email_address == credentials.email_address) &&
				(usr.password == credentials.password)
			select usr).FirstOrDefault ();

			if (not_set (user)) throw new Exception ("Invalid username or password.");

			HttpContext.Session.SetObject ("user", user!);

			return new JsonResult (new { 
				message = "validated",
				user_id = user!.id
			});

		}// LoginUser;


		[HttpPost]
		[Route ("SaveUser")]
		public IActionResult SaveUser ([FromBody] UsersTableRecord account) {
			return context.users.Save (account);
		}// SaveUser;


		[HttpPost]
		[Route ("ValidateEmailAddress")]
		public IActionResult ValidateEmailAddress ([FromBody] TextModel email_address) {
			return new JsonResult (new { message = valid_email (email_address.text) });
		}// ValidateUsername;

	}// UserController;

}// Stockboy.Controllers;