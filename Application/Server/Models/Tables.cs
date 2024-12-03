namespace Stockboy.Models {


	public interface IDataTableModel: IDataModel {
		public String? name { get; set; }
	}// ITableModel;


	public class DataTableModel: DataModel, IDataModel, IDataTableModel {
		public String? name { get; set; } = null;
	}// DataTableModel;


	public class BrokerTableRecord: DataTableModel {
		public Boolean approved { get; set; } = false;
	}// BrokersTableRecord;


	public class TickerTableRecord: DataTableModel {
		public required String symbol { get; set; }
		public Decimal? price { get; set; } = null;
		public int? volume { get; set; } = null;
		public DateTime? last_payment_date { get; set; } = null;
		public DateTime? next_payment_date { get; set; } = null;
		public DateTime? ex_dividend_date { get; set; } = null;
		public Decimal? dividend_payout { get; set; } = null;
		public int? frequency { get; set; } = null;
		public Boolean approved { get; set; } = false;
	}// TickerTableRecord;


	public class TransactionsTableRecord: StockDataModel {
		public decimal price { get; set; }
		public decimal quantity { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public Guid? transaction_type_id { get; set; }
	}// TransactionsTableRecord;


	public class TransactionTypesTableRecord: BaseModel {
		public string name { get; set; } = String.Empty;
		public int sort_order { get; set; }
	}// TransactionTypesTableRecord;


	public class SplitsTableRecord: StockDataModel {
		public decimal previous { get; set; }
		public decimal current { get; set; }
		public DateTime split_date { get; set; }
	}// SplitsTableRecord;


	public class DividendsTableRecord: StockDataModel {
		public DateTime issue_date { get; set; }
		public decimal amount_per_share { get; set; }
		public decimal share_quantity { get; set; }
	}// DividendsTableRecord;


	public class UserBrokerTableRecord: BaseModel {
		public Guid? user_id { get; set; } = null;
		public Guid? broker_id { get; set; } = null;
		public Boolean deleted { get; set; } = false;
	}// UserBrokerTableRecord;


	public class UserTickerTableRecord: BaseModel {
		public Guid? user_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
		public Boolean deleted { get; set; } = false;
	}// UserTickerTableRecord;

}// Stockboy.Models;