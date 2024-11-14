import { Invisible, StockModel } from "Models/Abstract/BaseModels";


export class TransactionListModel extends StockModel {

	broker: string = null;
	company: string = null;
	cost: number = null;
	price: number = null;
	quantity: number = null;
	settlement_date: Date = null;
	ticker: string = null;
	transaction_date: Date = null;
	transaction_type: string = null;

	@Invisible
	transaction_type_id: string = null;

}// TransactionListModel;


export class TransactionDataModel extends StockModel {
	price: number = null;
	quantity: number = null;
	transaction_date: Date = null;
	settlement_date: Date = null;
	transaction_type_id: string = null;
}// TransactionDataModel;