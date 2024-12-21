using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Classes;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Transactions (DataContext context): BaseController (context) {

		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions () => new JsonResult (TransactionQueries.get_transactions (context));


		[HttpPost]
		[Route ("GetDividendTransaction")]
		public IActionResult GetDividendTransaction ([FromBody] DividendsTableRecord dividend) {

			TransactionsTableRecord? result = TransactionQueries.get_dividend_transaction (context, dividend);

			if (isset (result) && ((result!.price * result.quantity).round (2) != (dividend.amount_per_share * dividend.share_quantity).round (2))) result = null;
			return new JsonResult (new { id = isset (result) ? result!.id : new Guid? () });

		}// GetDividendTransaction;


		[HttpPost]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () => new JsonResult (context?.transaction_types.ToList ().OrderBy ("sort_order"));


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] DataModel parameters) => this.DeleteRecord (context.transactions, parameters);


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionsTableRecord parameters) {
			return new JsonResult (TransactionQueries.get_transaction_by_id (context, TransactionQueries.save_transaction (context, parameters)));
		}// SaveTransaction;


		[HttpPost]
		[Route ("UpdateTransactionType")]
		public IActionResult UpdateTransactionType ([FromBody] UpdateTransactionModel parameters) {

			try {
				context.transactions.Where (item => item.id == parameters.id).ExecuteUpdate (item => 
					item.SetProperty (value => value.transaction_type_id, context.transaction_types.Where (type => 
						type.name.Equals (parameters.type)
					).First ().id)
				);
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;

			return new JsonResult (new { success = true });
		}// UpdateTransactionType;

	}// Transactions;

}// Stockboy.Controllers;