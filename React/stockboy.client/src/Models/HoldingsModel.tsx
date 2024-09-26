import BaseModel from "Models/Abstract/BaseModel";


export default class HoldingsModel extends BaseModel {
	public ticker_id: String;
	public broker_id: String;
	public broker: String;
	public symbol: String;
	public asset: String;
	public quantity: number;
	public cost: number;
	public value: number;
	public price: number;
	public profit: number;
}// HoldingsModel;