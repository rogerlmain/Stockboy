using Microsoft.EntityFrameworkCore.Query.Internal;
using Stockboy.Models;


namespace Stockboy.Classes.Queries {

	public class TransactionQueries {

		private static IQueryable<TransactionModel> SelectQuery (DataContext context) {
			IQueryable<TransactionModel> result = from tra in context.transactions
			join tck in context.tickers on tra.ticker_id equals tck.id
			join brk in context.brokers on tra.broker_id equals brk.id
			join ttp in context.transaction_types on tra.transaction_type_id equals ttp.id
			where !(tra.deleted ?? true) && (tra.user_id == current_user!.user_id)
			select new TransactionModel () {
				id = tra.id,
				user_id = tra.user_id,
				broker_id = brk.id,
				ticker_id = tck.id,
				company = tck.name ?? String.Empty,
				broker = brk.name ?? String.Empty,
				ticker = tck.symbol ?? String.Empty,
				price = tra.price,
				quantity = tra.quantity,
				cost = tra.price * tra.quantity,
				transaction_date = tra.transaction_date,
				settlement_date = tra.settlement_date,
				transaction_type = ttp.name,
				transaction_type_id = ttp.id,
			};
			return result;
		}// SelectQuery;


		public static TransactionModelList? get_transactions (DataContext context) => SelectQuery (context).ToList ();


		public static TransactionModel? GetTransactionById (DataContext context, Guid? id) {
			return SelectQuery (context).Where ((TransactionModel item) => item.id == id).FirstOrDefault ();
		}// GetTransactionById;


		public static TransactionsTableRecord? get_dividend_transaction (DataContext context, DividendsTableRecord dividend) => (from item in context.transactions
			join type in context.transaction_types on item.transaction_type_id equals type.id
			where
				(item.broker_id == dividend.broker_id) &&
				(item.ticker_id == dividend.ticker_id) &&
				(item.transaction_date == dividend.issue_date) &&

// add purchase price to search criteria

				(type.name.Equals ("buy"))
			select
				item
		).FirstOrDefault ();


	}// TransactionQueries;

}// Stockboy.Classes.Queries;