using Stockboy.Models;


namespace Stockboy.Classes {

	public class DividendsHandler (DataContext context) {

		public DividendPaymentList? GetPendingPayments (Guid? user_id, HoldingsData holdings_data) {

			StockDateModelList exdiv_dates = (from tck in context.tickers 
				where tck.ex_dividend_date != null
				select new StockDateModel () {
					ticker_id = tck.id,
					date = tck.ex_dividend_date ?? DateTime.Now
				}
			).ToList ();

			DividendPaymentList result = (from hld in holdings_data.HoldingsPriceList (user_id, exdiv_dates)
				join tck in context.tickers on hld.ticker_id equals tck.id
				where (hld.quantity > 0) && (tck.price != -1)
				group hld by new {
					company = tck.name,
					ticker = tck.symbol,
					tck.next_payment_date,
					amount_per_share = tck.dividend_payout
				} into hdg
				select new DividendPayment () {
					company = hdg.Key.company ?? String.Empty,
					ticker = hdg.Key.ticker ?? String.Empty,
					payment_date = hdg.Key.next_payment_date ?? DateTime.Now,
					amount_per_share = hdg.Key.amount_per_share ?? 0,
					quantity = hdg.Sum (holding => holding.quantity)
				}
			).OrderBy (payout => payout.payment_date).ToList ();

			return result;

		}// GetPendingPayments;


		public DividendPayout GetMonthlyPayout (Guid? user_id, HoldingsModelList holdings) {

			DividendPayoutList payouts = (from rows in 
				(from hld in holdings
					join tck in context.tickers on hld.ticker_id equals tck.id
					where (hld.quantity > 0) && (tck.price != -1) && (tck.dividend_payout > 0)
					select new {
						tck.id,
						tck.name,
						tck.symbol,
						hld.quantity,
						tck.dividend_payout,
						tck.frequency
					}
				) group rows by new {
					rows.id,
					rows.name,
					rows.symbol
				} into hlg
				select new DividendPayoutItem () {
					ticker_id = hlg.Key.id,
					company = hlg.Key.name,
					ticker = hlg.Key.symbol,
					amount = hlg.Sum (holding => holding.quantity * holding.dividend_payout / holding.frequency) ?? 0
				}// DividendPayout;
			).OrderBy (item => item.company).ToList ();

			return new DividendPayout () {
				payouts = payouts,
				total = payouts.Sum (item => item.amount)
			};

		}// GetMonthlyPayout;

	}// DividendsHandler;

}// Stockboy.Classes;