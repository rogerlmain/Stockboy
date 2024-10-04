namespace Stockboy.Server.Models {

	public class SplitsModel {
		public Guid broker_id { get; set; }
		public Guid ticker_id { get; set; }
		public string broker { get; set; } = String.Empty;
        public string ticker { get; set; } = String.Empty;
        public string company { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public decimal previous { get; set; }
		public decimal current { get; set; }
		public DateTime split_date { get; set; }
	}// Splits;

}// Stockboy.Server.Models;