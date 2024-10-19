using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Brokers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers () { 
			JsonResult result = new JsonResult (context?.brokers.SelectAll ().OrderBy ("ticker")?.Where (broker => !broker.deleted));
			return result;
		}

		[HttpPost]
		[Route ("SaveBroker")]
		public IActionResult SaveBroker ([FromBody] DataTableModel parameters) => new JsonResult (context.brokers.Save (parameters));


		[HttpPost]
		[Route ("DeleteBroker")]
		public IActionResult DeleteBroker ([FromBody] DataTableModel parameters) => this.DeleteRecord (context.brokers, parameters);

	}// Brokers;

}// Stockboy.Server.Controllers;