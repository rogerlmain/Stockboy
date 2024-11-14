using Microsoft.EntityFrameworkCore;


namespace Stockboy.Models {

	struct HoldingStatus {
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
		public Decimal? total_quantity { get; set; } = Decimal.Zero;
	}// ActivityModel;


	[Keyless]
	public class HoldingsModel: StockDataModel {
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public decimal cost_price { get; set; } = Decimal.Zero;
		public decimal? current_price { get; set; } = null;
		public decimal quantity { get; set; } = Decimal.Zero;
		public decimal current_purchase_cost { get; set; } = Decimal.Zero;
		public decimal total_purchase_cost { get; set; } = Decimal.Zero;
		public decimal total_sales_amount { get; set; } = Decimal.Zero;
		public decimal? value { get; set; } = null;
		public decimal sales_profit { get; set; } = Decimal.Zero;
		public DateTime? last_updated { get; set; } = null;
		public string status { get; set; } = HoldingStatus.live;
	}// HoldingsModel;


	[Keyless]
	public class ProfitLossModel: StockDataModel {
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public Decimal sales_profit { get; set; } = 0;
		public Decimal dividend_payout { get; set; } = 0;
		public Decimal value_profit { get; set; } = 0;
		public Decimal overall_profit { get; set; } = 0;
		public string status { get; set; } = HoldingStatus.live;
	}// ProfitLossModel;


	public class StockDateModel {
		public Guid ticker_id { get; set; } = Guid.Empty;
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


	public class HomeModel {
		public DividendPaymentList? payments_list { get; set; } = null;
		public HoldingsModelList? holdings_list { get; set; } = null;
		public required DividendPayout monthly_payout { get; set; }
	}// HomeModel;

}// Stockboy.Models;