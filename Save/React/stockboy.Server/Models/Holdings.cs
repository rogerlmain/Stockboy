using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace Stockboy.Server.Models {

	[Keyless]
	public class HoldingsView  {
		public Guid ticker_id { get; set; }
		public Guid broker_id { get; set; }
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public decimal? price { get; set; }
		public decimal quantity { get; set; }
		public decimal cost { get; set; }
		public DateTime? last_updated { get; set; }
	}// HoldingsView;


	public class HoldingsModel: HoldingsView  {
		public decimal? value { get; set; }
		public decimal? profit { get; set; }
		public static HoldingsModel? import (HoldingsView model) => JsonConvert.DeserializeObject<HoldingsModel> (JsonConvert.SerializeObject (model));
	}// HoldingsModel;

}// Stockboy.Server.Models;