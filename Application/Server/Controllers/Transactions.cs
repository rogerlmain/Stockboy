using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Classes;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Transactions (DataContext context): BaseController (context) {

		private IQueryable<TransactionModel> SelectQuery () {
			IQueryable<TransactionModel> result = from tra in context.transactions
				join tck in context.tickers on tra.ticker_id equals tck.id
				join brk in context.brokers on tra.broker_id equals brk.id
				join ttp in context.transaction_types on tra.transaction_type_id equals ttp.id
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

			switch (isset (parameters.id)) {
				case true: context.transactions.Update (parameters); break;
				default: context.transactions.Add (parameters); break;
			}// switch;

			context.SaveChanges ();

			return new JsonResult (GetTransactionById (parameters.id));

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