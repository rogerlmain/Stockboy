namespace Stockboy.Server.Models {

	public class TransactionsModel: BaseModel {
        public string company { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
		public string broker { get; set; } = String.Empty;

		[Currency]
		public decimal price { get; set; }

		public decimal quantity { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public string transaction_type { get; set; } = String.Empty;
	}// TransactionsModel;

}// Stockboy.Server.Models;