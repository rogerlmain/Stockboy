import BaseModel from "Models/Abstract/BaseModel";


export default class HoldingsModel extends BaseModel {
	public ticker_id: string;
	public broker_id: string;
	public broker: string;
	public symbol: string;
	public company: string;
	public cost_price: number;
	public current_price: number;
	public quantity: number;
	public volume: number;
	public total_purchase_price: number;
	public total_sale_price: number;
	public value: number;
	public profit: number;
	public last_updated: Date;
}// HoldingsModel;