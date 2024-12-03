namespace Stockboy.Models {

	public class Credentials {
		public String email_address { get; set; } = String.Empty;
		public String password { get; set; } = String.Empty;
	}// Credentials;


	public class UserCredentialsRecord {
		public Guid? user_id { get; set; } = null;
	}// UserCredentialsRecord;


	public class UsersTableRecord: Credentials {
		public Guid? id { get; set; } = null;
		public Boolean administrator { get; set; } = false;
	}// UsersTableRecord;


	public class UserStocksTableRecord: UserCredentialsRecord {
		public Guid? id { get; set; } = null;
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
		public Boolean deleted { get; set; } = false;
	}// UserStocksTableRecord;


	public class UserBrokerRecord: BaseModel {
		public String broker { get; set; } = String.Empty;
		public Guid? user_id { get; set; } = null;
	}// UserBrokerRecord;


	public class UserTickerRecord: BaseModel {
		public String ticker { get; set; } = String.Empty;
		public String symbol { get; set; } = String.Empty;
		public Guid? user_id { get; set; } = null;
	}// UserTickerRecord;


}// Stockboy.Models;
