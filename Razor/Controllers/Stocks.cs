using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Data;
using Stockboy.Models;

using static Stockboy.Classes.Globals;


namespace Stockboy.Controllers {

	public class TickerModel {
		public string? ticker { get; set; } = String.Empty;
	}// TickerModel;


	public class StocksController : BaseController {

		[HttpPost]
		[Route ("lookup")]
		public async Task<IActionResult> Lookup ([FromBody] TickerModel ticker) => new JsonResult (await APIs.get_stock_details (ticker.ticker));


		[HttpPost]
		[Route ("UpdateHoldings")]
		public async Task<IActionResult> update_holdings ([FromBody] TableData table_data) {
			List<HoldingsModel> holdings_list = await Stocks.GetHoldings (context);
			return View ("Partials/Holdings", new TableModel () { 
				data_fields = table_data,
				list = holdings_list.OrderBy (String.Join (comma, table_data.sort_fields)) 
			});
		}// update_holdings;


		[HttpPost]
		[Route ("UpdateTransactions")]
		public IActionResult update_transactions ([FromBody] TableData? table_data) {
			List<TransactionsView>? purchases = Stocks.GetTransactionsView (context);
			if (purchases is not null) {
				if (table_data.sort_fields is not null) purchases = purchases.OrderBy (String.Join (comma, table_data.sort_fields));
				if (table_data.filters is not null) purchases = purchases.Where (item => table_data.filters.Contains (item.symbol)).ToList ();
			}
			return View ("Partials/Purchases", new TableModel () {
				list = purchases,
				data_fields = table_data
			});
		}// update_transactions;


		[HttpPost]
		[Route ("UpdateTickers")]
		public IActionResult update_tickers ([FromBody] TableData table_data) {
			List<TickersView>? tickers = Stocks.GetTickersView (context).OrderBy (String.Join (comma, table_data.sort_fields));
			return View ("Partials/Tickers", new TableModel () { list = tickers });
		}// update_tickers;


		public StocksController (StockContext context) => this.context = context;

	}// Stocks;

}// Stockboy.Controllers;