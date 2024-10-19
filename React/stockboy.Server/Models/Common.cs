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


}// Stockboy.Server.Models;
