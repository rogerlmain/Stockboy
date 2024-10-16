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
		public IActionResult SaveDividend ([FromBody] DividendRequestModel parameters) {

			if (parameters.reinvested) {
				TransactionDataModel transaction = new ();
				transaction.Merge<TransactionDataModel> (parameters).transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0");
				new Transactions (context).SaveData ("get_transaction_by_id", transaction);
			}// if;

			return SaveData ("get_dividend_by_id", (DividendDataModel) new DividendDataModel ().Merge (parameters));
		}// SaveDividend;

	}// Dividends;

}// Stockboy.Server.Controllers;