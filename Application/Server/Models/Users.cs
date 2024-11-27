namespace Stockboy.Models {

	public class Credentials {
		public String email_address { get; set; } = String.Empty;
		public String password { get; set; } = String.Empty;
	}// Credentials;


	public class UserCredentialsRecord {
		public Guid user_id { get; set; } = Guid.Empty;
	}// UserCredentialsRecord;


	public class UsersTableRecord: Credentials {
		public Guid? id { get; set; } = null;
	}// UsersTableRecord;


	public class UserStocksTableRecord: UserCredentialsRecord {
		public Guid id { get; set; } = Guid.Empty;
		public Guid broker_id { get; set; } = Guid.Empty;
		public Guid ticker_id { get; set; } = Guid.Empty;
		public Boolean deleted { get; set; } = false;
	}// UserStocksTableRecord;


}// Stockboy.Models;
