using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stockboy.Classes.Extensions;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Brokers: BaseController {

		[HttpPost]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers () {

			var result = (
				from brk in data_context.brokers.Where (broker => (!broker.deleted))
				from ubr in data_context.user_brokers.Where (user_broker => brk.id == user_broker.broker_id).DefaultIfEmpty ()
				where
					((ubr.broker_id != brk.id) && brk.approved) || 
					((ubr.user_id == current_user!.user_id) && ubr.deleted)
				select new {
					name = brk.id,
					value = brk.name
				}
			).OrderByDescending (broker => broker.name).ToList ();

			return new JsonResult (result);

		}// GetBrokers;


		[HttpPost]
		[Route ("GetUserBrokers")]
		public IActionResult GetUserBrokers () {

			var result = (
				from brk in data_context.brokers
				join ubr in data_context.user_brokers on
					brk.id equals ubr.broker_id
				where
					(ubr.user_id == current_user!.user_id) &&
					(!brk.deleted) && (!ubr.deleted)
				select new {
					brk.id,
					brk.name,
					brk.approved
				}
			).Distinct ().OrderBy (result => result.name);

			return new JsonResult (result);

		}// GetBrokers;


		[HttpPost]
		[Route ("SaveBroker")]
		public IActionResult SaveBroker ([FromBody] UserBrokerRecord parameters) {

			ValueModel? broker_data = JsonConvert.DeserializeObject<ValueModel> (parameters.broker);

			if (not_set (broker_data)) throw new Exception ("Broker is undefined");

			BrokerTableRecord? broker = (from brk in data_context.brokers
				where brk.id == broker_data!.id
				select brk
			).FirstOrDefault ();

			if (is_null (broker)) broker = new () {
				id = Guid.NewGuid (),
				approved = current_user!.administrator || broker!.approved,
				deleted = false
			};

			if (broker!.name != broker_data!.value) {
				broker.name = broker_data.value;
				data_context.brokers.Save (broker);
			}// if;

			UserBrokerTableRecord user_brokers = new () {
				id = Guid.NewGuid (),
				user_id = parameters.user_id,
				broker_id = broker!.id,
			};

			data_context.user_brokers.Save (user_brokers);

			return GetUserBrokers ();

		}// SaveBroker;


		[HttpPost]
		[Route ("DeleteBroker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (data_context.brokers, parameters);

	}// Brokers;

}// Stockboy.Controllers;