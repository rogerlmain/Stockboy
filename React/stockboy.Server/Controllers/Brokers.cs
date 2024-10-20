using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Brokers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers () => new JsonResult (context?.brokers.SelectAll ().OrderBy ("ticker")?.Where (broker => !broker.deleted));


		[HttpPost]
		[Route ("SaveBroker")]
		public IActionResult SaveBroker ([FromBody] BrokerModel parameters) => context.brokers.Save (parameters);


		[HttpPost]
		[Route ("DeleteBroker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (context.brokers, parameters);

	}// Brokers;

}// Stockboy.Server.Controllers;