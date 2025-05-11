using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Classes.Extensions;
using Stockboy.Controllers.Abstract;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class TickersController: BaseController {

		[HttpPost]
		[Route ("GetTickers")]
		public IActionResult GetTickers () {

			var result = (
				from tck in data_context.tickers.Where (ticker => !ticker.deleted)
				from utk in data_context.user_tickers.Where (user_ticker => tck.id == user_ticker.ticker_id).DefaultIfEmpty ()
				where
					((utk.ticker_id != tck.id) && tck.approved) || 
					((utk.user_id == current_user!.user_id) && utk.deleted)
				select new {
					name = tck.id,
					value = tck.name,
					tck.symbol
				}
			).OrderBy (ticker => ticker.value).ToList ();

			return new JsonResult (result);

		}// GetBrokers;


		[HttpPost]
		[Route ("GetUserTickers")]
		public IActionResult GetUserTickers () {

			var result = (
				from tck in data_context.tickers
				join utk in data_context.user_tickers on
					tck.id equals utk.ticker_id
				where
					(utk.user_id == current_user!.user_id) &&
					(!tck.deleted) && (!utk.deleted)
				select new {
					tck.id,
					tck.name,
					tck.symbol,
					tck.price,
					tck.volume,
					tck.last_payment_date,
					tck.next_payment_date
				}
			).Distinct ().OrderBy (result => result.name);

			return new JsonResult (result);

		}// GetTickers;


		[HttpPost]
		[Route ("SaveTicker")]
		public async Task<IActionResult> SaveTicker ([FromBody] UserTickerRecord parameters) {

			if (parameters.ticker is null) throw new Exception ("Ticker is undefined");

			StockStatistics statistics = await HoldingsData.GetStockStatistics (http_context, parameters.symbol);

			if ((statistics.price is not null) && (statistics.history is not null)) {

				TickerTableModel ticker_table = new () {
					id = parameters.id,
					name = parameters.ticker,
					symbol = parameters.symbol
				};

				HoldingsData.SetStockData (ticker_table, statistics.history, statistics.price);
				ticker_table.frequency = HoldingsData.GetDividendFrequency (statistics.history);
				data_context.tickers.Save (ticker_table);
				return new JsonResult (ticker_table);

			}// if;

			UserTickerTableRecord user_ticker = new () {
				user_id = parameters.user_id,
				ticker_id = parameters.id,
			};

			data_context.user_tickers.Save (user_ticker);

			return new JsonResult (new {
				id = parameters.id,
				name = parameters.ticker,
			});

		}// SaveTicker;


		[HttpPost]
		[Route ("DeleteTicker")]
		public IActionResult DeleteTicker ([FromBody] DataModel parameters) => this.DeleteRecord (data_context.tickers, parameters);

	}// Tickers;

}// Stockboy.Controllers;