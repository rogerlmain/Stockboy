import APIClass from "Classes/Common/Abstract/APIClass";
import ErrorWindow from "Controls/Common/Windows/ErrorWindow";


const stockboy_url = local_host ? "https://localhost:3002" : "https://stockboy.rogerlmain.com:3002";
const exchange_url = "https://financialmodelingprep.com/api/v3/";

const quote_path = "quote-short";
const dividend_path = "historical-price-full/stock_dividend";

const exchange_api_key = "GWL8VaOub1b403hrhY0RGpKUnUl5yRhP";


export class StockPriceData {
	public symbol: string = null;
	public price: number = null;
	public volume: number = null;
}// StockPriceData;


export class DividendData {
	public date: Date = new Date ();
	public label: string = null;
	public adjDividend: number = null;
	public symbol: string = null;
	public dividend: number = null;
	public recordDate: Date = null;
	public paymentDate: Date = new Date ();
	public declarationDate: Date = null;
}// DividendData;


export class DividendDataItem {
	public historical: Array<DividendData> = null;
	public symbol: string = null;
}// DividendDataItem;


export class DividendDataSet {
	public historicalStockList: Array<DividendDataItem>;
}// DividendDataSet;


export default class StockboyAPI extends APIClass {

	public fetch_data (url: string, body: any = null): Promise<any> {

		if (not_set (UserId)) throw ("Invalid user ID.");
		if (is_null (body)) body = new Object ();

		switch (body instanceof FormData) {
			case true: body.append ("user_id", UserId); break;
			default: body ["user_id"] = UserId; break;
		}// switch;

		return new Promise (resolve => {
			super.fetch_data (`${url}`, body).then (response => {
				if (isset (response ["message"])) {
					popup_window.show (<ErrorWindow text="Unauthorized access." onClose={() => {
						clearStorage ("key");
						base_page.forceUpdate ();
					}} />);
					resolve (null);
				}// if;
				resolve (response);
			});
		});

	}// fetch_data;


	public login_user = (credentials: FormData) => super.fetch_data ("LoginUser", credentials);

	
	public fetch_stock_prices = (ticker: string): Promise<Array<StockPriceData>> => this.fetch (`${exchange_url}/${quote_path}/${ticker}?apikey=${exchange_api_key}`);


	public async fetch_dividend_details (ticker: string): Promise<DividendDataSet> { 
		return new DividendDataSet ().assign (await this.fetch (`${exchange_url}/${dividend_path}/${ticker}?apikey=${exchange_api_key}`));
	}// fetch_dividend_details;


	public constructor () {
		super (stockboy_url);
	}// constructor;


}// StockboyAPI;