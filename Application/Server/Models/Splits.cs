﻿namespace Stockboy.Models {

	public class SplitListModel: StockDataModel {
		public string broker { get; set; } = String.Empty;
        public string company { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public decimal previous { get; set; }
		public decimal current { get; set; }
		public DateTime split_date { get; set; }
	}// SplitListModel;

}// Stockboy.Models;