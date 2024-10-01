namespace Stockboy.Server.Models {


	public class LookupModel: BaseModel {
		public string name { get; set; } = String.Empty;
	}// LookupModel;


	public class BrokerModel: LookupModel {}


	public class TransactionTypeModel: LookupModel {
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