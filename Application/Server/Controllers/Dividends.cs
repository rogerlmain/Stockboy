using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Extensions;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class DividendsController : BaseController {

		private async Task<IEnumerable<DividendModel>> SelectQuery () {

			HoldingsStatusList? holdings_status = (await HoldingsData.Current (http_context)).GetStatus;

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

			if (holdings_status is null) return dividends;

			return (from dvd in dividends
				join hld in holdings_status on dvd.ticker_id equals hld.ticker_id
				select dvd.Merge (new { hld.status })
			);

		}// SelectQuery;


		private List<GraphData>? get_dividend_totals (DividendTotalsModel parameters) {

			if (parameters.start_date is null) parameters.start_date = new DateTime (DateTime.Today.Year - 1, DateTime.Today.Month + 1, 1);
			if (parameters.end_date is null) parameters.end_date = DateTime.Today;

			var dividends = (from dividend in data_context.dividends
				where
					(dividend.issue_date >= parameters.start_date) &&
					(dividend.issue_date <= parameters.end_date) &&
					((dividend.ticker_id == parameters.ticker_id) || (parameters.ticker_id == null))
				group dividend by new { dividend.issue_date.Month, dividend.issue_date.Year } into grouped_data
				select new {
					date = grouped_data.Key,
					description = $"{month_abbreviation (grouped_data.Key.Month)} '{grouped_data.Key.Year % 100}",
					amount = Math.Round (grouped_data.Sum (item => item.share_quantity * item.amount_per_share), 2)
				}
			);

			var dates = (from date in (from month in Enumerable.Range (0, 12) select parameters.start_date.Value.AddMonths (month))
				select new { issue_date = date }
			);

			List<GraphData>? result = (from data in (from date in dates
				join dividend in dividends on new {
					date.issue_date.Month,
					date.issue_date.Year
				} equals new {
					dividend.date.Month,
					dividend.date.Year
				} into data
				from joined_data in data.DefaultIfEmpty ()
				select new {
					date_value = (date.issue_date.Year * 12) + date.issue_date.Month,
					description = $"{month_abbreviation (date.issue_date.Month)} '{date.issue_date.Year % 100}",
					amount = joined_data?.amount ?? 0
				}
			).OrderBy (item => item.date_value)
				select new GraphData () {
					description = data.description,
					value = data.amount
				}
			).ToListOrNull ();

			return result;

		}// get_dividend_totals;


		private async Task<DividendModel?> GetDividendById (Guid? id) => (await SelectQuery ())?.Where ((DividendModel item) => item.id == id).FirstOrDefault ();


		/********/


		[HttpGet]
		[Route ("GetDividendTotals")]
		public async Task<IActionResult>? GetDividendTotals () {

			DividendModelList? data = (await SelectQuery ())?.ToList ();
			DividendSummaryList? summary = null;

			if (isset (data)) foreach (var item in data!) {

				summary ??= new ();
				DividendSummary? model = summary.Find (summary_item => (summary_item.broker_id == item.broker_id) && (summary_item.ticker_id == item.ticker_id));

				if (is_null (model)) {
					model = new () {
						broker_id = (Guid) item.broker_id!,
						ticker_id = (Guid) item.ticker_id!,
						payout = 0
					};
					summary.Add (model);
				}// if;

				model!.payout += item.payout;

			}// if;

			return new JsonResult (summary);

		}// GetDividendTotals;


		[HttpPost]
		[Route ("GetDividendTotals")]
		public IActionResult GetDividendTotals ([FromBody] DividendTotalsModel parameters) {
			return new JsonResult (get_dividend_totals (parameters));
		}// GetDividendTotals;


		[HttpPost]
		[Route ("GetDividendPercentages")]
		public IActionResult GetDividendPercentages ([FromBody] DateRangeParameters parameters) {

			if (parameters.start_date is null) parameters.start_date = new DateTime (DateTime.Today.Year - 1, DateTime.Today.Month + 1, 1);
			if (parameters.end_date is null) parameters.end_date = DateTime.Today;

			List<GraphData>? result = (from dividend in data_context.dividends
				where (dividend.issue_date >= parameters.start_date) && (dividend.issue_date <= parameters.end_date)
				join ticker in data_context.tickers on dividend.ticker_id equals ticker.id
				select new { dividend, ticker } into joined_data
				group joined_data by joined_data.dividend.ticker_id into grouped_data
				select new GraphData () {
					description = grouped_data.First ().ticker.name ?? "Undefined",
					value = grouped_data.Sum (item => item.dividend.share_quantity * item.dividend.amount_per_share)
				}
			).ToListOrNull ()?.SortDescending ("value");

			return new JsonResult (result);

		}// GetDividendPercentages;


		[HttpPost]
		[Route ("GetCompanyPercentages")]
		public IActionResult GetCompanyPercentages ([FromBody] DateRangeParameters parameters) {

			Dictionary<String, List<GraphData>>? result = null;

			if (parameters.start_date is null) parameters.start_date = new DateTime (DateTime.Today.Year - 1, DateTime.Today.Month + 1, 1);
			if (parameters.end_date is null) parameters.end_date = DateTime.Today;

			List<ValueModel>? company_ids = (from dividend in data_context.dividends
				where (dividend.issue_date >= parameters.start_date) && (dividend.issue_date <= parameters.end_date)
				join ticker in data_context.tickers on dividend.ticker_id equals ticker.id
				select new ValueModel {
					id = (Guid) ticker.id!,
					value = ticker.name!
				}// select;
			).Distinct ().OrderBy ((ValueModel value) => value.value).ToListOrNull ();

			if (company_ids is not null) foreach (ValueModel company in company_ids) {

				List<GraphData>? data = get_dividend_totals (new DividendTotalsModel () { 
					increment = Period.monthly,
					ticker_id = company.id 
				});

				if (data is null) continue;
				result ??= new ();
				result.Add (company.value, data);

			}// if;

			return new JsonResult (result);

		}// GetCompanyPercentages;


		[HttpPost]
		[Route ("GetDividends")]
		public async Task<IActionResult> GetDividends () {
			DividendModelList? result = (await SelectQuery ()).OrderByDescending ((DividendModel dividend) => dividend.issue_date).ToList ();
			return new JsonResult (isset (result) ? result : Message ("No dividends recorded."));
		}// GetDividends;


		[HttpPost]
		[Route ("SaveDividend")]
		public IActionResult SaveDividend ([FromBody] DividendRequestModel parameters) {

			if (parameters.reinvested) {

				TransactionsTableModel transaction = new () { 
					id = Guid.NewGuid (),
					user_id = current_user!.user_id 
				};

				transaction.Merge (parameters).transaction_type_id = new Guid ("D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0");
				transaction.quantity = parameters.purchase_quantity ?? 0;

				data_context.transactions.Save (transaction);

			}// if;

			data_context.dividends.Save (parameters);

			return new JsonResult (GetDividendById (parameters.id));

		}// SaveDividend;

	}// Dividends;

}// Stockboy.Controllers;