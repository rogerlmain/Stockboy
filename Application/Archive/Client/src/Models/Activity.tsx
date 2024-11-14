import { BaseModel } from "Models/Abstract/BaseModels";


export class ActivityModel extends BaseModel {
	public date: Date;
	public transaction_type: string;
	public broker_id: string;
	public ticker_id: string;
	public broker: string;
	public company: string;
	public ticker: string;
	public quantity: number;
	public amount: number;
	public total_quantity: number;
	public total_amount: number;
}// ActivityModel;


export class ProfitLossModel {

}// ProfitLossModel;