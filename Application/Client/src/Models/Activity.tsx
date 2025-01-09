import { BaseModel, StockModel } from "Models/Abstract/BaseModels";


export class ActivityModel extends StockModel {
	public broker: string;
	public company: string;
	public cost_price: number;
	public current_price: number;
	public current_value: object;
	public payment_amount: object;
	public quantity: number;
	public symbol: string;
	public total_cost: number;
	public total_quantity: number;
	public transaction_date: string;
	public transaction_type: string;
	public user_id: string;
}// ActivityModel;


export class ProfitLossModel {

}// ProfitLossModel;