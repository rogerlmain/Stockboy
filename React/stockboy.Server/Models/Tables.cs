using System.ComponentModel.DataAnnotations;

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


	public class TickerModel: BaseModel {
		public String? symbol { get; set; }
		public String? name { get; set; }
		public Decimal? price { get; set; }
		public int? volume { get; set; }
		public DateTime? dividend_date { get; set; }
		public int? dividend_frequency { get; set; }
		public DateTime? last_updated { get; set; }
	}// TickerModel;


}// Stockboy.Server.Models;