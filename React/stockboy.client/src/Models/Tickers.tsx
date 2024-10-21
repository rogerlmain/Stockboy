import { BaseModel } from "Models/Abstract/BaseModel";

export class TickerListModel extends BaseModel {
    symbol: string = null;
    name: string = null;
	price: number = null;
	volume: number = null;
	dividend_frequency: number = null;
	last_paid: number = null;
	last_updated: Date = null;
}// TickerListModel;


export class TickerDataModel extends BaseModel {
	name: string = null;
	symbol: string = null;
	price?: number = null;
	volume?: number = null;
	last_payment_date?: Date = null;
	next_payment_date?: Date = null;
	last_updated?: Date = null;
}// TickerDataModel;