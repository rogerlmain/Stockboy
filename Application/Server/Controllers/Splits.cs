using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Queries;
using Stockboy.Models;


namespace Stockboy.Controllers {

	[EnableCors]
	public class Splits (DataContext context): DataController<SplitsTable, SplitListModel> (context) {

		[HttpGet]
		[Route ("GetSplits")]
		public IActionResult GetSplits () => new JsonResult (SplitsQueries.get_splits (context).OrderByDescending (item => item.split_date).ToList ());


		[HttpPost]
		[Route ("SaveSplit")]
		public IActionResult SaveSplit ([FromBody] SplitsTable parameters) => SaveData ("get_split_by_id", parameters);

	}// Splits;

}// Stockboy.Controllers;