using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;

namespace Stockboy.Server.Controllers {

	[EnableCors]
	public class Splits (DataContext context): DataController<SplitDataModel, SplitListModel> (context) {

		[HttpPost]
		[Route ("GetSplits")]
		public IActionResult GetSplits ([FromBody] GetParameters parameters) => GetData ("get_splits", parameters);


		[HttpPost]
		[Route ("SaveSplit")]
		public IActionResult SaveSplit ([FromBody] SplitDataModel parameters) => SaveData ("get_split_by_id", parameters);

	}// Splits;

}// Stockboy.Server.Controllers;