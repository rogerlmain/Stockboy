using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Classes.Queries;
using Stockboy.Server.Models;


namespace Stockboy.Server.Controllers {

	public class Dividends (DataContext context): DataController<DividendDataModel, DividendListModel> (context) {

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


		[HttpPost]
		[Route ("GetDividends")]
		public IActionResult GetDividends ([FromBody] GetParameters parameters) => GetData ("get_dividends", parameters);


		[HttpPost]
		[Route ("SaveDividend")]
		public IActionResult SaveDividend ([FromBody] DividendRequestModel parameters) {

			if (parameters.reinvested) {
				TransactionDataModel transaction = new ();
				transaction.Merge (parameters).transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0");
				new Transactions (context).SaveData ("get_transaction_by_id", transaction);
			}// if;

			try {
				DividendDataModel? dividend = SaveData (new DividendDataModel ().Merge (parameters));
				return new JsonResult (DividendQueries.get_dividend_by_id (context, dividend!.id!.Value));
			} catch (Exception except) {
				return error_message (except.Message);
			}// try;

		}// SaveDividend;

	}// Dividends;

}// Stockboy.Server.Controllers;