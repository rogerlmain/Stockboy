using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes.Data;
using Stockboy.Models;

using static Stockboy.Classes.Globals;

namespace Stockboy.Classes {

	public class Stocks {


		//private decimal? get_stock_price (StockDetailsModel? stock_details, string ticker) => stock_details?.get_details (ticker)?.regularMarketPrice;


		public async static Task<List<HoldingsModel>> GetHoldings (StockContext context) {

			List<HoldingsView>? holdings = context.holdings_view.SelectAll ().OrderBy ("name");
			List<HoldingsModel>? holdings_model = null;

			StockDetailsModel? stock_details = await APIs.get_stock_details (String.Join (comma, holdings.Select (holding => holding.symbol).ToArray ()));

			if (holdings is null) return null;

			foreach (HoldingsView holding in holdings) {
				HoldingsModel? data = holding.Export<HoldingsModel> ();
				if (data is null) continue;

				data.cost = Math.Round (data.cost, 2);
				data.price = Math.Round (stock_details?.get_details (data.symbol)?.regularMarketPrice ?? 0, 2);
				data.value = Math.Round (data.quantity * data.price ?? 0, 2);
				data.profit = Math.Round (data.value - data.cost ?? 0, 2);

				holdings_model ??= new ();
				holdings_model.Add (data);
			}

			return holdings_model;

		}// GetHoldings;


		public static List<DividendsView> GetDividendsView (StockContext context) => context.dividends_view.SelectAll ();


		public static List<TransactionsView> GetTransactionsView (StockContext context) => context.transactions_view.SelectAll ();

		// ORDERING TEMPORARY - REPLACE WITH DATA_TABLE TITLE ORDERING
		public static List<TickersView> GetTickersView (StockContext context) => context.tickers_view.SelectAll ().OrderBy ("ticker");


		public static List<TransactionsTable> GetTransactions (StockContext context) => context.purchases.SelectAll ();


	}// Stocks;

}// namespace;


