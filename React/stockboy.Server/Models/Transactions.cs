namespace Stockboy.Server.Models {

	public class TransactionModel: BaseModel {
		public string broker { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
        public string company { get; set; } = String.Empty;

		[Currency]
		public decimal price { get; set; }

		public decimal quantity { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public string transaction_type { get; set; } = String.Empty;
	}// TransactionModel;


	public class TransactionDataModel {
		public Guid? transaction_id { get; set; }

		public Guid broker_id { get; set; }
        public Guid ticker_id { get; set; }

		[Currency]
		public decimal price { get; set; }

		public decimal quantity { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public Guid transaction_type_id { get; set; }
	}// TransactionDataModel;

}// Stockboy.Server.Models;