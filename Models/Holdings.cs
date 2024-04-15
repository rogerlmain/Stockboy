using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Stockboy.Models {

	[Keyless]
	public class HoldingsView  {
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string asset { get; set; } = String.Empty;
		public decimal quantity { get; set; }
		public decimal cost { get; set; }
	}


	public class HoldingsModel: HoldingsView  {
		public decimal? price { get; set; }
		public decimal? value { get; set; }
		public decimal? profit { get; set; }

		public static HoldingsModel? import (HoldingsView model) => JsonConvert.DeserializeObject<HoldingsModel> (JsonConvert.SerializeObject (model));
	}


	public class PurchasesTable : BaseModel {
		public Guid ticker_id { get; set; }
		public Guid broker_id { get; set; }
		public decimal purchase_price { get; set; }
		public DateTime purchase_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public Guid purchase_type_id { get; set; }
	}


	public class PurchasesView {
		[Key]
		public Guid purchase_id { get; set; }
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string asset { get; set; } = String.Empty;
		public decimal purchase_price { get; set; }
		public DateTime purchase_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public string? purchase_type { get; set; }
	}


	public class PurchaseFormModel {
		public PurchasesTable? purchase { get; set; }
		public List<BrokersTable>? brokers { get; set; }
		public List<TickersTable>? tickers { get; set; }
		public List<OptionsData>? purchase_types { get; set; }
	}


	public class PurchasePageModel {
		public TableModel? table_data { get; set; }
		public List<TickersTable>? tickers { get; set; }
	}


}
