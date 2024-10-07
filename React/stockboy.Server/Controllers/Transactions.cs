using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;


namespace Stockboy.Server.Controllers {

	[EnableCors]
	public class Transactions (DataContext context): DataController<TransactionDataModel, TransactionListModel> (context) {

		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions ([FromBody] GetParameters parameters) => GetData ("get_transactions", parameters);


		[HttpGet]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () => new JsonResult (context?.transaction_types.SelectAll ().OrderBy ("sort_order"));


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] DeleteParameters parameters) => new JsonResult (new { success = Database.ExecuteProcedure ("delete_transaction", parameters) });


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionDataModel parameters) => SaveData ("get_transaction_by_id", parameters);

	}// Transactions;

}// Stockboy.Server.Controllers;