using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Data;
using Stockboy.Models;

using static Stockboy.Classes.Globals;


namespace Stockboy.Controllers {

	public class TickerModel {
		public string? ticker { get; set; } = String.Empty;
	}


	public class StocksController : BaseController {

		[Route ("lookup")]
		[HttpPost]
		public async Task<IActionResult> Lookup ([FromBody] TickerModel ticker) => new JsonResult (await APIs.get_stock_details (ticker.ticker));


		[Route ("UpdateHoldings")]
		[HttpPost]
		public async Task<IActionResult> update_holdings ([FromBody] TableData table_data) {
			List<HoldingsModel> holdings_list = await Stocks.get_holdings (context);
			return View ("Partials/Holdings", new TableModel () { list = holdings_list.OrderBy (String.Join (comma, table_data.sort_fields)) });
		}


		[Route ("UpdatePurchases")]
		[HttpPost]
		public IActionResult update_purchases ([FromBody] TableData? table_data) {
			List<PurchasesView>? purchases = Stocks.get_purchases_view (context);
			if (purchases is not null) {
				if (table_data.sort_fields is not null) purchases = purchases.OrderBy (String.Join (comma, table_data.sort_fields));
				if (table_data.filters is not null) purchases = purchases.Where (item => table_data.filters.Contains (item.symbol)).ToList ();
			}
			return View ("Partials/Purchases", new TableModel () {
				list = purchases,
				data_fields = table_data
			});
		}


		[Route ("UpdateTickers")]
		[HttpPost]
		public IActionResult update_tickers ([FromBody] TableData table_data) {
			List<TickersView>? tickers = Stocks.get_tickers_view (context).OrderBy (String.Join (comma, table_data.sort_fields));
			return View ("Partials/Tickers", new TableModel () { list = tickers });
		}


		public StocksController (StockContext context) => this.context = context;

	}

}
