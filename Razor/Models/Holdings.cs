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

		[Currency]
		public decimal cost { get; set; }
	}


	public class HoldingsModel: HoldingsView  {
		public decimal? value { get; set; }

		[Currency]
		public decimal? price { get; set; }

		[Currency]
		public decimal? profit { get; set; }

		public static HoldingsModel? import (HoldingsView model) => JsonConvert.DeserializeObject<HoldingsModel> (JsonConvert.SerializeObject (model));
	}


	public class TransactionsTable : BaseModel {
		public Guid ticker_id { get; set; }
		public Guid broker_id { get; set; }

		[Currency]
		public decimal purchase_price { get; set; }

		public DateTime purchase_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public Guid transaction_type_id { get; set; }
	}


	public class TransactionsView {
		[Key]
		public Guid purchase_id { get; set; }
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string asset { get; set; } = String.Empty;

		[Currency]
		public decimal purchase_price { get; set; }
		public DateTime purchase_date { get; set; }
		public DateTime settlement_date { get; set; }
		public decimal quantity { get; set; }
		public string? transaction_type_id { get; set; }
	}


	public class TransactionFormModel {
		public TransactionsTable? purchase { get; set; }
		public List<BrokersTable>? brokers { get; set; }
		public List<TickersTable>? tickers { get; set; }
		public List<OptionsData>? transaction_types { get; set; }
		public String transaction_type { get; set; }
	}


	public class PurchasePageModel {
		public TableModel? table_data { get; set; }
		public List<TickersTable>? tickers { get; set; }
	}


}
