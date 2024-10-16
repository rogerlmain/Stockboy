import { IStockModel, StockDataModel, StockModel } from "Models/Abstract/BaseModel";


export class DividendListModel extends StockDataModel {
	broker: string = null;
	ticker: string = null;
	issue_date: Date = null;
	amount_per_share: number = null;
	share_quantity: number = null;
	payout: number = null;
}// DividendListModel;


export class DividendDataModel extends StockModel {
	amount_per_share: number = null;
	share_quantity: number = null;
	issue_date: Date = null;
	reinvested: boolean = false;
	transaction_date: Date = null;
	settlement_date: Date = null;
	shares_purchased: number = null;
	purchase_price: number = null;
}// DividendDataModel;