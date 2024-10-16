import { invisible, StockDataModel, StockModel } from "Models/Abstract/BaseModel";


export class TransactionListModel extends StockDataModel {

	broker: string = null;
	company: string = null;
	cost: number = null;
	price: number = null;
	quantity: number = null;
	settlement_date: Date = null;
	ticker: string = null;
	transaction_date: Date = null;
	transaction_type: string = null;

	@invisible
	transaction_type_id: string = null;

}// TransactionListModel;


export class TransactionDataModel extends StockModel {
	keys: Array<string> = null;
    company: string = null;
	broker: string = null;
    ticker: string = null;
	price: number = null;
	quantity: number = null;
	cost: number = null;
	transaction_date: Date = null;
	settlement_date: Date = null;
	transaction_type: string = null;
	transaction_type_id: string = null;
}// TransactionDataModel;