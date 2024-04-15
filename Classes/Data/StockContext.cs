using Microsoft.EntityFrameworkCore;
using Stockboy.Models;

namespace Stockboy.Classes.Data {


	public class StockContext : DbContext {

		public DbSet<BrokersTable> brokers { get; set; }
		public DbSet<DividendsTable> dividends { get; set; }
		public DbSet<OptionsData> purchase_types { get; set; }
		public DbSet<PurchasesTable> purchases { get; set; }
		//public DbSet<SalesTable> sales_table { get; set; }
		public DbSet<TickersTable> tickers { get; set; }

		public DbSet<DividendsView> dividends_view { get; set; }
		public DbSet<HoldingsView> holdings_view { get; set; }
		public DbSet<PurchasesView> purchases_view { get; set; }
		public DbSet<TickersView> tickers_view { get; set; }

		public StockContext (DbContextOptions<StockContext> context) : base (context) {}

		protected override void OnModelCreating (ModelBuilder modelBuilder) {
			base.OnModelCreating (modelBuilder);

			modelBuilder.Entity<PurchasesTable> ().Property (item => item.quantity).HasPrecision (14, 6);
			modelBuilder.Entity<HoldingsView> ().Property (item => item.quantity).HasPrecision (14, 6);
		}

	}

}
