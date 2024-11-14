import { HoldingsStatus } from "Classes/Globals";
import { TypeSafe, DateType, StockModel } from "Models/Abstract/BaseModels";
import { DividendPayment, DividendPaymentList, DividendPayout } from "Models/Dividends";


type HoldingsModelList = Array<HoldingsModel>


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

	@TypeSafe (Date)
	public first_purchased: DateType = null;

	@TypeSafe (Date)
	public last_purchased: DateType = null;

	@TypeSafe (Date)
	public first_dividend_date: DateType = null;

	@TypeSafe (Date)
	public last_dividend_date: DateType = null;

	@TypeSafe (Date)
	public next_dividend_date: DateType = null;
}// StockDetailsModel;


export class HomeDetailsModel {

	@TypeSafe (DividendPayment)
	public payments_list?: DividendPaymentList = null;
	
	public holdings_list?: HoldingsModelList = null;

	@TypeSafe (DividendPayout)
	public monthly_payout: DividendPayout = null

}// HomeDetailsModel;