namespace Stockboy.Models {

	public class DividendRequestModel: DividendsTable {
		public Boolean reinvested { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public decimal price { get; set; }
	}// DividendRequestModel;


	public class DividendListModel: StockDataModel {
        public string broker { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
        public DateTime issue_date { get; set; }
        public decimal amount_per_share { get; set; }
        public decimal share_quantity { get; set; }
        public decimal payout { get; set; }
	}// DividendListModel;


	public class DividendSummaryModel: StockModel {
        public decimal payout { get; set; }
	}// DividendSummaryModel;

}// Stockboy.Models;