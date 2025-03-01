using Microsoft.AspNetCore.Mvc;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class StocksController: BaseController {


		public HoldingsModelList holdings_model_query (HoldingsData holdings_data) {

			var grouped_data = (from act in holdings_data.GetActivity
				group act by new {
					act.broker_id,
					act.ticker_id
				} into gac
				select gac.Last () into lga
				select new HoldingsModel () {
					broker_id = lga.broker_id,
					ticker_id = lga.ticker_id,
  					broker = lga.broker,
					company = lga.company,
					symbol = lga.symbol,
					quantity = lga.total_quantity ?? 0,
					current_price = lga.current_price,
					current_purchase_cost = lga.total_cost,
					value = lga.quantity * lga.current_price,
				}// select;
			);

			return (holdings_data.GetStatus is null) ? grouped_data.ToList () : (from gda in grouped_data
				join hst in holdings_data.GetStatus on gda.ticker_id equals hst.ticker_id
				select gda.Merge (new {hst.status})
			).ToList ();

		}// holdings_model_query;


		[HttpPost]
		[Route ("GetHoldings")]
		public async Task<IActionResult> GetHoldings ([FromBody] Boolean refresh) {

			DividendsHandler dividends = new (data_context);
			HoldingsData holdings_data = await HoldingsData.Current (http_context, refresh);
			HoldingsModelList? holdings_list = holdings_model_query (holdings_data).ToList ();

			if (is_null (holdings_list)) return Message ("No data");

			return new JsonResult (new HomeModel () {
				//payments_list = null,//dividends.GetPendingPayments (holdings_data),
				//monthly_payout = new DividendPayout (), //dividends.GetMonthlyPayout (holdings_list!),
				holdings_list = holdings_list
			});

		}// GetHoldings;


		[HttpPost]
		[Route ("GetStockDetails")]
		public IActionResult GetStockDetails ([FromBody] StockModel stock) {
			return new JsonResult (new StockDetails (http_context).GetStockDetails (stock));
		}// GetStockDetails;

	}// Holdings;

}// Stockboy.Controllers;