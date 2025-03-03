﻿using Stockboy.Models;

namespace Stockboy.Classes.Queries {

	public static class ActivityQueries {

		private static IQueryable<ActivityModel> transaction_query (DataContext context) => (from trn in context.transactions
			join brk in context.brokers on trn.broker_id equals brk.id 
			join tck in context.tickers on trn.ticker_id equals tck.id
			join ttp in context.transaction_types on trn.transaction_type_id equals ttp.id
			select new ActivityModel () {
				id = trn.id,
				date = trn.transaction_date,
				transaction_type = ttp.name,
				broker_id = brk.id,
				ticker_id = tck.id,
				broker = brk.name ?? String.Empty,
				company = tck.name ?? String.Empty,
				ticker = tck.symbol,
				quantity = trn.quantity,
				price = trn.price
			}
		);


		private static IQueryable<ActivityModel> dividend_query (DataContext context) => (from dvd in context.dividends
			join brk in context.brokers on dvd.broker_id equals brk.id 
			join tck in context.tickers on dvd.ticker_id equals tck.id
			select new ActivityModel () {
				id = dvd.id,
				date = dvd.issue_date,
				transaction_type = "Dividend",
				broker_id = brk.id,
				ticker_id = tck.id,
				broker = brk.name ?? String.Empty,
				company = tck.name ?? String.Empty,
				ticker = tck.symbol,
				quantity = dvd.share_quantity,
				price = tck.dividend_payout
			}
		);


		private static IQueryable<ActivityModel> splits_query (DataContext context) => (from spl in context.splits
			join brk in context.brokers on spl.broker_id equals brk.id
			join tck in context.tickers on spl.ticker_id equals tck.id
			select new ActivityModel () {
				id = spl.id,
				date = spl.split_date,
				transaction_type = "Split",
				broker_id = brk.id,
				ticker_id = tck.id,
				broker = brk.name ?? String.Empty,
				company = tck.name ?? String.Empty,
				ticker = tck.symbol,
				quantity = spl.current / spl.previous,
				price = null
			}
		);


		public static IEnumerable<ActivityModel> get_activity (DataContext context, Guid? broker_id, Guid? ticker_id) {

			IEnumerable<ActivityModel> result = transaction_query (context).
				Union (dividend_query (context)).
				Union (splits_query (context)).
				Where (item => ((item.broker_id == broker_id) || is_null (broker_id)) && ((item.ticker_id == ticker_id) || is_null (ticker_id))).
				OrderBy (item => item.date).ThenBy (item => item.transaction_type);

			return result;

		}// get_activity;

	}// ActivityQuery;

}// Stockboy.Classes.Queries