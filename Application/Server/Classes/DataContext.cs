using Microsoft.EntityFrameworkCore;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class DataContext (DbContextOptions<DataContext> context): DbContext (context) {

		protected override void OnConfiguring (DbContextOptionsBuilder builder) => builder.LogTo (Console.WriteLine);


		/********/


		public required DbSet<BrokersTableRecord> brokers { get; set; }
		public required DbSet<DividendsTableRecord> dividends { get; set; }
		public required DbSet<SplitsTableRecord> splits { get; set; }
		public required DbSet<TickerTableRecord> tickers { get; set; }
		public required DbSet<TransactionsTableRecord> transactions { get; set; }
		public required DbSet<TransactionTypesTableRecord> transaction_types { get; set; }
		public required DbSet<UsersTable> users { get; set; }


		public required DbSet<ActivityView> activity_view { get; set; }

	}// DataContext;

}// Stockboy.Classes;