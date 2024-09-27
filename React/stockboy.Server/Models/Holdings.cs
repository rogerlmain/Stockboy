using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace Stockboy.Server.Models {

	[Keyless]
	public class HoldingsView  {

		public Guid ticker_id { get; set; }
		public Guid broker_id { get; set; }
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string asset { get; set; } = String.Empty;
		public decimal quantity { get; set; }

		[Currency]
		public decimal cost { get; set; }
	}// HoldingsView;


	public class HoldingsModel: HoldingsView  {

		public decimal? value { get; set; }

		[Currency]
		public decimal? price { get; set; }

		[Currency]
		public decimal? profit { get; set; }

		public static HoldingsModel? import (HoldingsView model) => JsonConvert.DeserializeObject<HoldingsModel> (JsonConvert.SerializeObject (model));
	}// HoldingsModel;

}// Stockboy.Server.Models;