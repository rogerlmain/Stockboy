global using HoldingsModelList = System.Collections.Generic.List<Stockboy.Models.HoldingsModel>;
global using HoldingsStatusList = System.Collections.Generic.List<Stockboy.Models.HoldingsStatusModel>;
global using StockDateModelList = System.Collections.Generic.List<Stockboy.Models.StockDateModel>;
global using StockValueList = System.Collections.Generic.List<Stockboy.Models.StockValue>;


using Microsoft.EntityFrameworkCore;


namespace Stockboy.Models {

	public struct HoldingStatus {
		public const string live = "Live";
		public const string dead = "Dead";
		public const string defunct = "Defunct";
	}// HoldingStatus;


	public class ActivityModel: BaseModel {
		public DateTime date { get; set; }
		public string transaction_type { get; set; } = String.Empty;
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
		public string broker { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public string? ticker { get; set; } = null;
		public Decimal? quantity { get; set; } = Decimal.Zero;
		public Decimal? price { get; set; } = Decimal.Zero;
		public Decimal? cost { get; set; } = Decimal.Zero;
		public Decimal? total_quantity { get; set; } = Decimal.Zero;
		public Decimal? total_cost { get; set; } = Decimal.Zero;
	}// ActivityModel;


	[Keyless]
	public class HoldingsModel: BaseStockModel {
		public string broker { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string status { get; set; } = HoldingStatus.live;
		public decimal quantity { get; set; } = Decimal.Zero;
		public decimal? current_price { get; set; } = null;
		public decimal? current_purchase_cost { get; set; } = Decimal.Zero;
		public decimal? profit { get; set; }
		public decimal? value { get; set; } = null;
	}// HoldingsModel;


	public class HoldingsStatusModel {
		public required Guid ticker_id { get; set; }
		public required String status { get; set; }
	}// HoldingsStatusModel;


	public class StockDateModel {
		public Guid? ticker_id { get; set; } = null;
		public DateTime date { get; set; } = DateTime.MinValue;
	}// StockDateModel;


	public class StockDetailsModel{
		public String company { get; set; } = String.Empty;
		public StringList? brokers { get; set; } = null;
		public String ticker { get; set; } = String.Empty;
		public DateTime first_purchased { get; set; } = DateTime.MinValue;
		public DateTime last_purchased { get; set; } = DateTime.MinValue;
		public DateTime first_dividend_date { get; set; } = DateTime.MinValue;
		public DateTime last_dividend_date { get; set; } = DateTime.MinValue;
		public DateTime? next_dividend_date { get; set; } = DateTime.MinValue;
	}// StockDetailsModel;


	public class StockTotal: BaseStockModel {
		public required String company { get; set; }
		public required String broker { get; set; }
		public decimal amount { get; set; }
	}// StockTotal;


	public class StockValue: BaseStockModel {
		public decimal cost { get; set; }
		public decimal quantity { get; set; }
	}// StockValue;


	public class HomeModel {
		public DividendPaymentList? payments_list { get; set; } = null;
		public HoldingsModelList? holdings_list { get; set; } = null;
//		public required DividendPayout monthly_payout { get; set; }
	}// HomeModel;

}// Stockboy.Models;