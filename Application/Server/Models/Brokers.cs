namespace Stockboy.Models {

	public class BrokerTableRecord: DataTableModel {
		public Boolean approved { get; set; } = false;
	}// BrokersTableRecord;


	public class UserBrokerRecord: BaseModel {
		public String broker { get; set; } = String.Empty;
		public Guid? user_id { get; set; } = null;
	}// UserBrokerRecord;

}// Stockboy.Models;
