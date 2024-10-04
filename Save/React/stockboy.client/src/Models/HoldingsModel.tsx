import BaseModel from "Models/Abstract/BaseModel";


export default class HoldingsModel extends BaseModel {
	public ticker_id: string;
	public broker_id: string;
	public broker: string;
	public symbol: string;
	public company: string;
	public price: number;
	public quantity: number;
	public volume: number;
	public cost: number;
	public value: number;
	public profit: number;
	public last_updated: Date;
}// HoldingsModel;