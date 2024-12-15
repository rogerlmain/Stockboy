using Server.Classes;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class UserValidator (RequestDelegate next) {

		public async Task InvokeAsync (HttpContext http_context, DataContext data_context) {

			if (http_context.Request.RouteValues ["action"]?.ToString () != "LoginUser") {

				Guid? user_id = http_context.GetGuid ("user_id");

				if (not_set (user_id)) throw new UserNotFoundException ();

				UserRecord? user = http_context.Session.GetObject<UserRecord> ("user");

				if (is_null (user)) {

					user = (from usr in data_context.users
							where usr.id == user_id
							select new UserRecord () {
								user_id = usr.id,
								first_name = usr.first_name,
								last_name = usr.last_name,
								email_address = usr.email_address,
								administrator = usr.administrator
							}).FirstOrDefault ();

					if (is_null (user)) throw new Exception ("Invalid User ID - User not found.");
					http_context.Session.SetObject ("user", user!);
					return;

				}// if;

				if (user!.user_id != user_id) throw new Exception ("Invalid User ID: User ID does not match.");

			}// if;

			await next (http_context);

		}// InvokeAsync

	}// UserValidator;

}// Stockboy.Classes;