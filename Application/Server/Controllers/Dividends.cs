using Microsoft.AspNetCore.Mvc;
using Server.Classes;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Dividends (DataContext context): BaseController (context) {

		private IQueryable<DividendModel> SelectQuery () { 
			IQueryable<DividendModel> result = from dvd in context.dividends
				join brk in context.brokers on dvd.broker_id equals brk.id
				join tck in context.tickers on dvd.ticker_id equals tck.id
				where (!dvd.deleted) && (dvd.user_id == current_user!.user_id)
				select new DividendModel () {
					id = dvd.id,
					user_id = dvd.user_id,
					broker = brk.name ?? String.Empty,
					company = tck.name ?? String.Empty,
					ticker = tck.symbol,
					broker_id = dvd.broker_id,
					ticker_id = dvd.ticker_id,
					issue_date = dvd.issue_date,
					amount_per_share = dvd.amount_per_share,
					share_quantity = dvd.share_quantity,
					payout = dvd.amount_per_share * dvd.share_quantity
				};
			return result;
		}// SelectQuery;


		private DividendModel? GetDividendById (Guid? id) { 
			return SelectQuery ().Where ((DividendModel item) => item.id == id).FirstOrDefault ();
		}// GetDividendById;

		
		/********/


		[HttpGet]
		[Route ("GetDividendTotals")]
		public IActionResult? GetDividendTotals () {

			try {

				DividendModelList? data = SelectQuery ().ToList ();
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


		[HttpPost]
		[Route ("GetDividends")]
		public IActionResult GetDividends () {
			IQueryable<DividendModel> result = SelectQuery ().OrderByDescending ((DividendModel dividend) => dividend.issue_date);
			return new JsonResult (result);
		}// GetDividends;


		[HttpPost]
		[Route ("SaveDividend")]
		public IActionResult SaveDividend ([FromBody] DividendRequestModel parameters) {

			if (parameters.reinvested) {
				TransactionsTableRecord transaction = new () { user_id = current_user!.user_id };
				transaction.Merge (parameters).transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0");
				//context.transactions.SaveData (transaction);
				//new Transactions (context).SaveData ("get_transaction_by_id", transaction);
			}// if;

  			switch (isset (parameters.id)) {
				case true: context.dividends.Update (parameters); break;
				default: context.dividends.Add (parameters); break;
			}// switch;

			context.SaveChanges ();

			return new JsonResult (GetDividendById (parameters.id));

		}// SaveDividend;

	}// Dividends;

}// Stockboy.Controllers;