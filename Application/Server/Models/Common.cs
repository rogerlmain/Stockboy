using System.ComponentModel.DataAnnotations;


namespace Stockboy.Models {

	public interface IBaseModel {
		[Key]
		public Guid? id { get; set; }
	}// IBaseModel;


	public interface IDataModel {

		[Key]
		public Guid? id { get; set; }

		public Boolean deleted { get; set; }

	}// IDataModel;


	public interface IStockModel: IBaseModel {
        public Guid? broker_id { get; set; }
        public Guid? ticker_id { get; set; }
	}// StockModel;


	public class BaseModel: IBaseModel {
		[Key]
		public Guid? id { get; set; } = new Guid? ();
	}// BaseModel;


	public class DataModel: IDataModel {
		[Key]
		public Guid? id { get; set; }
		public Boolean deleted { get; set; } = false;
	}// DataModel;


	public class ValueModel: BaseModel {
		public String value { get; set; } = String.Empty;
	}// ValueModel;


	public class StockModel {
		public Guid? user_id { get; set; } = null;
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
	}// StockDataModel;


	public class StockDataModel: DataModel {
		public required Guid user_id { get; set; }
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
	}// StockModel;


	public class TextModel {
		public String text { get; set; } = String.Empty;
	}// TextModel;

}// Stockboy.Models;
