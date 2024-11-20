import ErrorWindow from "Controls/Popups/ErrorWindow";


const stockboy_url = "https://localhost:7006";
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


export default abstract class APIClass {


	private static fetch = (url: RequestInfo, body: any = null): any => new Promise (resolve => {

		let parameters = {
			method: is_null (body) ? "get" : "post",
			headers: { "content-type": "application/json" }
		};

		if (not_null (body)) {
			if (body instanceof FormData) body = Object.fromEntries (body);
			parameters ["body"] = JSON.stringify (body);
		}// if;

		fetch (url, parameters).then (response => {
			try {
				if (response.ok) return response.json ();
				throw "Bad request";
			} catch (except: any) {
				return { error: except.message };
			}// try;
		}).then (response => {
			if (is_null (response)) return resolve (null);
			if (isset (response ["error"])) return popup_window.show (<ErrorWindow text={response ["error"]} />);
			resolve (response);
		}).catch (() => {
			setTimeout (() => resolve (this.fetch (url, body)), 1000);
		});

	});


	/********/


	public static fetch_data = (url: string, body: any = null): Promise<any> => this.fetch (`${stockboy_url}/${url}`, body);


	public static fetch_stock_prices = (ticker: string): Promise<Array<StockPriceData>> => this.fetch (`${exchange_url}/${quote_path}/${ticker}?apikey=${exchange_api_key}`);


	public static async fetch_dividend_details (ticker: string): Promise<DividendDataSet> { 
		let value = new DividendDataSet ().assign (await this.fetch (`${exchange_url}/${dividend_path}/${ticker}?apikey=${exchange_api_key}`));
		return value;
	}// fetch_dividend_details;


}// APIClass;