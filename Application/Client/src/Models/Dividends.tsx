import { TypeSafe, DateType, StockModel } from "Models/Abstract/BaseModels";


type DividendPayoutList = Array<DividendPayoutItem>

class DividendPaymentModel {
	public company: string = null;

	@TypeSafe (Date)
	public payment_date: DateType = null;

	public amount: Number = null;
}// DividendPaymentModel;


export type DividendPaymentArray = Array<DividendPaymentModel>
export type DividendPaymentList = Array<DividendPayment>


export class DividendPayment {
	public company: String = null;
	public ticker: String = null;

	@TypeSafe (Date)
	public payment_date: DateType = null;

	public amount_per_share: number = null;
	public quantity: number = null;
}// DividendPayment;


export class DividendListModel extends StockModel {
	public broker: string = null;
	public ticker: string = null;

	@TypeSafe (Date)
	public issue_date: Date = null;

	public amount_per_share: number = null;
	public share_quantity: number = null;
	public payout: number = null;
}// DividendListModel;


export class DividendDataModel extends StockModel {
	public amount_per_share: number = null;
	public share_quantity: number = null;

	@TypeSafe (Date)
	public issue_date: Date = null;

	public reinvested: boolean = false;

	@TypeSafe (Date)
	public transaction_date: Date = null;

	@TypeSafe (Date)
	public settlement_date: Date = null;

	public shares_purchased: number = null;
	public purchase_price: number = null;
}// DividendDataModel;


export class DividendPayoutItem {
	public ticker_id: String = null;
	public company: String = null;
	public ticker: String = null;
	public amount: Number = null;
}// DividendPayoutItem;


export class DividendPayout {
	public payouts: DividendPayoutList = null;
	public total: number = null;
}// DividendPayout;
