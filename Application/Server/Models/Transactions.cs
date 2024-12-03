namespace Stockboy.Models {

	public class TransactionModel: StockDataModel {
		public string broker { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
        public string company { get; set; } = String.Empty;
		public decimal price { get; set; }
		public decimal quantity { get; set; }
		public decimal cost { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public string transaction_type { get; set; } = String.Empty;
		public Guid? transaction_type_id { get; set; }
	}// TransactionModel;


	public class UpdateTransactionModel: BaseModel {
		public string type { get; set; } = String.Empty;
	}// UpdateTransactionModel;


}// Stockboy.Models;