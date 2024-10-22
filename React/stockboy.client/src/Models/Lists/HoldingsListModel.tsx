import { StockModel } from "Models/Abstract/BaseModel";


export default class HoldingsListModel extends StockModel {
	public broker: string;
	public symbol: string;
	public company: string;
	public cost_price: number;
	public current_price: number;
	public quantity: number;
	public volume: number;
	public total_purchase_cost: number;
	public current_purchase_cost: number;
	public total_sales_amount: number;
	public value: number;
	public last_updated: Date;
}// HoldingsListModel;