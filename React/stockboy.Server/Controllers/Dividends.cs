using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Text;


namespace Stockboy.Server.Controllers {

	public class Dividends (DataContext context) : DataController<DividendDataModel, DividendListModel> (context) {


		[HttpPost]
		[Route ("GetDividends")]
		public IActionResult GetDividends ([FromBody] GetParameters parameters) => GetData ("get_dividends", parameters);


		[HttpPost]
		[Route ("SaveDividend")]
		public IActionResult SaveDividend ([FromBody] DividendDataModel parameters) {
			if (parameters.reinvested) {
				TransactionDataModel transaction = new () {
					broker_id = parameters.broker_id,
					ticker_id = parameters.ticker_id,
					price = (parameters.amount_per_share * parameters.share_quantity) / parameters.shares_purchased,
					quantity = parameters.shares_purchased,
					transaction_date = parameters.transaction_date,
					settlement_date = parameters.settlement_date,
					transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0")
				};
				new Transactions (context).SaveData ("get_transaction_by_id", transaction);
			}
			return null;//SaveData ("get_dividend_by_id", parameters);
		}// SaveDividend;

	}// Dividends;

}// Stockboy.Server.Controllers;