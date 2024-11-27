using Microsoft.AspNetCore.Mvc;

namespace Stockboy.Controllers {

    public class BaseController: Controller {

        protected JsonResult Error (Exception except) => new JsonResult (new { error = except.Message });

    }// BaseController;

}// Stockboy.Controllers;