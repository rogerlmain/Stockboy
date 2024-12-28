﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class TransactionsController: BaseController {

		private IQueryable<TransactionModel> SelectQuery () {
			IQueryable<TransactionModel> result = from tra in data_context.transactions
				join tck in data_context.tickers on tra.ticker_id equals tck.id
				join brk in data_context.brokers on tra.broker_id equals brk.id
				join ttp in data_context.transaction_types on tra.transaction_type_id equals ttp.id
				where !tra.deleted && (tra.user_id == current_user!.user_id)
				select new TransactionModel () {
					id = tra.id,
					user_id = tra.user_id,
					broker_id = brk.id,
					ticker_id = tck.id,
					company = tck.name ?? String.Empty,
					broker = brk.name ?? String.Empty,
					ticker = tck.symbol ?? String.Empty,
					price = tra.price,
					quantity = tra.quantity,
					cost = tra.price * tra.quantity,
					transaction_date = tra.transaction_date,
					settlement_date = tra.settlement_date,
					transaction_type = ttp.name,
					transaction_type_id = ttp.id,
				};
			return result;
		}// SelectQuery;


		private TransactionModel? GetTransactionById (Guid? id) {
			return SelectQuery ().Where ((TransactionModel item) => item.id == id).FirstOrDefault ();
		}// GetTransactionById;


		/********/


		[HttpPost]
		[Route ("GetTransactions")]
		public IActionResult GetTransactions () => new JsonResult (TransactionQueries.get_transactions (data_context));


		[HttpPost]
		[Route ("GetDividendTransaction")]
		public IActionResult GetDividendTransaction ([FromBody] DividendsTableRecord dividend) {

if (dividend is null) return Error ("No luck.");

			TransactionsTableRecord? result = TransactionQueries.get_dividend_transaction (data_context, dividend);

			if (isset (result) && ((result!.price * result.quantity).round (2) != (dividend.amount_per_share * dividend.share_quantity).round (2))) result = null;
			return new JsonResult (new { id = isset (result) ? result!.id : new Guid? () });

		}// GetDividendTransaction;


		[HttpPost]
		[Route ("GetTransactionTypes")]
		public IActionResult GetTransactionTypes () => new JsonResult (data_context?.transaction_types.ToList ().OrderBy ("sort_order"));


		[HttpPost]
		[Route ("DeleteTransaction")]
		public IActionResult DeleteTransaction ([FromBody] DataModel parameters) => this.DeleteRecord (data_context.transactions, parameters);


		[HttpPost]
		[Route ("SaveTransaction")]
		public IActionResult SaveTransaction ([FromBody] TransactionsTableRecord parameters) {

			switch (isset (parameters.id)) {
				case true: data_context.transactions.Update (parameters); break;
				default: data_context.transactions.Add (parameters); break;
			}// switch;

			data_context.SaveChanges ();

			return new JsonResult (GetTransactionById (parameters.id));

		}// SaveTransaction;


		[HttpPost]
		[Route ("UpdateTransactionType")]
		public IActionResult UpdateTransactionType ([FromBody] UpdateTransactionModel parameters) {

			try {
				data_context.transactions.Where (item => item.id == parameters.id).ExecuteUpdate (item => 
					item.SetProperty (value => value.transaction_type_id, data_context.transaction_types.Where (type => 
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