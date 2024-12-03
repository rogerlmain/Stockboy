using Microsoft.EntityFrameworkCore;
using Stockboy.Models;

namespace Stockboy.Models {

	[Keyless]
	public class ActivityView: BaseModel, IStockModel {
		public Guid? user_id { get; set; } = null;
        public Guid? broker_id { get; set; } = null;
        public Guid? ticker_id { get; set; } = null;
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public decimal cost_price { get; set; } = Decimal.Zero;
		public decimal? current_price { get; set; } = null;
		public decimal quantity { get; set; } = Decimal.Zero;
		public string transaction_type { get; set; } = String.Empty;
		public DateTime transaction_date { get; set; } = DateTime.Now;
	}// ActivityView;

}// Stockboy.Models;
