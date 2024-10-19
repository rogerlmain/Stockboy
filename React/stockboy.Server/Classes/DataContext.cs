using Microsoft.EntityFrameworkCore;
using Stockboy.Server.Models;


namespace Stockboy.Server.Classes {

	public class DataContext: DbContext {

		public DbSet<DataTableModel> brokers { get; set; }
		public DbSet<TickerModel> tickers { get; set; }
		public DbSet<TransactionTypeModel> transaction_types { get; set; }
		public DbSet<TransactionDataModel> transactions { get; set; }
		public DbSet<SplitDataModel> splits { get; set; }
		public DbSet<DividendDataModel> dividends { get; set; }

		public DbSet<ActivityView> activity_view { get; set; }


		public DataContext (DbContextOptions<DataContext> context) : base (context) {}

		protected override void OnConfiguring (DbContextOptionsBuilder builder) => builder.LogTo (Console.WriteLine);


	}// DataContext;

}// Stockboy.Server.Classes;