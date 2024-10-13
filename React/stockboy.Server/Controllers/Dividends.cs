using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Controllers;
using Stockboy.Server.Models;

namespace Stockboy.Server.Controllers {

	public class Dividends (DataContext context) : DataController<DividendDataModel, DividendListModel> (context) {

		[HttpPost]
		[Route ("GetDividends")]
		public IActionResult GetDividends ([FromBody] GetParameters parameters) => GetData ("get_dividends", parameters);

	}// Dividends;

}// Stockboy.Server.Controllers;