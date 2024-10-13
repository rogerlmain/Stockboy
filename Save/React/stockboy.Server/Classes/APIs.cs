using Stockboy.Server.Models;
using Stockboy.Server.Models.APIs;

namespace Stockboy.Server.Classes {

	public class APIs {

		private const string api_key = "uB06z9g2lPXlOl4koojYFpma_VYhm8bM";
		private const string base_address = "https://api.polygon.io";


		public static async Task<StockDetailsModel?> get_stock_details (string? ticker) {
			HttpClient client = new HttpClient ();
			HttpRequestMessage request = new () {
				Method = HttpMethod.Get,
				RequestUri = new Uri ($"{base_address}/v3/reference/tickers?ticker={ticker}&active=true&limit=100&apiKey={api_key}"),
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
			String url = $"{base_address}/api/v3/historical-price-full/stock_dividend/{ticker}?apikey={api_key}";
			return await get_data<FMPDividendHistory> (url);
		}
		

		public static async Task<FMPStockHistory> get_historical_pricing (String ticker, DateOnly start_date, DateOnly? end_date = null) {
			if (end_date is null) end_date = start_date;
			String url = $"{base_address}/api/v3/historical-price-full/{ticker}?apikey={api_key}&from={start_date.ToString ("yyyy-MM-dd")}&to={end_date?.ToString ("yyyy-MM-dd")}";
			return await get_data<FMPStockHistory> (url);
		}


	}

}// Stockboy.Server.Classes;