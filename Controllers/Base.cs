using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes.Data;

namespace Stockboy.Controllers {

	public class BaseController : Controller {
		public StockContext context { get; set; }
	}

}
