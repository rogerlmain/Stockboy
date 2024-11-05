using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Brokers (DataContext context) : Controller {

		[HttpGet]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers () => new JsonResult (context?.brokers.Where (broker => !broker.deleted).OrderBy (item => item.name).ToList ());


		[HttpPost]
		[Route ("SaveBroker")]
		public IActionResult SaveBroker ([FromBody] BrokersTable parameters) => context.brokers.Save (parameters);


		[HttpPost]
		[Route ("DeleteBroker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (context.brokers, parameters);

	}// Brokers;

}// Stockboy.Controllers;