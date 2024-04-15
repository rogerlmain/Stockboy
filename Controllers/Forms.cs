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


		[Route ("CreatePurchaseForm")]
		public IActionResult create_purchase () {
			PurchaseFormModel model = new () {
				brokers = context.brokers.SelectAll ().OrderBy ("name"),
				tickers = context.tickers.SelectAll ().OrderBy ("name"),
				purchase_types = context.purchase_types.SelectAll ()
			};
			return View ("Forms/Purchases", model);
		}


		[Route ("EditPurchaseForm")]
		[HttpPost]
		public IActionResult edit_purchase ([FromBody] StringData purchase_id) {
			PurchaseFormModel model = new () {
				purchase = context.ExecuteProcedure<PurchasesTable> ("select_purchase_by_id", new Dictionary<String, Object> () { {"id", new Guid (purchase_id.text)} }),
				brokers = context.brokers.SelectAll ().OrderBy ("name"),
				tickers = context.tickers.SelectAll ().OrderBy ("name"),
				purchase_types = context.purchase_types.SelectAll ()
			};
			return View ("Forms/Purchases", model);
		}


		[Route ("CreateDividendForm")]
		public IActionResult create_dividend () {
			DividendFormModel model = new () {
				brokers = context.brokers.SelectAll ().OrderBy ("name"),
				tickers = context.tickers.SelectAll ().OrderBy ("name"),
			};
			return View ("Forms/Dividends", model);
		}


		[Route ("SaveDividend")]
		[HttpPost]
		public IActionResult save_dividend (DividendsTable dividend) {
			try {
				switch (dividend.id is null) {
					case true: context.dividends.Add (dividend); break;
					default: context.dividends.Update (dividend); break;
				}
				context.SaveChanges ();
				ViewData ["name"] = "Purchase";
			} catch (Exception except) {
				ViewData ["error"] = except.Message;
			}

			return View ("Forms/SaveResult", ViewData);

		}


		[Route ("SaveTicker")]
		[HttpPost]
		public async Task<IActionResult> save_ticker ([FromBody] StringData ticker) {
			try {
				StockDetails? stock = (await APIs.get_stock_details (ticker.text))?.get_details (ticker.text);

				if (stock is not null) {

					context.tickers.Add (new TickersTable () {
						symbol = stock.symbol,
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
		public IActionResult save_broker ([FromBody] StringData broker) {
			try {
				context.brokers.Add (new BrokersTable () { name = broker.text });
				context.SaveChanges ();
				ViewData ["name"] = broker.text;
			} catch (Exception except) {
				ViewData ["error"] = except.Message;
			}

			return View ("Forms/SaveResult", ViewData);
		}


		[Route ("SavePurchase")]
		[HttpPost]
		public IActionResult save_purchase ([FromBody] PurchasesTable purchase) {
			try {
				switch (purchase.id is null) {
					case true: context.purchases.Add (purchase); break;
					default: context.purchases.Update (purchase); break;
				}
				context.SaveChanges ();
				ViewData ["name"] = "Purchase";
			} catch (Exception except) {
				ViewData ["error"] = except.Message;
			}

			return View ("Forms/SaveResult", ViewData);
		}

		public FormsController (StockContext context) => this.context = context;
	}
}
