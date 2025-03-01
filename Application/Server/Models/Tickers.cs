namespace Stockboy.Models {

	public class TickerTableModel: DataTableModel {
		public required String symbol { get; set; }
		public Decimal? price { get; set; } = null;
		public int? volume { get; set; } = null;
		public DateTime? last_payment_date { get; set; } = null;
		public DateTime? next_payment_date { get; set; } = null;
		public DateTime? ex_dividend_date { get; set; } = null;
		public Decimal? dividend_payout { get; set; } = null;
		public int? frequency { get; set; } = null;
		public Boolean approved { get; set; } = false;
	}// TickerTableModel;


	public class UserTickerRecord: BaseModel {
		public required String ticker { get; set; }/* = String.Empty;*/
		public String symbol { get; set; } = String.Empty;
		public Guid? user_id { get; set; } = null;
	}// UserTickerRecord;

}// Stockboy.Models;