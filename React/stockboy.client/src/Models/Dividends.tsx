import { IStockModel, StockModel } from "Models/Abstract/BaseModel";


export default class DividendDataModel extends StockModel {
	broker: string = null;
	ticker: string = null;
	issue_date: Date = null;
	amount_per_share: number = null;
	share_quantity: number = null;
	payout: number = null;
	reinvestment_date: Date = null;
	settlement_date: Date = null;
	shares_purchased: number = null;
}// DividendDataModel;