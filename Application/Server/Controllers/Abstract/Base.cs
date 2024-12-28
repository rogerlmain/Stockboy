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


	public abstract class BaseClass (HttpContext context) {

		protected HttpContext http_context = context;
		protected DataContext data_context = context.RequestServices.GetRequiredService<DataContext> ();

		protected ISession session = context.Session;
		protected IServiceProvider service_provider = context.RequestServices;

	}// BaseClass;


	[EnableCors ("CorsPolicy")]
	[TypeFilter (typeof (ControllerExceptionFilter))]
	public abstract class BaseController: Controller {

		protected HttpContext http_context { get {  return HttpContext; } }
		protected DataContext data_context { get { return service_provider.GetRequiredService<DataContext> (); } }

		protected IServiceProvider service_provider { get { return http_context.RequestServices; } }
		protected ISession session { get { return http_context.Session; } }

		protected JsonResult Error (String text) => new (new { error = text });

	}// BaseController;

}// Stockboy.Controllers.Abstract;