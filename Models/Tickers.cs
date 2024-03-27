namespace Stockboy.Models {

	public class Ticker : BaseModel, IBaseModel {
		public string ticker { get; set; }
		public string name { get; set; }
	}

}
