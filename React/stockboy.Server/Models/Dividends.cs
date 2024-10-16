namespace Stockboy.Server.Models {

	public class DividendDataModel: BaseModel {
		public Guid broker_id { get; set; }
		public Guid ticker_id { get; set; }
		public DateTime issue_date { get; set; }
		public decimal amount_per_share { get; set; }
		public decimal share_quantity { get; set; }
	}// DividendsDataModel;

	public class DividendRequestModel: DividendDataModel {
		public Boolean reinvested { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public decimal price { get; set; }
	}// DividendRequestModel;

	public class DividendListModel: BaseModel {
        public Guid broker_id { get; set; }
        public Guid ticker_id { get; set; }
        public string broker { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
        public DateTime issue_date { get; set; }
        public decimal amount_per_share { get; set; }
        public decimal share_quantity { get; set; }
        public decimal payout { get; set; }
	}// Dividends;

}// Stockboy.Server.Models;