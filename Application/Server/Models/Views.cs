global using ActivityViewList = System.Collections.Generic.List<Stockboy.Models.ActivityView>;
global using ActivityDataList = System.Collections.Generic.List<Stockboy.Models.ActivityData>;


using Microsoft.EntityFrameworkCore;
using Stockboy.Models;


namespace Stockboy.Models {

	[Keyless]
	public class ActivityView: StockModel {
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public decimal? cost_price { get; set; } = null;
		public decimal current_price { get; set; } = Decimal.Zero;
		public decimal quantity { get; set; } = Decimal.Zero;
		public decimal? payment_amount { get; set; } = null;
		public string transaction_type { get; set; } = String.Empty;
		public DateTime transaction_date { get; set; } = DateTime.Now;
	}// ActivityView;


	public class ActivityData: ActivityView {
		public decimal? cost { get; set; } = null;
		public decimal? total_quantity { get; set; } = null;
		public decimal? total_cost { get; set; } = null;
		public decimal? current_value { get; set; } = null;
		public string? status { get; set; } = null;
	}// ActivityData;

}// Stockboy.Models;
