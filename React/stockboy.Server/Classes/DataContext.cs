using Microsoft.EntityFrameworkCore;
using Stockboy.Server.Models;


namespace Stockboy.Server.Classes {

	public class DataContext : DbContext {

		public DbSet<Brokers> brokers { get; set; }
		public DbSet<TickersModel> tickers { get; set; }
		public DbSet<HoldingsView> holdings_view { get; set; }
		public DbSet<TransactionTypes> transaction_types { get; set; }

		public DataContext (DbContextOptions<DataContext> context) : base (context) {}

	}// DataContext;

}// Stockboy.Server.Classes;