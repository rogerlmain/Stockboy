using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class ControllerExceptionFilter: IExceptionFilter {
		public virtual void OnException (ExceptionContext context) {
			context.Result = new JsonResult (new { error = context.Exception.Message });
		}// OnException;

	}// ControllerExceptionFilter;


	[EnableCors ("CorsPolicy")]
	[TypeFilter (typeof (ControllerExceptionFilter))]
    public class BaseController (DataContext context): Controller {

		private static Guid? GetUserID (IDictionary<string, object?> arguments) {

  			foreach (KeyValuePair<string, object?> item in arguments) {

				List<string>? key_list = item.Value?.GetKeys ();

				if (isset (key_list)) foreach (String key in key_list!) {
					if (key == "user_id") return new Guid (item.Value!.GetValue ("user_id")!.ToString ()!);
				}// foreach;

			}// foreach;

			return null;

		}// GetUserID;


		protected DataContext context = context;


		/********/


		public required UsersTableRecord user;


		public override void OnActionExecuting (ActionExecutingContext http_context) {

			base.OnActionExecuting (http_context);

			if (http_context.RouteData.Values ["action"]?.ToString () == "LoginUser") return;

			Guid? user_id = GetUserID (http_context.ActionArguments);
			UsersTableRecord? session_user = HttpContext.Session.GetObject<UsersTableRecord> ("user");

			if (is_null (user_id)) throw new Exception ("Invalid user ID");

			if (not_set (session_user)) {

				session_user = (from usr in context.users
					where usr.id == user_id
					select usr
				).FirstOrDefault ();

				if (is_null (session_user)) throw new Exception ("Invalid user ID");

				HttpContext.Session.SetObject ("user", session_user!);

			}// if;

			if (session_user!.id != user_id) throw new Exception ("Invalid user ID - Fraud detected!<br />The cops are on their way!");

		}// OnActionExecuting;

	}// BaseController;

}// Stockboy.Controllers;