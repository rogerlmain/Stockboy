using Microsoft.AspNetCore.Mvc;
using Stockboy.Controllers.Abstract;
using Stockboy.Classes;
using Stockboy.Models;


namespace Stockboy.Controllers {

	public class StocksController: BaseController {


		public HoldingsModelList? holdings_model_query (HoldingsData holdings_data) {
			return (holdings_data.GetStatus is null) ? holdings_data.GetActivityList () : (from gda in holdings_data.GetActivityList ()
				join hst in holdings_data.GetStatus on gda.ticker_id equals hst.ticker_id
				select gda.Merge (new {
					hst.status,
					value = gda.quantity * gda.current_price,
					profit = (gda.quantity * gda.current_price) - gda.current_purchase_cost
				})
			)?.ToList ();
		}// holdings_model_query;


		[HttpPost]
		[Route ("GetHoldings")]
		public async Task<IActionResult> GetHoldings ([FromBody] Boolean refresh) {

			DividendsHandler dividends = new (data_context);
			HoldingsData holdings_data = await HoldingsData.Current (http_context, refresh);
			HoldingsModelList? holdings_list = holdings_model_query (holdings_data).ToList ();

			if (is_null (holdings_list)) return NullData;

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