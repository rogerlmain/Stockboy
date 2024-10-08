﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {


	public class GetTransactionsParameters {
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
	}// GetTransactionsParameters;


	public class UpdateTransactionParameters {
		public Guid id { get; set; }
	}// UpdateTransactionParameters;


	[EnableCors]
	public class Transactions (DataContext context): Controller {

		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions ([FromBody] GetTransactionsParameters parameters) => new JsonResult (Database.CallProcedure<TransactionModel> ("get_transactions", parameters));


		[HttpGet]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions () => new JsonResult (Database.CallProcedure<TransactionModel> ("get_transactions", new GetTransactionsParameters ()));


		[HttpGet]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () {
			var result = new JsonResult (context?.transaction_types.SelectAll ().OrderBy ("sort_order"));
			return result;
		}


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] UpdateTransactionParameters parameters) => new JsonResult (new { success = Database.ExecuteProcedure ("delete_transaction", parameters) });


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionDataModel parameters) {

			Boolean success = true;

			try {

				if (is_null (parameters.id)) parameters.id = Guid.NewGuid ();

				TransactionDataModel? result = context?.transactions.Add (parameters).Entity;

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