using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Splits (DataContext context): BaseController (context) {

		private IQueryable<SplitListModel> SelectQuery () {
			IQueryable<SplitListModel> result = from spl in context.splits
				join brk in context.brokers on spl.broker_id equals brk.id 
				join tck in context.tickers on spl.ticker_id equals tck.id
				select new SplitListModel () {
					id = spl.id,
					user_id = spl.user_id,
					broker_id = brk.id,
					ticker_id = tck.id,
					broker = brk.name ?? String.Empty,
					company = tck.name ?? String.Empty,
					symbol = tck.symbol,
					previous = spl.previous,
					current = spl.current,
					split_date = spl.split_date
				};
			return result;
		}// SelectQuery;


		private SplitListModel? GetSplitById (Guid? id) {
			return SelectQuery ().Where ((SplitListModel item) => item.id == id).FirstOrDefault ();
		}// GetSplitById;


		/********/


		[HttpGet]
		[Route ("GetSplits")]
		public IActionResult GetSplits () => new JsonResult (SelectQuery ().OrderByDescending (item => item.split_date).ToList ());


		[HttpPost]
		[Route ("SaveSplit")]
		public IActionResult SaveSplit ([FromBody] SplitsTableRecord parameters) {

  			switch (isset (parameters.id)) {
				case true: context.splits.Update (parameters); break;
				default: context.splits.Add (parameters); break;
			}// switch;

			context.SaveChanges ();

			return new JsonResult (GetSplitById (parameters.id));

		}// SaveSplit;

	}// Splits;

}// Stockboy.Controllers;