using Microsoft.EntityFrameworkCore;
using Stockboy.Models;

namespace Stockboy.Classes.Data {


	public static class DataExtensions {
		public static List<Model> SelectAll<Model> (this DbSet<Model> dataset) where Model : class => dataset.Select (item => item).ToList ();
	}


	public class StockContext : DbContext {

		public DbSet<Ticker> tickers { get; set; }
		public DbSet<Broker> brokers { get; set; }
		public DbSet<PurchaseDataModel> purchases { get; set; }
		public DbSet<OptionsModel> purchase_types { get; set; }
		public DbSet<HoldingsModel> holdings { get; set; }

		public StockContext (DbContextOptions<StockContext> options) : base (options) {}

	}

}
