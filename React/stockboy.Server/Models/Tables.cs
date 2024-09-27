namespace Stockboy.Server.Models {


	public class LookupModel: BaseModel {
		public string name { get; set; } = String.Empty;
	}// LookupModel;


	public class BrokersTable: LookupModel {}


	public class TransactionTypesTable: LookupModel {
		public int sort_order { get; set; }
	}// TransactionTypesTable;


	public class TickersTable: BaseModel {
		public string symbol { get; set; } = String.Empty;
		public string name { get; set; } = String.Empty;
	}// TickersTable;


}// Stockboy.Server.Models;