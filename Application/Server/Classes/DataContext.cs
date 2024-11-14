using Microsoft.EntityFrameworkCore;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class DataContext: DbContext {

		protected override void OnConfiguring (DbContextOptionsBuilder builder) => builder.LogTo (Console.WriteLine);


		/********/


		public DbSet<BrokersTableRecord> brokers { get; set; }
		public DbSet<TickersTableRecord> tickers { get; set; }
		public DbSet<TransactionTypesTableRecord> transaction_types { get; set; }
		public DbSet<TransactionsTableRecord> transactions { get; set; }
		public DbSet<SplitsTableRecord> splits { get; set; }
		public DbSet<DividendsTableRecord> dividends { get; set; }


		public DbSet<ActivityView> activity_view { get; set; }


		public DataContext (DbContextOptions<DataContext> context) : base (context) {}


	}// DataContext;

}// Stockboy.Classes;