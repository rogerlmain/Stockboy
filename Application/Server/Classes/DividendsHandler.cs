using Stockboy.Models;


namespace Stockboy.Classes {

	public class DividendsHandler (DataContext context, StockAPIClient client) {

		public async Task<DividendPaymentList?> GetPendingPayments () {

			StockDateModelList exdiv_dates = (from tck in context.tickers 
				where tck.ex_dividend_date != null
				select new StockDateModel () {
					ticker_id = tck.id,
					date = tck.ex_dividend_date ?? DateTime.Now
				}
			).ToList ();

			return (from hld in (await HoldingsData.Create (context, client)).HoldingsPriceList (exdiv_dates)
				join tck in context.tickers on hld.ticker_id equals tck.id
				where hld.quantity > 0 
				group hld by new {
					hld.ticker_id,
					company = tck.name,
					tck.next_payment_date,
					amount_per_share = tck.dividend_payout
				} into hdg
				select new DividendPayment () {
					ticker_id = hdg.Key.ticker_id ?? Guid.Empty,
					company = hdg.Key.company ?? String.Empty,
					payment_date = hdg.Key.next_payment_date ?? DateTime.Now,
					amount_per_share = hdg.Key.amount_per_share ?? 0,
					quantity = hdg.Sum (holding => holding.quantity)
				}
			).OrderByDescending (payout => payout.payment_date).ToList ();

		}// GetPendingPayments;


		public DividendPayout GetMonthlyPayout (HoldingsModelList holdings) {

			DividendPayoutList payouts = (from hld in holdings
				join tck in context.tickers on hld.ticker_id equals tck.id
				where (hld.quantity > 0) && (tck.price != -1)
				select new DividendPayoutItem () {
					ticker_id = tck.id,
					company = tck.name,
					ticker = tck.symbol,
					amount = (hld.quantity * tck.dividend_payout / tck.frequency) ?? 0
				}// DividendPayout;
			).ToList ();

			return new DividendPayout () {
				payouts = payouts,
				total = payouts.Sum (item => item.amount)
			};

		}// GetMonthlyPayout;

	}// DividendsHandler;

}// Stockboy.Classes;