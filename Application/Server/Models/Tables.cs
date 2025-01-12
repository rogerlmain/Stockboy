using System.ComponentModel.DataAnnotations;

namespace Stockboy.Models {


	public interface IDataTableModel: IDataModel {
		public String? name { get; set; }
	}// ITableModel;


	public class DataTableModel: DataModel, IDataModel, IDataTableModel {
		public String? name { get; set; } = null;
	}// DataTableModel;


	public class HoldingsTableRecord: StockModel {
		[Key]
		public required Guid id { get; set; }
		public required Decimal quantity { get; set; }
		public required Decimal cost { get; set; }
	}// HoldingsTableRecord;


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
		public required DateTime issue_date { get; set; }
		public required decimal amount_per_share { get; set; }
		public required decimal share_quantity { get; set; }
	}// DividendsTableRecord;


	public class UserBrokerTableRecord: DataModel {
		public Guid? user_id { get; set; } = null;
		public Guid? broker_id { get; set; } = null;
	}// UserBrokerTableRecord;


	public class UserTickerTableRecord: BaseModel {
		public Guid? user_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
		public Boolean deleted { get; set; } = false;
	}// UserTickerTableRecord;

}// Stockboy.Models;