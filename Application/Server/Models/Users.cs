namespace Stockboy.Models {

	public class Credentials {
		public String email_address { get; set; } = String.Empty;
		public String password { get; set; } = String.Empty;
	}// Credentials;


	public class UserRecord {
		public Guid? user_id { get; set; } = null;
		public String? first_name { get; set; } = null;
		public String? last_name { get; set; } = null;
		public required String email_address { get; set; }
		public required Boolean administrator { get; set; }
	}// UserRecord;


	public class UsersTableRecord: Credentials {
		public Guid? id { get; set; } = null;
		public String? first_name { get; set; } = null;
		public String? last_name { get; set; } = null;
		public Boolean administrator { get; set; } = false;
	}// UsersTableRecord;


	public class UserStocksTableRecord {
		public Guid? id { get; set; } = null;
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
		public Boolean deleted { get; set; } = false;
	}// UserStocksTableRecord;


}// Stockboy.Models;
