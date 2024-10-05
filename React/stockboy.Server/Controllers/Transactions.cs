using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	[EnableCors]
	public class Transactions (DataContext context): Controller {

		[HttpGet]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions () => new JsonResult (Database.CallProcedure<TransactionModel> ("get_transactions", new GetParameters ()));


		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions ([FromBody] GetParameters parameters) => new JsonResult (Database.CallProcedure<TransactionModel> ("get_transactions", parameters));


		[HttpGet]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () {
			var result = new JsonResult (context?.transaction_types.SelectAll ().OrderBy ("sort_order"));
			return result;
		}// GetTransactionTypes;


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] UpdateParameters parameters) => new JsonResult (new { success = Database.ExecuteProcedure ("delete_transaction", parameters) });


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionDataModel parameters) {
			try {

				TransactionDataModel? result = null;

				if (is_null (parameters.id)) parameters.id = Guid.NewGuid ();

				switch (is_null (parameters.id)) {
					case true: result = context?.transactions.Add (parameters).Entity; break;
					default: result = context?.transactions.Update (parameters).Entity; break;
				}// switch;

				if (is_null (result)) throw new Exception ("Record could not be saved (don't ask me why)");

				context?.SaveChanges ();

				TransactionModel? return_value = Database.CallProcedure<TransactionModel> ("get_transaction_by_id", new BaseModel () { id = result!.id })?.First ();

				if (is_null (return_value)) throw new Exception ("Saved record could not be read (don't ask me why)");

				return new JsonResult (return_value);

			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// SaveTransaction;

	}// Transactions;

}// Stockboy.Server.Controllers;