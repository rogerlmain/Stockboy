using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Stockboy.Models {

	[Keyless]
	public class HoldingsModel {
		[Display (Order = 0)]
		public string broker { get; set; } = String.Empty;
		public string ticker { get; set; } = String.Empty;
		public string name { get; set; } = String.Empty;
		public decimal amount { get; set; }
		public decimal cost { get; set; }
	}

	public class HoldingsData : HoldingsModel {
		[Display (Order = 5)]
		public decimal? price { get; set; }
		public decimal? value { get; set; }
		public decimal? profit { get; set; }

		public static HoldingsData import (HoldingsModel model) => JsonConvert.DeserializeObject<HoldingsData> (JsonConvert.SerializeObject (model));
	}

	public class PurchaseFormModel {
		public List<Broker> brokers { get; set; }
		public List<Ticker> tickers { get; set; }
		public List<OptionsModel> purchase_types { get; set; }
	}

	public class PurchaseModel : BaseModel, IBaseModel {
		public Guid ticker_id { get; set; }
		public Guid broker_id { get; set; }
		public decimal purchase_price { get; set; }
		public DateTime purchase_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public Guid purchase_type_id { get; set; }
	}


	public class PurchaseData {
		[Key]
		public Guid purchase_id { get; set; }
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string asset { get; set; } = String.Empty;
		public decimal purchase_price { get; set; }
		public DateTime purchase_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public string purchase_type { get; set; }
	}

}
