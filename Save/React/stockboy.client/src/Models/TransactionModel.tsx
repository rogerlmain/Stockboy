import BaseModel from "Models/Abstract/BaseModel";

import { IDataPageModel } from "Pages/DataPage";


export default class TransactionModel extends BaseModel implements IDataPageModel {
	keys: Array<string> = null;
	broker_id: string = null;
    ticker_id: string = null;
    company: string = null;
	broker: string = null;
    ticker: string = null;
	price: number = null;
	quantity: number = null;
	transaction_date: Date = null;
	settlement_date: Date = null;
	transaction_type: string = null;
}// TransactionModel;