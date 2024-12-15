global using static Stockboy.Classes.Globals;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Stockboy.Classes;


namespace Stockboy.Controllers.Abstract {

	public class UserNotFoundException: Exception { }


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
	public abstract class BaseController (DataContext data_context): Controller {
		protected DataContext context = data_context;
	}// BaseController;

}// Stockboy.Controllers.Abstract;