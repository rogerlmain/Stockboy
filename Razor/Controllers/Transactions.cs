using Microsoft.AspNetCore.Mvc;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class Transactions : Controller {


		[HttpPost]
		[Route ("TransactionHistory")]
		public IActionResult transaction_history ([FromBody] StringData parameters) {
			TableModel model = new TableModel () {
				list = Classes.Transactions.GetTransactionHistory (parameters.text)
			};
			return View ("Partials/TransactionHistory", model);
		}


	}// Transactions;

}// Stockboy.Controllers;
