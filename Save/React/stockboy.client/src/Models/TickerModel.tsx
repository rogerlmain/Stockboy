import BaseModel from "Models/Abstract/BaseModel";

export class TickerModel extends BaseModel {
    symbol: string = null;
    name: string = null;
	price: number = null;
	volume: number = null;
	dividend_date: number = null;
	dividend_frequency: number = null;
	last_updated: Date = null;
}// TickerModel;