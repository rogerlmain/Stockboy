using Newtonsoft.Json;
using Newtonsoft.Json.Converters;


namespace Stockboy.Models {

	public class StockDetails {
		public decimal ask { get; set; }
		public decimal askSize { get; set; }
		public int averageDailyVolume10Day { get; set; }
		public int averageDailyVolume3Month { get; set; }
		public decimal bid { get; set; }
		public decimal bidSize { get; set; }
		public decimal bookValue { get; set; }
		public string? currency { get; set; }

		[JsonProperty (PropertyName="dividendDate")] 
		[JsonConverter (typeof(UnixDateTimeConverter))]
		public DateTime dividendDate { get; set; }

		[JsonProperty (PropertyName="earningsTimestamp")] 
		[JsonConverter (typeof(UnixDateTimeConverter))]
		public DateTime earningsTimestamp { get; set; }

		[JsonProperty (PropertyName="earningsTimestampEnd")] 
		[JsonConverter (typeof(UnixDateTimeConverter))]
		public DateTime earningsTimestampEnd { get; set; }

		[JsonProperty (PropertyName="earningsTimestampStart")] 
		[JsonConverter (typeof(UnixDateTimeConverter))]
		public DateTime earningsTimestampStart { get; set; }

		[JsonProperty (PropertyName="regularMarketTime")] 
		[JsonConverter (typeof(UnixDateTimeConverter))]
		public DateTime regularMarketTime { get; set; }

		public decimal epsCurrentYear { get; set; }
		public decimal epsForward { get; set; }
		public decimal epsTrailingTwelveMonths { get; set; }
		public Boolean esgPopulated { get; set; }
		public string? exchange { get; set; }
		public decimal exchangeDataDelayedBy { get; set; }
		public string? exchangeTimezoneName { get; set; }
		public string? exchangeTimezoneShortName { get; set; }
		public decimal fiftyDayAverage { get; set; }
		public decimal fiftyDayAverageChange { get; set; }
		public decimal fiftyDayAverageChangePercent { get; set; }
		public decimal fiftyTwoWeekHigh { get; set; }
		public decimal fiftyTwoWeekHighChange { get; set; }
		public decimal fiftyTwoWeekHighChangePercent { get; set; }
		public decimal fiftyTwoWeekLow { get; set; }
		public decimal fiftyTwoWeekLowChange { get; set; }
		public decimal fiftyTwoWeekLowChangePercent { get; set; }
		public string? fiftyTwoWeekRange { get; set; }
		public string? financialCurrency { get; set; }
		public decimal forwardPE { get; set; }
		public string? fullExchangeName { get; set; }
		public int gmtOffSetMilliseconds { get; set; }
		public string? language { get; set; }
		public string? longName { get; set; }
		public string? market { get; set; }
		public decimal marketCap { get; set; }
		public string? marketState { get; set; }
		public string? messageBoardId { get; set; }
		public decimal priceEpsCurrentYear { get; set; }
		public int priceHint { get; set; }
		public decimal priceToBook { get; set; }
		public string? quoteSourceName { get; set; }
		public string? quoteType { get; set; }
		public string? region { get; set; }
		public decimal regularMarketChange { get; set; }
		public decimal regularMarketChangePercent { get; set; }
		public decimal regularMarketDayHigh { get; set; }
		public decimal regularMarketDayLow { get; set; }
		public string? regularMarketDayRange { get; set; }
		public decimal regularMarketOpen { get; set; }
		public decimal regularMarketPreviousClose { get; set; }
		public decimal regularMarketPrice { get; set; }

		public decimal regularMarketVolume { get; set; }
		public decimal sharesOutstanding { get; set; }
		public string? shortName { get; set; }
		public int sourceInterval { get; set; }
		public string? symbol { get; set; }
		public Boolean tradeable { get; set; }
		public decimal trailingAnnualDividendRate { get; set; }
		public decimal trailingAnnualDividendYield { get; set; }
		public Boolean triggerable { get; set; }
		public Decimal twoHundredDayAverage { get; set; }
		public Decimal twoHundredDayAverageChange { get; set; }
		public Decimal twoHundredDayAverageChangePercent { get; set; }

	}


	public class StockDetailsResult {
		public List<StockDetails>? result { get; set; }
		public string? error { get; set; }
	}


	public class StockDetailsModel {
		public StockDetailsResult? quoteResponse { get; set; }

		public Boolean has_stocks { get => ((quoteResponse?.result is not null) && (quoteResponse?.result?.Count > 0)); }

		public Boolean no_stocks { get => !has_stocks; }

		public StockDetails? get_details (string ticker) {
			if ((has_stocks) && (quoteResponse?.result is not null)) foreach (StockDetails details in quoteResponse.result) {
				if (details.symbol == ticker) return details;
			}
			return null;
		}
	}

}// Stockboy.Models;
