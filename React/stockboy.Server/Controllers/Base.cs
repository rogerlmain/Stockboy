using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes.Data;

namespace Stockboy.Server.Controllers {

	public class BaseController : Controller {
		public StockContext? context { get; set; }
	}

}// Stockboy.Server.Controllers;