﻿using Stockboy.Models;


namespace Stockboy.Classes {

	public class StockAPIClient (HttpClient client) {

		private const string quote_path = "quote-short";
		private const string dividend_path = "historical-price-full/stock_dividend";

		private const string exchange_api_key = "GWL8VaOub1b403hrhY0RGpKUnUl5yRhP";


		private async Task<TModel?> CallAPI<TModel> (string endpoint, string tickers) {

			HttpResponseMessage response = await client.GetAsync ($"{endpoint}/{tickers}?apikey={exchange_api_key}");

			if (response.IsSuccessStatusCode) {
				Stream stream = await response.Content.ReadAsStreamAsync ();
				return await JsonParser.Parse<TModel> (stream);
			}// if;

			return default;

		}// GetStockPrices;


		/********/


		public async Task<ShortStockQuoteList?> GetStockQuotes (String tickers) => await CallAPI<ShortStockQuoteList> (quote_path, tickers);
		public async Task<StockDividendHistory?> GetDividendHistory (String tickers) => await CallAPI<StockDividendHistory> (dividend_path, tickers);

	}// StockAPIClient;

}// Stockboy.Classes;