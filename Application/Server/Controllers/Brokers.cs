using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	[EnableCors]
	public class Brokers (DataContext context) : BaseController {

		[HttpGet]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers () {
			try {
				return new JsonResult ((from brk in context.brokers select new {
					name = brk.id,
					value = brk.name
				}).OrderBy (broker => broker.name));
			} catch (Exception except) {
				return Error (except);
			}// GetBrokers;
		}// GetBrokers;


		[HttpPost]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers ([FromBody] UserCredentialsRecord user) {
			try {
				return new JsonResult ((
					from ust in context.user_stocks
					join brk in context.brokers on
						ust.broker_id equals brk.id
					where
						(ust.user_id == user.user_id) &&
						(!ust.deleted)
					select new {
						brk.id,
						brk.name
					}
				).Distinct ().OrderBy (result => result.name));
			} catch (Exception except) {
				return Error (except);
			}// try;
		}// GetBrokers;


		[HttpPost]
		[Route ("SaveBroker")]
		public IActionResult SaveBroker ([FromBody] BrokersTableRecord parameters) => context.brokers.Save (parameters);


		[HttpPost]
		[Route ("DeleteBroker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (context.brokers, parameters);

	}// Brokers;

}// Stockboy.Controllers;