namespace Stockboy.Server.Models {

	public class SplitDataModel: StockModel {
		public decimal previous { get; set; }
		public decimal current { get; set; }
		public DateTime split_date { get; set; }
	}// SplitDataModel;

	public class SplitListModel: StockModel {
		public string broker { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
        public string company { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public decimal previous { get; set; }
		public decimal current { get; set; }
		public DateTime split_date { get; set; }
	}// SplitListModel;

}// Stockboy.Server.Models;