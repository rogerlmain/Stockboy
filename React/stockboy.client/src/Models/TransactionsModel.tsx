import BaseModel from "Models/Abstract/BaseModel";

export default class TransactionModel extends BaseModel {
    company: string;
    ticker: string;
	broker: string;
	price: number;
	quantity: number;
	transaction_date: Date;
	settlement_date: Date;
	transaction_type: string;
}// TransactionModel;