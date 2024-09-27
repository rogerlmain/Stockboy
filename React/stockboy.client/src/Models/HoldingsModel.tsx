import BaseModel from "Models/Abstract/BaseModel";


export default class HoldingsModel extends BaseModel {
	public ticker_id: string;
	public broker_id: string;
	public broker: string;
	public symbol: string;
	public asset: string;
	public quantity: number;
	public cost: number;
	public value: number;
	public price: number;
	public profit: number;
}// HoldingsModel;