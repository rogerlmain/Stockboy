global using ProfitLossModelList = System.Collections.Generic.List<Stockboy.Models.ProfitLossModel>;

using Microsoft.EntityFrameworkCore;


namespace Stockboy.Models {

	[Keyless]
	public class ProfitLossModel {
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public string status { get; set; } = HoldingStatus.live;
		public Decimal? sales_profit { get; set; } = 0;
		public Decimal? dividend_payout { get; set; } = 0;
		public Decimal? value_profit { get; set; } = 0;
		public Decimal? reinvestment_profit { get; set; } = 0;
		public Decimal? overall_profit { get; set; } = 0;
	}// ProfitLossModel;


	public class ProfitLossDetailsModel: StockModel {
		public String broker { get; set; } = String.Empty;
		public String symbol { get; set; } = String.Empty;
		public String company { get; set; } = String.Empty;
		public String status { get; set; } = String.Empty;
		public Decimal sales_profit { get; set; } = 0;
		public Decimal value { get; set; } = 0;
		public Decimal value_profit { get; set; } = 0;
		public Decimal dividend_payout { get; set; } = 0;
	}// ProfitLossDetailsModel;

}// Stockboy.Models;