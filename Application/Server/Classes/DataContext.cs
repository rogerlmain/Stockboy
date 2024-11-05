using Microsoft.EntityFrameworkCore;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class DataContext: DbContext {

		protected override void OnConfiguring (DbContextOptionsBuilder builder) => builder.LogTo (Console.WriteLine);


		/********/


		public DbSet<BrokersTable> brokers { get; set; }
		public DbSet<TickersTable> tickers { get; set; }
		public DbSet<TransactionTypesTable> transaction_types { get; set; }
		public DbSet<TransactionsTable> transactions { get; set; }
		public DbSet<SplitsTable> splits { get; set; }
		public DbSet<DividendsTable> dividends { get; set; }


		public DbSet<ActivityView> activity_view { get; set; }


		public DataContext (DbContextOptions<DataContext> context) : base (context) {}


	}// DataContext;

}// Stockboy.Classes;