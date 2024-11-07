using Microsoft.EntityFrameworkCore;


namespace Stockboy.Models {


	struct HoldingStatus {
		public const string live = "Live";
		public const string dead = "Dead";
		public const string defunct = "Defunct";
	}// HoldingStatus;


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


}// Stockboy.Models;