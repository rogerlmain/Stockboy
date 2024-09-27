using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {


	public class GetTransactionsParameters {
		public Guid broker_id { get; set; }
		public Guid ticker_id { get; set; }
	}// GetTransactionsParameters;


	public class UpdateTransactionParameters {
		public Guid id { get; set; }
	}// UpdateTransactionParameters;


	[EnableCors]
	public class Transactions (DataContext context): Controller {

		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions ([FromBody] GetTransactionsParameters parameters) => new JsonResult (Database.CallProcedure<TransactionModel> ("get_transaction_history", parameters));


		[HttpGet]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () => new JsonResult (context?.transaction_types.SelectAll ().OrderBy ("ticker"));


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] UpdateTransactionParameters parameters) => new JsonResult (new { success = Database.ExecuteProcedure ("delete_transaction", parameters) });


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionDataModel parameters) {
			context?.transactions
			return new JsonResult (new { success = true });
		}
	}// Transactions;


}// Stockboy.Server.Controllers;