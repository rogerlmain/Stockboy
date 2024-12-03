﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Brokers (DataContext context) : BaseController (context) {

		[HttpPost]
		[Route ("GetBrokers")]
		public IActionResult GetBrokers ([FromBody] UserCredentialsRecord user) {

			var result = (
				from brk in context.brokers.Where (broker => !broker.deleted)
				from ubr in context.user_brokers.Where (user_broker => brk.id == user_broker.broker_id).DefaultIfEmpty ()
				where
					((ubr.broker_id != brk.id) && brk.approved) || 
					((ubr.user_id == user.user_id) && ubr.deleted)
				select new {
					name = brk.id,
					value = brk.name
				}
			).OrderByDescending (broker => broker.name).ToList ();

			return new JsonResult (result);

		}// GetBrokers;


		[HttpPost]
		[Route ("GetUserBrokers")]
		public IActionResult GetUserBrokers ([FromBody] UserCredentialsRecord user) {

			var result = (
				from brk in context.brokers
				join ubr in context.user_brokers on
					brk.id equals ubr.broker_id
				where
					(ubr.user_id == user.user_id) &&
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

			BrokerTableRecord? broker = (from brk in context.brokers
				where brk.id == broker_data!.id
				select brk
			).FirstOrDefault ();

			if (is_null (broker)) broker = new () {
				approved = user.administrator || broker!.approved,
				deleted = false
			};

			if (broker!.name != broker_data!.value) {
				broker.name = broker_data.value;
				context.brokers.SaveData (broker);
			}// if;

			UserBrokerTableRecord user_brokers = new () {
				user_id = parameters.user_id,
				broker_id = broker!.id ?? Guid.Empty,
			};

			context.user_brokers.Save (user_brokers);

			return GetUserBrokers (new UserCredentialsRecord () { user_id = parameters.user_id });

		}// SaveBroker;


		[HttpPost]
		[Route ("DeleteBroker")]
		public IActionResult DeleteBroker ([FromBody] DataModel parameters) => this.DeleteRecord (context.brokers, parameters);

	}// Brokers;

}// Stockboy.Controllers;