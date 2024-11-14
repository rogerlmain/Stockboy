import { HoldingsStatus } from "Classes/Globals";
import { /*DataType,*/ StockModel } from "Models/Abstract/BaseModels";


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


export class StockDetailsModel {
	public company: string = null;
	public brokers: StringArray = null;
	public ticker: string = null;

	/*@DataType ("date")*/
	public first_purchased: Date = null;

	/*@DataType ("date")*/
	public last_purchased: Date = null;

	/*@DataType ("date")*/
	public first_dividend_date: Date = null;

	/*@DataType ("date")*/
	public last_dividend_date: Date = null;

	/*@DataType ("date")*/
	public next_dividend_date: Date = null;
}// StockDetailsModel;