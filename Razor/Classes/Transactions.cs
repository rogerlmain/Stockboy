using Stockboy.Classes.Data;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class Transactions {

		public static List<Transaction>? GetTransactionHistory (String ticker) => new Database ().ExecuteProcedure<Transaction> ("get_transaction_history", ticker);


	}// Transactions;

}// Stockboy.Classes;
