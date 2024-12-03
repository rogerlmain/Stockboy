using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Tickers (DataContext context) : BaseController (context) {

		public void save_ticker (ValueModel parameters, String symbol) {

			// TO DO: Test if user is admin, otherwise add to a new "to be validated" list

			TickerTableRecord? ticker = new () {
				id = is_null (parameters?.id) ? Guid.NewGuid () : parameters?.id,
				name = parameters?.value,
				symbol = symbol,
				approved = false,
				deleted = false
			};

			if (is_null (parameters?.value)) context.tickers.SaveData (ticker);

		}// save_broker;


		[HttpPost]
		[Route ("GetTickers")]
		public IActionResult GetTickers ([FromBody] UserCredentialsRecord credentials) {

			var result = (
				from tck in context.tickers.Where (ticker => !ticker.deleted)
				from utk in context.user_tickers.Where (user_ticker => tck.id == user_ticker.ticker_id).DefaultIfEmpty ()
				where
					((utk.ticker_id != tck.id) && tck.approved) || 
					((utk.user_id == credentials.user_id) && utk.deleted)
				select new {
					name = tck.id,
					value = tck.name,
					tck.symbol
				}
			).OrderBy (ticker => ticker.value).ToList ();

			return new JsonResult (result);

		}// GetBrokers;


		[HttpPost]
		[Route ("GetUserTickers")]
		public IActionResult GetUserTickers ([FromBody] UserCredentialsRecord user) {

			var result = (
				from tck in context.tickers
				join utk in context.user_tickers on
					tck.id equals utk.ticker_id
				where
					(utk.user_id == user.user_id) &&
					(!tck.deleted) && (!utk.deleted)
				select new {
					tck.id,
					tck.name,
					tck.symbol,
					tck.price,
					tck.volume,
					tck.last_payment_date,
					tck.next_payment_date
				}
			).Distinct ().OrderBy (result => result.name);

			return new JsonResult (result);

		}// GetTickers;


		[HttpPost]
		[Route ("SaveTicker")]
		public IActionResult SaveTicker ([FromBody] UserTickerRecord parameters) {

			ValueModel? ticker = JsonConvert.DeserializeObject<ValueModel> (parameters.ticker);

			if (not_set (ticker)) throw new Exception ("Ticker is undefined");
			if (is_null (ticker!.id)) this.save_ticker (ticker!, parameters.symbol);

			UserTickerTableRecord user_ticker = new () {
				user_id = parameters.user_id,
				ticker_id = ticker!.id ?? Guid.Empty,
			};

			context.user_tickers.Save (user_ticker);

			return new JsonResult (parameters.ticker);

		}// SaveTicker;


		[HttpPost]
		[Route ("DeleteTicker")]
		public IActionResult DeleteTicker ([FromBody] DataModel parameters) => this.DeleteRecord (context.tickers, parameters);

	}// Tickers;

}// Stockboy.Controllers;