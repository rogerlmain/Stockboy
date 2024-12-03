using System.ComponentModel.DataAnnotations;


namespace Stockboy.Models {

	public interface IBaseModel {
		[Key]
		public Guid? id { get; set; }
	}// IBaseModel;


	public interface IDataModel: IBaseModel {
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


	public class DataModel: BaseModel, IDataModel {
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
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
	}// StockModel;


	public class TextModel {
		public String text { get; set; } = String.Empty;
	}// TextModel;

}// Stockboy.Models;
