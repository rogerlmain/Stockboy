using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Collections.Specialized;


namespace Stockboy.Server.Controllers {


	public class GetTransactionsParameters {
		public Guid broker_id { get; set; }
		public Guid ticker_id { get; set; }
	}// GetTransactionsParameters;


	public class UpdateTransactionParameters {
		public Guid id { get; set; }
	}// UpdateTransactionParameters;


	[EnableCors]
	public class Transactions: BaseController {

		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions ([FromBody] GetTransactionsParameters parameters) => new JsonResult (Database.CallProcedure<TransactionsModel> ("get_transaction_history", parameters));


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] UpdateTransactionParameters parameters) => new JsonResult (new { success = Database.ExecuteProcedure ("delete_transaction", parameters) });

	}// Transactions;


}// Stockboy.Server.Controllers;