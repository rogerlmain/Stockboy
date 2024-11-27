namespace Stockboy.Models {

	public class SettingsTableRecord: BaseModel {
		public Guid? user_id { get; set; } = null;
		public String name { get; set; } = String.Empty;
		public String value { get; set; } = String.Empty;
	}// SettingsTableRecord;

}// Stockboy.Models;