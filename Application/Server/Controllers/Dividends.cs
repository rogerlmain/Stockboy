using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Stockboy.Classes;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class DividendsController : BaseController {

		private async Task<DividendModelList?> SelectQuery () {

			HoldingsModelList? holdings = (await HoldingsData.Current (http_context)).Holdings;
			if (holdings is null) return null;

			DividendModelList dividends = (
				from dvd in data_context.dividends
				join brk in data_context.brokers on dvd.broker_id equals brk.id
				join tck in data_context.tickers on dvd.ticker_id equals tck.id
				where (!dvd.deleted) && (dvd.user_id == current_user!.user_id)
				select new DividendModel () {
					id = dvd.id,
					user_id = dvd.user_id,
					broker = brk.name ?? String.Empty,
					ticker = tck.symbol,
					company = tck.name ?? String.Empty,
					broker_id = dvd.broker_id,
					ticker_id = dvd.ticker_id,
					issue_date = dvd.issue_date,
					amount_per_share = dvd.amount_per_share,
					share_quantity = dvd.share_quantity,
					payout = dvd.amount_per_share * dvd.share_quantity
				}
			).ToList ();

			return (from dvd in dividends
				join hld in holdings on 
					new { dvd.user_id, dvd.broker_id, dvd.ticker_id } equals
					new { hld.user_id, hld.broker_id, hld.ticker_id }
				where (!dvd.deleted) && (dvd.user_id == current_user!.user_id)
				select dvd.Merge (new { hld.status })
			).ToList ();

		}// SelectQuery;


		private async Task<DividendModel?> GetDividendById (Guid? id) => (await SelectQuery ())?.Where ((DividendModel item) => item.id == id).FirstOrDefault ();


		/********/


		[HttpGet]
		[Route ("GetDividendTotals")]
		public async Task<IActionResult?> GetDividendTotals () {

			DividendModelList? data = (await SelectQuery ())?.ToList ();
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

		}// GetDividendTotals;


		[HttpPost]
		[Route ("GetDividends")]
		public async Task<IActionResult> GetDividends () {
			DividendModelList? result = (await SelectQuery ())?.OrderByDescending ((DividendModel dividend) => dividend.issue_date).ToList ();
			return new JsonResult (isset (result) ? result : Message ("No dividends recorded."));
		}// GetDividends;


		[HttpPost]
		[Route ("SaveDividend")]
		public async Task<IActionResult> SaveDividend ([FromBody] DividendRequestModel parameters) {

			if (parameters.reinvested) {
				TransactionsTableRecord transaction = new () { user_id = current_user!.user_id };
				transaction.Merge (parameters).transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0");
				transaction.quantity = parameters.purchase_quantity ?? 0;
				data_context.transactions.Save (transaction);
			}// if;

			data_context.dividends.Save (parameters);

			return new JsonResult (await GetDividendById (parameters.id));

		}// SaveDividend;

	}// Dividends;

}// Stockboy.Controllers;