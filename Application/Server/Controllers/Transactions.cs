﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stockboy.Classes;
using Stockboy.Classes.Extensions;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class TransactionsController: BaseController {

		private async Task<IEnumerable<TransactionModel>> SelectQuery () {

			HoldingsStatusList? holdings_status = (await HoldingsData.Current (http_context)).GetStatus;

			TransactionModelList transactions = (from tra in data_context.transactions
				join tck in data_context.tickers on tra.ticker_id equals tck.id
				join brk in data_context.brokers on tra.broker_id equals brk.id
				join ttp in data_context.transaction_types on tra.transaction_type_id equals ttp.id
				where (!tra.deleted) && (tra.user_id == current_user!.user_id)
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
				}// TransactionModel;
			).ToList ();

			if (holdings_status is null) return transactions;

			return (from tra in transactions
				join hld in holdings_status on tra.ticker_id equals hld.ticker_id
				select tra.Merge (new { hld.status })
			);

		}// SelectQuery;


		private async Task<TransactionModel>? GetTransactionById (Guid? id) {
			//return await SelectQuery ().Where ((TransactionModel item) => item.id == id).FirstOrDefault ();
return null;
		}// GetTransactionById;


		public TransactionsTableModel? get_dividend_transaction (DividendsTableRecord dividend) => (from item in data_context.transactions
			join type in data_context.transaction_types on item.transaction_type_id equals type.id
			where
				(item.broker_id == dividend.broker_id) &&
				(item.ticker_id == dividend.ticker_id) &&
				(item.transaction_date == dividend.issue_date) &&

// add purchase price to search criteria

				(type.name.Equals ("buy"))
			select
				item
		).FirstOrDefault ();


		/********/


		[HttpPost]
		[Route ("GetTransactions")]
		public async Task<IActionResult> GetTransactions () {
			TransactionModelList? result = (await SelectQuery ()).OrderByDescending ((TransactionModel transaction) => transaction.transaction_date).ToList ();
			return new JsonResult (isset (result) ? result : Message ("No transactions recorded."));
		}// GetTransactions;


		[HttpPost]
		[Route ("GetDividendTransaction")]
		public IActionResult GetDividendTransaction ([FromBody] DividendsTableRecord dividend) {

if (dividend is null) return Error ("No luck.");

			TransactionsTableModel? result = get_dividend_transaction (dividend);

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
		public IActionResult SaveTransaction ([FromBody] TransactionsTableModel parameters) {

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

			data_context.transactions.Where (item => item.id == parameters.id).ExecuteUpdate (item => 
				item.SetProperty (value => value.transaction_type_id, data_context.transaction_types.Where (type => 
					type.name.Equals (parameters.type)
				).First ().id)
			);

			return new JsonResult (new { success = true });

		}// UpdateTransactionType;

	}// Transactions;

}// Stockboy.Controllers;