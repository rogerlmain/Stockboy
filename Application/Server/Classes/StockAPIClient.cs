using Stockboy.Models;
using System.Text.Json;


namespace Stockboy.Classes {

	public class StockAPIClient {

		private const string quote_path = "quote-short";
		private const string dividend_path = "historical-price-full/stock_dividend";

		private const string exchange_api_key = "GWL8VaOub1b403hrhY0RGpKUnUl5yRhP";


		private async Task<TModel?> CallAPI<TModel> (string endpoint, string tickers) {

			HttpResponseMessage response = await stock_client.GetAsync ($"{endpoint}/{tickers}?apikey={exchange_api_key}");

			if (response.IsSuccessStatusCode) {
				Stream stream = await response.Content.ReadAsStreamAsync ();
				//return await JsonSerializer.DeserializeAsync<TModel> (stream);
				return await JsonParser.Parse<TModel> (stream);
			}// if;

			return default;

		}// GetStockPrices;


		/********/


		public HttpClient? stock_client = null;


		public async Task<List<ShortStockQuote>?> GetStockQuotes (String tickers) => await CallAPI<List<ShortStockQuote>> (quote_path, tickers);
		public async Task<StockDividendHistory?> GetDividendHistory (String tickers) => await CallAPI<StockDividendHistory> (dividend_path, tickers);


		public StockAPIClient (HttpClient client) {
			stock_client = client;
		}// constructor;


	}// StockAPIClient;

}// Stockboy.Classes;