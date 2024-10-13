using System.Diagnostics.Contracts;


namespace Stockboy.Server.Models.APIs {

	public class FMPStockHistoryItem {
		public DateOnly date { get; set; }
		public decimal open { get; set; }
		public decimal high { get; set; }
		public decimal low { get; set; }
		public decimal close { get; set; }
		public decimal adjClose { get; set; }
		public int volume { get; set; }
		public int unadjustedVolume { get; set; }
		public decimal change { get; set; }
		public decimal changePercent { get; set; }
		public decimal vwap { get; set; }
		public String label { get; set; } = String.Empty;
		public decimal changeOverTime { get; set; }
    }


	public class FMPStockHistory {
		public String symbol { get; set; } = String.Empty;
		public List<FMPStockHistoryItem> historical { get; set; }
	}


	public class FMPDividendHistoryItem {
		public DateOnly date { get; set; }
		public String label { get; set; } = String.Empty;
		public decimal adjDividend { get; set; }
		public decimal dividend { get; set; }
		public DateOnly recordDate { get; set; }
		public DateOnly paymentDate { get; set; }
		public DateOnly declarationDate { get; set; }
	}


	public class FMPDividendHistory {
		public String symbol { get; set; } = String.Empty;
		public List<FMPDividendHistoryItem> historical { get; set; }
	}


	public class FMPHistory {
		public FMPDividendHistory dividends { get; set; }
		public FMPStockHistory stocks { get; set; }
	}

}
