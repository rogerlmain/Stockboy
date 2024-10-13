import BaseModel from "Models/Abstract/BaseModel";


export default class DividendListModel extends BaseModel {
	broker: string = null;
	ticker: string = null;
	broker_id: string = null;
	ticker_id: string = null;
	issue_date: Date = null;
	amount_per_share: number = null;
	share_quantity: number = null;
	payout: number = null;
	reinvestment_date: Date = null;
	settlement_date: Date = null;
}// DividendListModel;