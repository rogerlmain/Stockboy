import { StockModel } from "Models/Abstract/BaseModel";


export default class TransactionDataModel extends StockModel {
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