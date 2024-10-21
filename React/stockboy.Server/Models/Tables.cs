using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stockboy.Server.Models {


	public interface IDataTableModel: IDataModel {
		public string name { get; set; }
	}// ITableModel;


	public class DataTableModel: DataModel, IDataModel, IDataTableModel {
		public string name { get; set; } = String.Empty;
	}// DataTableModel;


	public class TransactionTypeModel: BaseModel {
		public string name { get; set; } = String.Empty;
		public int sort_order { get; set; }
	}// TransactionTypeModel;


	public class BrokerModel: DataTableModel {}


	public class TickerModel: DataTableModel {
		public String? symbol { get; set; }
		public Decimal? price { get; set; }
		public int? volume { get; set; }
		public DateTime? last_payment_date { get; set; }
		public DateTime? next_payment_date { get; set; }
		public DateTime? last_updated { get; set; }
	}// TickerModel;


}// Stockboy.Server.Models;