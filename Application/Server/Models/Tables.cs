using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stockboy.Models {


	public interface IDataTableModel: IDataModel {
		public string name { get; set; }
	}// ITableModel;


	public class DataTableModel: DataModel, IDataModel, IDataTableModel {
		public string name { get; set; } = String.Empty;
	}// DataTableModel;


	public class BrokersTable: DataTableModel {}


	public class TickersTable: DataTableModel {
		public String symbol { get; set; } = String.Empty;
		public Decimal? price { get; set; } = null;
		public int? volume { get; set; } = null;
		public DateTime? last_payment_date { get; set; } = null;
		public DateTime? next_payment_date { get; set; } = null;
		public DateTime? last_updated { get; set; } = null;
	}// TickersTable;


	public class TransactionsTable: StockDataModel {
		public decimal price { get; set; }
		public decimal quantity { get; set; }
		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public Guid transaction_type_id { get; set; }
	}// TransactionsTable;


	public class TransactionTypesTable: BaseModel {
		public string name { get; set; } = String.Empty;
		public int sort_order { get; set; }
	}// TransactionTypesTable;


	public class SplitsTable: StockDataModel {
		public decimal previous { get; set; }
		public decimal current { get; set; }
		public DateTime split_date { get; set; }
	}// SplitsTable;


	public class DividendsTable: StockDataModel {
		public DateTime issue_date { get; set; }
		public decimal amount_per_share { get; set; }
		public decimal share_quantity { get; set; }
	}// DividendsTable;

}// Stockboy.Models;