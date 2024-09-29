import BaseModel from "Models/Abstract/BaseModel";

export default class TransactionModel extends BaseModel {
	thing: string = "blah";
	broker_id: string;
    ticker_id: string;
    company: string;
	broker: string;
    ticker: string;
	price: number;
	quantity: number;
	transaction_date: Date;
	settlement_date: Date;
	transaction_type: string;
}// TransactionModel;