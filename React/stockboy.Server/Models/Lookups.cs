namespace Stockboy.Server.Models {


	public class LookupModel: BaseModel {
		public string? name { get; set; }
	}// LookupModel;


	public class Brokers : LookupModel {}
	public class TransactionTypes: LookupModel {}


}// Stockboy.Server.Models;