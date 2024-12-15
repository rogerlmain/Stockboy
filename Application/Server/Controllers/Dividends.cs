using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.Classes;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Models;


namespace Stockboy.Controllers {

	[EnableCors]
	public class Dividends (DataContext context): DataController<DividendsTableRecord, DividendModel> (context) {

		[HttpGet]
		[Route ("GetDividendTotals")]
		public IActionResult? GetDividendTotals () {

			try {

				DividendModelList? data = DividendQueries.SelectQuery (context).ToList ();
				DividendSummaryList? summary = null;

				if (isset (data)) foreach (var item in data!) {

					summary ??= new ();
					DividendSummary? model = summary.Find (summary_item => (summary_item.broker_id == item.broker_id) && (summary_item.ticker_id == item.ticker_id));

					if (is_null (model)) {
						model = new () {
							broker_id = item.broker_id,
							ticker_id = item.ticker_id,
							payout = 0
						};
						summary.Add (model);
					}// if;

					model!.payout += item.payout;

				}// if;

				return new JsonResult (summary);

			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;

		}// GetDividendTotals;


		[HttpGet]
		[Route ("GetDividends")]
		public IActionResult GetDividends () => new JsonResult (DividendQueries.SelectQuery (context));


		[HttpPost]
		[Route ("SaveDividend")]
		public IActionResult SaveDividend ([FromBody] DividendRequestModel parameters) {

			if (parameters.reinvested) {
				TransactionsTableRecord transaction = new ();
				transaction.Merge (parameters).transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0");
				//context.transactions.SaveData (transaction);
				//new Transactions (context).SaveData ("get_transaction_by_id", transaction);
			}// if;

			try {
				DividendsTableRecord? dividend = SaveData (new DividendsTableRecord ().Merge (parameters));
				return new JsonResult (DividendQueries.GetDividendById (context, dividend!.id));
			} catch (Exception except) {
				return this.error_message (except.Message);
			}// try;

		}// SaveDividend;

	}// Dividends;

}// Stockboy.Controllers;