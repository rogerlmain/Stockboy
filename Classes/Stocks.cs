using Stockboy.Classes.Data;
using Stockboy.Controllers;
using Stockboy.Models;

namespace Stockboy.Classes {

	public class Stocks {

		private const string alpha_vantage_api_key = "NP1ITADX88875NX9";
		private const string polygon_api_key = "uB06z9g2lPXlOl4koojYFpma_VYhm8bM";
		private const string finhubb_api_key = "co0qrqhr01qhaf74r5n0co0qrqhr01qhaf74r5ng";
		private const string yahoo_api_key = "Vds1tH8wD9FQxYogZzlwMQN80q1aKv1Urbx6doe0";

		private const string alpha_vantage_base_address = "https://www.alphavantage.co";
		private const string polygon_io_base_address = "https://api.polygon.io";


		public static async Task<StockDetailsModel?> get_stock_details (string tickers) {
			HttpClient client = new HttpClient ();
			HttpRequestMessage request = new () {
				Method = HttpMethod.Get,
				RequestUri = new Uri ($"https://yfapi.net/v6/finance/quote?symbols={tickers}"),
				Headers = {{ "x-api-key", yahoo_api_key }}
			};

			HttpResponseMessage response = await client.SendAsync (request);
			response.EnsureSuccessStatusCode ();
			StockDetailsModel result = await response.Content.ReadAsAsync<StockDetailsModel> ();
			return result;
		}


		public static List<HoldingsData> get_holdings (StockContext context) {

			List<HoldingsModel> holdings = context.holdings.SelectAll ().OrderBy ("name");
			List<HoldingsData>? holdings_data = null;

			//StockDetailsModel? stock_details = await get_stock_details (holdings);

			foreach (HoldingsModel holding in holdings) {
				HoldingsData data = HoldingsData.import (holding);
				//	data.price = get_stock_price (stock_details, data.ticker);
				//	data.value = is_null (data.price) ? null : data.price * data.amount;
				//	data.profit = is_null (data.value) ? null : data.value - data.cost;
				holdings_data ??= new ();
				holdings_data.Add (data);
			}

			return holdings_data;

		}

	}// Stocks;

}// namespace;


