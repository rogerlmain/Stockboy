using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stockboy.Models {


	public class TickersTable: BaseModel {
		public string? symbol { get; set; }
		public string? name { get; set; }
	}


	public class TickersView: BaseModel {
		public string? symbol { get; set; }
		public string? name { get; set; }
		public Decimal? shares_held { get; set; }
		public Decimal? share_percentage { get; set; }
	}


	public class TickerModel: TickersView {
		public Decimal portfolio_percentage { get; set; }
	}

}
