import BaseModel from "Models/Abstract/BaseModel";

export default class TransactionModel extends BaseModel {
    company: String;
    ticker: String;
	broker: String;
	price: number;
	quantity: number;
	transaction_date: Date;
	settlement_date: Date;
	transaction_type: String;
}// TransactionModel;