import ErrorWindow from "Controls/ErrorWindow";

const stockboy_url = "https://localhost:7100";
const exchange_url = "https://financialmodelingprep.com/api/v3/quote-short";

const exchange_api_key = "GWL8VaOub1b403hrhY0RGpKUnUl5yRhP";


export class StockPriceData {
	symbol: string = null;
	price: number = null;
	volume: number = null;
}// StockPriceData;


export default abstract class APIClass {


	private static fetch = (url: RequestInfo, body: any = null): any => new Promise ((resolve, reject) => {

		let parameters = {
			method: is_null (body) ? "get" : "post",
			headers: { "content-type": "application/json" }
		};

		if (not_null (body)) {
			if (body instanceof FormData) body = Object.fromEntries (body);
			parameters ["body"] = JSON.stringify (body);
		}// if;

		fetch (url, parameters).then (response => {
			return response.json ();
		}).then (response => {
			if (is_null (response)) return resolve (null);
			if (isset (response ["error"])) return main_page.popup_window.show (<ErrorWindow text={response ["error"]} />);
			resolve (response);
		});

	});


	/********/


	public static fetch_data = (url: string, body: any = null): Promise<any> => this.fetch (`${stockboy_url}/${url}`, body);


	public static fetch_stock_prices = (ticker: string): Promise<Array<StockPriceData>> => this.fetch (`${exchange_url}/${ticker}?apikey=${exchange_api_key}`);


}// APIClass;