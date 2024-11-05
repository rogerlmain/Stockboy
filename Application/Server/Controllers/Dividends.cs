using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Models;


namespace Stockboy.Controllers {

	[EnableCors]
	public class Dividends (DataContext context): DataController<DividendsTable, DividendListModel> (context) {

		[HttpGet]
		[Route ("GetDividendTotals")]
		public IActionResult? GetDividendTotals () {

			try {

				List<DividendListModel>? data = Database.CallProcedure<DividendListModel> ("get_dividends", new GetParameters ());
				List<DividendSummaryModel>? summary = null;

				if (isset (data)) foreach (var item in data!) {

					summary ??= new ();
					DividendSummaryModel? model = summary.Find (summary_item => (summary_item.broker_id == item.broker_id) && (summary_item.ticker_id == item.ticker_id));

					if (is_null (model)) {
						model = new ();
						model.broker_id = item.broker_id;
						model.ticker_id = item.ticker_id;
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
		public IActionResult GetDividends () => new JsonResult (DividendQueries.get_dividends (context));


		[HttpPost]
		[Route ("SaveDividend")]
		public IActionResult SaveDividend ([FromBody] DividendRequestModel parameters) {

			if (parameters.reinvested) {
				TransactionsTable transaction = new ();
				transaction.Merge (parameters).transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0");
				new Transactions (context).SaveData ("get_transaction_by_id", transaction);
			}// if;

			try {
				DividendsTable? dividend = SaveData (new DividendsTable ().Merge (parameters));
				return new JsonResult (DividendQueries.get_dividend_by_id (context, dividend!.id!.Value));
			} catch (Exception except) {
				return this.error_message (except.Message);
			}// try;

		}// SaveDividend;

	}// Dividends;

}// Stockboy.Controllers;