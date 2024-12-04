using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Stockboy.Classes;


namespace Stockboy.Controllers {

	public class ControllerExceptionFilter: IExceptionFilter {
		public virtual void OnException (ExceptionContext context) {
			context.Result = new JsonResult (new { error = context.Exception.Message });
		}// OnException;

	}// ControllerExceptionFilter;


	[EnableCors ("CorsPolicy")]
	[TypeFilter (typeof (ControllerExceptionFilter))]
    public class BaseController (DataContext context): Controller {

		protected DataContext context = context;

	}// BaseController;

}// Stockboy.Controllers;