﻿namespace Stockboy.Models {

	public class ShortStockQuote {
		public string symbol { get; set; } = String.Empty;
		public Decimal price { get; set; } = Decimal.Zero;
		public int volume { get; set; } = 0;
	}// ShortStockQuote;


	public class StockDividendHistory {
		public HistoricalStockList [] historicalStockList { get; set; } = Array.Empty<HistoricalStockList> ();
	}// StockDividendHistory;


	public class HistoricalStockList {
		public String symbol { get; set; } = String.Empty;
		public StockDividendData [] historical { get; set; } = Array.Empty<StockDividendData> ();
	}// HistoricalStockList;


	public class StockStatistics {
		public ShortStockQuote? price = null;
		public HistoricalStockList? history = null;
	}// StockStatistics;


    public class StockDividendData {
		public DateTime? date { get; set; } = DateTime.Now;
		public String label { get; set; } = String.Empty;
		public Decimal adjDividend { get; set; } = Decimal.Zero;
		public Decimal dividend { get; set; } = Decimal.Zero;
		public DateTime? recordDate { get; set; } = DateTime.Now;
		public DateTime? paymentDate { get; set; } = DateTime.Now;
		public DateTime? declarationDate { get; set; } = null;
    }// StockDividendData;

}// Stockboy.Models;