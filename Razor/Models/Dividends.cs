using Microsoft.EntityFrameworkCore;

namespace Stockboy.Models {

	public class DividendsTable : BaseModel {
		public Guid broker_id { get; set; }
		public Guid ticker_id { get; set; }
		public DateOnly issue_date { get; set; }
		public decimal amount_per_share { get; set; }
	}


	[Keyless]
	public class DividendsView {
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public DateOnly issue_date { get; set; }
		public decimal amount_per_share { get; set; }
		public decimal number_of_shares { get; set; }
	}


	public class DividendsModel : DividendsView {
		public decimal total_amount { get; set; }
		public decimal stock_price { get; set; }
		public DateOnly ex_dividend_date { get; set; }
		public decimal percentage_yield { get; set; }
		public int frequency { get; set; } // in days
	}


	public class DividendFormModel {
		public DividendsTable? dividend { get; set; }
		public List<BrokersTable>? brokers { get; set; }
		public List<TickersTable>? tickers { get; set; }
	}

}
