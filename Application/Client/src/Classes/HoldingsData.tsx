import LocalDate from "Classes/LocalDate";

import APIClass, { DividendDataItem, DividendDataSet, StockPriceData } from "Classes/APIClass";

import { StockModel } from "Models/Abstract/BaseModels";
import { TickersDataModel } from "Models/Tickers";

import { HoldingsList } from "Pages/Home";


const one_hour = 60 * 60 * 1000;


export enum HoldingsFilter {
	live = "live",
	dead = "dead",
	defunct = "defunct",
}// HoldingsFilter;


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
}// HoldingsModel;


export default class HoldingsData {

	private async get_outdated_tickers (holdings: HoldingsList): Promise <Array<TickersDataModel>> {

		let ticker_list: Array<TickersDataModel> = null;
		let id_list: StringArray = null;

		holdings.forEach ((item: HoldingsModel) => {

			let ticker_price = ticker_list?.find ((ticker: TickersDataModel) => ticker.id == item.ticker_id);

			if ((isset (ticker_price) || (Date.current_date ().timestamp () - new LocalDate (item.last_updated).timestamp ()) <= one_hour) || (item.current_price == -1)) return;
			if (is_null (id_list)) id_list = new Array<string> ();

			id_list.push (item.ticker_id);

		});

		return is_null (id_list) ? null : APIClass.fetch_data ("GetTickersById", id_list);

	}// get_outdated_tickers;


	private get_ticker_list (list: Array<TickersDataModel>): string {

		let ticker_list: string = null;

		list.forEach ((item: TickersDataModel) => {
			if (is_null (ticker_list)) return ticker_list = item.symbol;
			ticker_list = `${ticker_list},${item.symbol}`;
		});

		return ticker_list;

	}// get_ticker_list;


	private async get_stock_prices (holdings: HoldingsList): Promise<Array<TickersDataModel>> { 
		
		let outdated_prices: Array<TickersDataModel> = null;
		let stock_prices: Array<StockPriceData> = null;
		let dividend_data: DividendDataSet = null;

		outdated_prices = await this.get_outdated_tickers (holdings);
		if (is_null (outdated_prices)) return null;

		let ticker_list: string = this.get_ticker_list (outdated_prices);

		if (isset (ticker_list)) {
			stock_prices = await APIClass.fetch_stock_prices (ticker_list);
			dividend_data = await APIClass.fetch_dividend_details (ticker_list);
		}// if;

		return new Promise<Array<TickersDataModel>> (resolve => {

			ticker_list.split (String.Comma).forEach ((symbol: string) => {

				let price = stock_prices?.find ((stock_price: StockPriceData) => stock_price.symbol == symbol);
				let ticker = outdated_prices.find ((ticker: TickersDataModel) => ticker.symbol == symbol);
				let dividend = dividend_data.historicalStockList?.find ((item: DividendDataItem) => item.symbol == symbol);
				let date_list = dividend?.historical.getDates ("paymentDate")?.toSorted ((first, second) => second.getTime () - first.getTime ());

				ticker.price = -1;

				if (isset (price)) ticker.merge (price);
				if (not_set (date_list)) return;

				ticker.last_payment_date = date_list.find ((date: Date) => Date.earlier (date));
				ticker.next_payment_date = date_list.toSorted ((first, second) => first.getTime () - second.getTime ()).find ((date: Date) => Date.later (date));

			});

			resolve (outdated_prices);

		});

	}// get_stock_prices;


	private async update_stock_prices (holdings: HoldingsList): Promise<Array<TickersDataModel>> {

		let stock_prices: Array<TickersDataModel> = await this.get_stock_prices (holdings);

		if (is_null (stock_prices)) return null;

		return new Promise<Array<TickersDataModel>> (resolve => {

			stock_prices.forEach ((stock_price: TickersDataModel) => {
				stock_price.last_updated = Date.current_date ();
				if (is_null (stock_price.price)) stock_price.price = -1;
				APIClass.fetch_data ("SaveTicker", stock_price);
			});

			resolve (stock_prices);

		});

	}// update_stock_prices;


	/********/


	public get_holdings_list (): Promise<HoldingsList> {
		return new Promise (resolve => {
			APIClass.fetch_data ("GetHoldings").then (async (holdings: HoldingsList) => {

				if (is_null (holdings) || (holdings.NoData)) return resolve (null);

				let stock_prices: Array<TickersDataModel> = await this.update_stock_prices (holdings);

				if (isset (stock_prices)) holdings.forEach ((holding: HoldingsModel) => {

					let stock_price: TickersDataModel = stock_prices.find ((item: TickersDataModel) => holding.ticker_id == item.id);
					
					if (isset (stock_price)) holding.current_price = stock_price.price;

				});

				holdings.forEach ((holding: HoldingsModel) => {
					holding.value = (holding.current_price < 0) ? 0 : holding.quantity * holding.current_price;
				});

				resolve (holdings);

			});
		});
	}// get_holdings_list;


	/********


	public get has_data () { return isset (this.master_list) }


	public list (filters: HoldingsFilterList = null, broker_id: string, ticker_id: string) {

		let result: HoldingsList = null;

		if (isset (this.master_list)) this.master_list.forEach ((item: HoldingsModel) => {

			function include_item (item: HoldingsModel) {
				if (is_null (result)) result = new Array<HoldingsModel> ();
				result.push (Object.assign (item));
			}// include_item;

			if (isset (broker_id) && (item.broker_id != broker_id)) return;
			if (isset (ticker_id) && (item.ticker_id != ticker_id)) return;

			if (filters?.contains (HoldingsFilter.live) && (item.current_price != -1) && (item.quantity > 0)) return include_item (item);
			if (filters?.contains (HoldingsFilter.dead) && (item.current_price != -1) && (item.quantity == 0)) return include_item (item);
			if (filters?.contains (HoldingsFilter.defunct) && (item.current_price == -1)) return include_item (item);

		});

		return result;

	}// filter_holdings_list;

	*/

}// HoldingsData;