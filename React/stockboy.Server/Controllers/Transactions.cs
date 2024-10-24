﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Data.Entity;
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


		[HttpGet]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () => new JsonResult (context?.transaction_types.SelectAll ().OrderBy ("sort_order"));


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] DataModel parameters) => this.DeleteRecord (context.transactions, parameters);


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionDataModel parameters) => SaveData ("get_transaction_by_id", parameters);

	}// Transactions;

}// Stockboy.Server.Controllers;