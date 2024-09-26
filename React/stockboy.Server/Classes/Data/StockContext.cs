using Microsoft.EntityFrameworkCore;
using Stockboy.Server.Models;

namespace Stockboy.Server.Classes.Data {


	public class StockContext : DbContext {

		public DbSet<BrokersTable> brokers { get; set; }
		public DbSet<DividendsTable> dividends { get; set; }
		public DbSet<OptionsData> transaction_types { get; set; }
		public DbSet<TransactionsTable> purchases { get; set; }
		public DbSet<TickersTable> tickers { get; set; }
		public DbSet<DividendsView> dividends_view { get; set; }
		public DbSet<HoldingsView> holdings_view { get; set; }
		public DbSet<TransactionsView> transactions_view { get; set; }
		public DbSet<TickersView> tickers_view { get; set; }

		public StockContext (DbContextOptions<StockContext> context) : base (context) {}

		protected override void OnModelCreating (ModelBuilder modelBuilder) {
			base.OnModelCreating (modelBuilder);

			modelBuilder.Entity<TransactionsTable> ().Property (item => item.quantity).HasPrecision (14, 6);
			modelBuilder.Entity<HoldingsView> ().Property (item => item.quantity).HasPrecision (14, 6);
		}

	}

}
