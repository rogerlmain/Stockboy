using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;


namespace Stockboy.Server.Controllers {

	[EnableCors]
	public class Transactions (DataContext context): DataController<TransactionDataModel, TransactionListModel> (context) {

		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions ([FromBody] GetParameters parameters) {
			var result = GetData ("get_transactions", parameters);
			return result;
		}// GetTransactions;


		[HttpPost]
		[Route ("GetDividendTransaction")]
		public IActionResult GetDividendTransaction ([FromBody] DividendDataModel dividend) {

			TransactionDataModel? result = (
				from item in context.transactions
				join type in context.transaction_types on item.transaction_type_id equals type.id
				where
					(item.broker_id == dividend.broker_id) &&
					(item.ticker_id == dividend.ticker_id) &&
					(item.transaction_date == dividend.issue_date) &&
					(type.name.Equals ("buy"))
				select
					item
			).FirstOrDefault ();

			if (isset (result) && ((result!.price * result.quantity).round (2) != (dividend.amount_per_share * dividend.share_quantity).round (2))) result = null;

			return new JsonResult (new { id = isset (result) ? result!.id : null });

		}// GetDividendTransaction;


		[HttpGet]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () => new JsonResult (context?.transaction_types.SelectAll ().OrderBy ("sort_order"));


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] DataModel parameters) => this.DeleteRecord (context.transactions, parameters);


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionDataModel parameters) => SaveData ("get_transaction_by_id", parameters);


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

}// Stockboy.Server.Controllers;