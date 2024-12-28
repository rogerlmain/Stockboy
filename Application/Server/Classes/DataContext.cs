using Microsoft.EntityFrameworkCore;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class DataContext (DbContextOptions<DataContext> context): DbContext (context) {

		protected override void OnConfiguring (DbContextOptionsBuilder builder) => builder.LogTo (Console.WriteLine);


		/********/


		public required DbSet<BrokerTableRecord> brokers { get; set; }
		public required DbSet<DividendsTableRecord> dividends { get; set; }
		public required DbSet<HoldingsTableRecord> holdings { get; set; }
		public required DbSet<SettingsTableRecord> settings { get; set; }
		public required DbSet<SplitsTableRecord> splits { get; set; }
		public required DbSet<TickerTableRecord> tickers { get; set; }
		public required DbSet<TransactionsTableRecord> transactions { get; set; }
		public required DbSet<TransactionTypesTableRecord> transaction_types { get; set; }
		public required DbSet<UsersTableRecord> users { get; set; }
		public required DbSet<UserBrokerTableRecord> user_brokers { get; set; }
		public required DbSet<UserTickerTableRecord> user_tickers { get; set; }
		public required DbSet<UserStocksTableRecord> user_stocks { get; set; }


		public required DbSet<ActivityView> activity_view { get; set; }

	}// DataContext;

}// Stockboy.Classes;