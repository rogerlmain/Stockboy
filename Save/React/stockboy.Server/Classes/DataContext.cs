using Microsoft.EntityFrameworkCore;
using Stockboy.Server.Models;


namespace Stockboy.Server.Classes {

	public class DataContext : DbContext {

		public DbSet<BrokerModel> brokers { get; set; }
		public DbSet<TickerModel> tickers { get; set; }
		public DbSet<TransactionTypeModel> transaction_types { get; set; }
		public DbSet<HoldingsView> holdings_view { get; set; }
		public DbSet<TransactionDataModel> transactions { get; set; }

		public DataContext (DbContextOptions<DataContext> context) : base (context) {}

	}// DataContext;

}// Stockboy.Server.Classes;