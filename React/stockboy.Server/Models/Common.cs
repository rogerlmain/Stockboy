using System.ComponentModel.DataAnnotations;


namespace Stockboy.Server.Models {

	public interface IBaseModel {
		[Key]
		public Guid? id { get; set; }
	}// IBaseModel;


	public interface IDataModel: IBaseModel {
		public Boolean deleted { get; set; }
	}// IDataModel;


	public class BaseModel: IBaseModel {
		[Key]
		public Guid? id { get; set; } = null;
	}// BaseModel;


	public class DataModel: BaseModel, IDataModel {
		public Boolean deleted { get; set; } = false;
	}// DataModel;


	public class StockModel: BaseModel {
        public Guid broker_id { get; set; } = Guid.Empty;
        public Guid ticker_id { get; set; } = Guid.Empty;
	}// StockModel;


}// Stockboy.Server.Models;
