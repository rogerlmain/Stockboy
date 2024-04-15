using Newtonsoft.Json;
using Stockboy.Models;
using Stockboy.Models.APIs;

using static Stockboy.Classes.Globals;

namespace Stockboy.Classes {
	public class APIs {

		private const string alpha_vantage_api_key = "NP1ITADX88875NX9";
		private const string polygon_api_key = "uB06z9g2lPXlOl4koojYFpma_VYhm8bM";
		private const string finhubb_api_key = "co0qrqhr01qhaf74r5n0co0qrqhr01qhaf74r5ng";
		private const string yahoo_api_key = "Vds1tH8wD9FQxYogZzlwMQN80q1aKv1Urbx6doe0";
		private const string fmp_api_key = "GWL8VaOub1b403hrhY0RGpKUnUl5yRhP";

		private const string alpha_vantage_base_address = "https://www.alphavantage.co";
		private const string polygon_io_base_address = "https://api.polygon.io";
		private const string fmp_base_address = "https://financialmodelingprep.com";

		public static async Task<StockDetailsModel?> get_stock_details (string? tickers) {
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


		public static async Task<Model> get_data<Model> (String url) {
			HttpClient client = new HttpClient ();
			HttpRequestMessage request = new () {
				Method = HttpMethod.Get,
				RequestUri = new Uri (url),
			};
			HttpResponseMessage response = await client.SendAsync (request);
			response.EnsureSuccessStatusCode ();
			return await response.Content.ReadAsAsync<Model> ();
		}


		public static async Task<FMPDividendHistory> get_historical_dividends (String ticker) {
			String url = $"{fmp_base_address}/api/v3/historical-price-full/stock_dividend/{ticker}?apikey={fmp_api_key}";
			return await get_data<FMPDividendHistory> (url);
		}
		

		public static async Task<FMPStockHistory> get_historical_pricing (String ticker, DateOnly start_date, DateOnly? end_date = null) {
			if (end_date is null) end_date = start_date;
			String url = $"{fmp_base_address}/api/v3/historical-price-full/{ticker}?apikey={fmp_api_key}&from={start_date.ToString ("yyyy-MM-dd")}&to={end_date?.ToString ("yyyy-MM-dd")}";
			return await get_data<FMPStockHistory> (url);
		}


	}
}
