using System.ComponentModel.DataAnnotations;


namespace Stockboy.Models {

	public class Transaction {

		[Key]
		public Guid id { get; set; }

		public String broker { get; set; }
		public Decimal quantity { get; set; }

		[Currency]
		public Decimal price { get; set; }

		[Currency]
		public Decimal cost { get; set; }

		public DateTime transaction_date { get; set; }
		public DateTime settlement_date { get; set; }
		public String transaction_type { get; set; }
	}// Transaction;

}// Stockboy.Models;
