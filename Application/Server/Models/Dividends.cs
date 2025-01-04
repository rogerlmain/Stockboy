namespace Stockboy.Models {

	public class DividendRequestModel: DividendsTableRecord {
		public Boolean reinvested { get; set; } = false;
		public required DateTime transaction_date { get; set; }
		public required DateTime settlement_date { get; set; }
		public required decimal price { get; set; }
		public required decimal purchase_quantity { get; set; }
	}// DividendRequestModel;


	public class DividendModel: StockDataModel {
        public string broker { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public String status { get; set; } = String.Empty;
        public DateTime issue_date { get; set; }
        public decimal amount_per_share { get; set; }
        public decimal share_quantity { get; set; }
        public decimal payout { get; set; }
	}// DividendModel;


	public class DividendSummary: StockModel {
        public required decimal payout { get; set; }
	}// DividendSummary;


	class DividendHistory {
		public required Guid? ticker_id { get; set; } = null;
		public required String symbol { get; set; }
		public required DateTime payment_date { get; set; }
	}// DividendHistory;


	public class DividendPayment {
		public required String company { get; set; }
		public required String ticker { get; set; }
		public required DateTime payment_date { get; set; }
		public required Decimal amount_per_share { get; set; }
		public required Decimal quantity { get; set; }
	}// DividendPayment;


	public class DividendPayoutItem {
		public required Guid? ticker_id { get; set;} = null;
		public required String company { get; set; }
		public required String ticker { get; set; }
		public required Decimal amount { get; set; }
	}// DividendPayoutItem;


	public class DividendPayout {
		public required DividendPayoutList payouts { get; set; }
		public required Decimal total { get; set; }
	}// DividendPayout;


}// Stockboy.Models;