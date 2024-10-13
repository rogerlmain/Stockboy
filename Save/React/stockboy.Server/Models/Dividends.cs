namespace Stockboy.Server.Models {

	public class DividendDataModel: BaseModel {
		public Guid broker_id { get; set; }
		public Guid ticker_id { get; set; }
		public DateTime issue_date { get; set; }
		public decimal amount_per_share { get; set; }
		public decimal share_quantity { get; set; }
	}// Dividends;

	public class DividendListModel: BaseModel {
        public string broker { get; set; }
        public string ticker { get; set; }
        public Guid broker_id { get; set; }
        public Guid ticker_id { get; set; }
        public DateTime issue_date { get; set; }
        public decimal amount_per_share { get; set; }
        public decimal share_quantity { get; set; }
        public decimal payout { get; set; }
	}// Dividends;

}// Stockboy.Server.Models;