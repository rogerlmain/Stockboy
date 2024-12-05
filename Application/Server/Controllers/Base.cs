using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Org.BouncyCastle.Asn1.X509.Qualified;
using Stockboy.Classes;


namespace Stockboy.Controllers {

	public class UserNotFoundException: Exception {}


	public class ControllerExceptionFilter: IExceptionFilter {
		public virtual void OnException (ExceptionContext context) {
			switch (context.Exception) {
				case UserNotFoundException: context.Result = new JsonResult (new { message = "UserNotFound" }); break;
				default: context.Result = new JsonResult (new { error = context.Exception.Message }); break;
			}// switch;
		}// OnException;

	}// ControllerExceptionFilter;


	[EnableCors ("CorsPolicy")]
	[TypeFilter (typeof (ControllerExceptionFilter))]
    public class BaseController (DataContext context): Controller {

		protected DataContext context = context;


		public override void OnActionExecuting (ActionExecutingContext context) {
			base.OnActionExecuting (context);
			if ((context.RouteData.Values ["action"]?.ToString () != "LoginUser") && is_null (current_user)) throw new UserNotFoundException ();
		}// OnActionExecuting;

	}// BaseController;

}// Stockboy.Controllers;