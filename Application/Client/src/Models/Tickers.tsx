import { BaseModel } from "Models/Abstract/BaseModels";


export class TickersListModel extends BaseModel {
    symbol: string = null;
    name: string = null;
	price: number = null;
	volume: number = null;
	dividend_frequency: number = null;
	last_paid: number = null;
	last_updated: Date = null;
}// TickersListModel;


export class TickersDataModel extends BaseModel {
	name: string = null;
	symbol: string = null;
	price?: number = null;
	volume?: number = null;
	last_payment_date?: Date = null;
	next_payment_date?: Date = null;
	last_updated?: Date = null;
}// TickersDataModel;