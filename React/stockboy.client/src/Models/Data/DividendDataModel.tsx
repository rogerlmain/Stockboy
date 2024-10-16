import { IStockModel, StockModel } from "Models/Abstract/BaseModel";


export default class DividendDataModel extends StockModel {
	amount_per_share: number = null;
	share_quantity: number = null;
	issue_date: Date = null;
	reinvested: boolean = false;
	transaction_date: Date = null;
	settlement_date: Date = null;
	shares_purchased: number = null;
	purchase_price: number = null;
}// DividendDataModel;