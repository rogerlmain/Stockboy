﻿using Microsoft.EntityFrameworkCore.Query.Internal;
using Stockboy.Models;


namespace Stockboy.Classes.Queries {

	public class TransactionQueries {

		private static IQueryable<TransactionListModel> select_query (DataContext context) {
			IQueryable<TransactionListModel> result = from tra in context.transactions
			join tck in context.tickers on tra.ticker_id equals tck.id
			join brk in context.brokers on tra.broker_id equals brk.id
			join ttp in context.transaction_types on tra.transaction_type_id equals ttp.id
			where !tra.deleted
			select new TransactionListModel () {
				id = tra.id,
				broker_id = brk.id ?? Guid.Empty,
				ticker_id = tck.id ?? Guid.Empty,
				company = tck.name,
				broker = brk.name,
				ticker = tck.symbol ?? String.Empty,
				price = tra.price,
				quantity = tra.quantity,
				cost = tra.price * tra.quantity,
				transaction_date = tra.transaction_date,
				settlement_date = tra.settlement_date,
				transaction_type = ttp.name,
				transaction_type_id = ttp.id ?? Guid.Empty,
			};
			return result;
		}// select_query;


		public static List<TransactionListModel>? get_transactions (DataContext context) => select_query (context).ToList ();


		public static TransactionListModel? get_transaction_by_id (DataContext context, Guid? id) {
			return select_query (context).Where ((TransactionListModel item) => item.id == id).FirstOrDefault ();
		}// get_transaction_by_id;


		public static TransactionsTable? get_dividend_transaction (DataContext context, DividendsTable dividend) => (from item in context.transactions
			join type in context.transaction_types on item.transaction_type_id equals type.id
			where
				(item.broker_id == dividend.broker_id) &&
				(item.ticker_id == dividend.ticker_id) &&
				(item.transaction_date == dividend.issue_date) &&
				(type.name.Equals ("buy"))
			select
				item
		).FirstOrDefault ();


		public static Guid? save_transaction (DataContext context, TransactionsTable transaction) {

			switch (isset (transaction.id)) {
				case true: context.transactions.Update (transaction); break;
				default: context.transactions.Add (transaction); break;
			}// switch;

			context.SaveChanges ();
			return transaction.id;

		}// save_transaction;

	}// TransactionQueries;

}// Stockboy.Classes.Queries;