import { HoldingsStatus } from "Classes/Globals";
import { StockModel } from "Models/Abstract/BaseModels";


export class HoldingsModel extends StockModel {
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
	public sales_profit: number;
	public status: HoldingsStatus;
}// HoldingsModel;


export class ProfitLossModel extends HoldingsModel {
	public dividend_payout: number;
	public value_profit: number;
	public overall_profit: number;
}// ProfitLossModel;

