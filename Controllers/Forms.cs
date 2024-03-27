using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Data;
using Stockboy.Models;

using static Stockboy.Classes.Globals;

namespace Stockboy.Controllers {

	public class FormsController : BaseController {

		[Route ("TickerForm")]
		public IActionResult ticker_form () => View ("Forms/Tickers");


		[Route ("BrokerForm")]
		public IActionResult brokerage_form () => View ("Forms/Brokers");


		[Route ("PurchaseForm")]
		public IActionResult purchase_form () {
			PurchaseFormModel model = new () {
				brokers = context.brokers.SelectAll ().OrderBy ("name"),
				tickers = context.tickers.SelectAll ().OrderBy ("name"),
				purchase_types = context.purchase_types.SelectAll ()
			};
			return View ("Forms/Purchases", model);
		}


		[Route ("SaveTicker")]
		[HttpPost]
		public async Task<IActionResult> save_ticker ([FromBody] StringModel ticker) {
			try {
				StockDetails? stock = (await Stocks.get_stock_details (ticker.text))?.get_details (ticker.text);

				if (not_null (stock)) {

					context.tickers.Add (new Ticker () {
						ticker = stock.symbol,
						name = stock.longName
					});

					context.SaveChanges ();
					ViewData ["name"] = $"{stock.longName} ({stock.symbol})";
				}

			} catch (Exception except) {
				ViewData ["error"] = except.Message;
			}

			return View ("Forms/SaveResult", ViewData);
		}

		[Route ("SaveBroker")]
		[HttpPost]
		public IActionResult save_broker ([FromBody] StringModel broker) {
			try {
				context.brokers.Add (new Broker () { name = broker.text });
				context.SaveChanges ();
				ViewData ["name"] = broker.text;
			} catch (Exception except) {
				ViewData ["error"] = except.Message;
			}

			return View ("Forms/SaveResult", ViewData);
		}


		[Route ("SavePurchase")]
		[HttpPost]
		public IActionResult save_purchase ([FromBody] PurchaseDataModel purchase) {
			try {
				context.purchases.Add (purchase);
				context.SaveChanges ();
				ViewData["name"] = "Purchase";
			} catch (Exception except) {
				ViewData["error"] = except.Message;
			}

			return View ("Forms/SaveResult", ViewData);
		}

		public FormsController (StockContext context) => this.context = context;
	}
}
