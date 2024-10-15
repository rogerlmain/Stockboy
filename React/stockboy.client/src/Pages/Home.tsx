import React, { ChangeEvent, RefObject, createRef } from "react";

import APIClass, { StockPriceData } from "Classes/APIClass";

import LocalDate from "Classes/LocalDate";

import HoldingsModel from "Models/Holdings";

import Eyecandy from "Controls/Eyecandy";
import Link from "Controls/Link";
import BrokerList from "Controls/Lists/BrokerList";
import SelectList from "Controls/Lists/SelectList";
import TickerList from "Controls/Lists/TickerList";
import DataTable from "Controls/Tables/DataTable";

import TransactionsPage from "Pages/Transactions";

import { DataControl, DataProps, DataState } from "Controls/Abstract/DataControls";
import { TickerListModel, TickerPriceModel } from "Models/Tickers";
import Decimal from "../Classes/Decimal";


const one_hour = 60 * 60 * 1000;

class HomeState extends DataState<HoldingsModel> {
	active_ticker: String = null;
	dead_stocks: boolean = true; //false;
	sold_stocks: boolean = false;
	live_stocks: boolean = false; //true;
	loading: boolean = true;
}// HomeState;


export default class HomePage extends DataControl<DataProps, HomeState> {


	private lookup_stock = () => alert (`looking up ${this.state.active_ticker}`);


	private data_table: RefObject<DataTable> = createRef ();


	private holdings_list: Array<HoldingsModel> = null;


	private get_outdated_tickers (holdings: Array<HoldingsModel>) {

		let ticker_list: Array<TickerPriceModel> = null;

		holdings.forEach ((item: HoldingsModel) => {

			let ticker_price = ticker_list?.find ((ticker: TickerPriceModel) => ticker.id == item.ticker_id);

			if ((isset (ticker_price) || (Date.current_date ().timestamp () - new LocalDate (item.last_updated).timestamp ()) <= one_hour) || (item.current_price == -1)) return;
			if (is_null (ticker_list)) ticker_list = new Array<TickerPriceModel> ();

			ticker_list.push ({
				id: item.ticker_id,
				symbol: item.symbol,
				price: null
			});

		});

		return ticker_list;

	}// get_outdated_tickers;


	private get_ticker_list (list: Array<TickerPriceModel>): string {

		let ticker_list: string = null;

		list.forEach ((item: TickerPriceModel) => {
			if (is_null (ticker_list)) return ticker_list = item.symbol;
			ticker_list = `${ticker_list},${item.symbol}`;
		});

		return ticker_list;

	}// get_ticker_list;


	private async get_stock_prices (holdings: Array<HoldingsModel>): Promise<Array<TickerPriceModel>> { 
		
		let outdated_prices: Array<TickerPriceModel> = null;
		let stock_prices: Array<StockPriceData> = null;

		outdated_prices = this.get_outdated_tickers (holdings);
		if (is_null (outdated_prices)) return null;

		let ticker_list: string = this.get_ticker_list (outdated_prices);

		if (isset (ticker_list)) stock_prices = await APIClass.fetch_stock_prices (ticker_list);
		if (is_null (stock_prices)) return null;

		return new Promise<Array<TickerPriceModel>> (resolve => {

			stock_prices.forEach ((stock_price: StockPriceData) => {
				let ticker_price = outdated_prices.find ((ticker_price: TickerPriceModel) => ticker_price.symbol == stock_price.symbol);
				if (isset (ticker_price)) ticker_price.price = stock_price.price;
			});

			resolve (outdated_prices);

		});

	}// get_stock_prices;


	private async update_stock_prices (holdings: Array<HoldingsModel>): Promise<Array<TickerPriceModel>> {

		let stock_prices: Array<TickerPriceModel> = await this.get_stock_prices (holdings);

		if (is_null (stock_prices)) return null;

		return new Promise<Array<TickerPriceModel>> (resolve => {

			stock_prices.forEach ((price: TickerPriceModel) => {
				APIClass.fetch_data ("SaveTicker", new TickerPriceModel ().merge ({
					id: price.id,
					price: price.price ?? -1,
					last_updated: Date.current_date ()
				}));
			});

			resolve (stock_prices);

		});

	}// update_stock_prices;


	private update_holdings_list (): Promise<Array<HoldingsModel>> {
		return new Promise (resolve => {
			APIClass.fetch_data ("GetHoldings").then (async (holdings: Array<HoldingsModel>) => {

				if (is_null (holdings)) return resolve (null);

				let stock_prices: Array<TickerPriceModel> = await this.update_stock_prices (holdings);

				if (isset (stock_prices)) holdings.forEach ((holding: HoldingsModel) => {

					let stock_price: TickerPriceModel = stock_prices.find ((item: TickerPriceModel) => holding.ticker_id == item.id);
					
					if (isset (stock_price)) holding.current_price = stock_price.price;

				});

				holdings.forEach ((holding: HoldingsModel) => {
					holding.value = (holding.current_price < 0) ? 0 : holding.quantity * holding.current_price;
					holding.profit = Decimal.subtract (holding.total_sale_price, holding.total_purchase_price);
				});

				resolve (holdings);

			});
		});
	}// update_holdings_list;


	private filter_holdings_list () {

		let result = null;

		function add_stock (item: HoldingsModel) {
			if (is_null (result)) result = new Array<HoldingsModel> ();
			result.push (item);
		}// add_stock;

		if (is_null (this.holdings_list)) return this.setState ({ loading: false });

		this.holdings_list.forEach ((item: HoldingsModel) => {
			if (this.state.dead_stocks && (item.current_price == -1)) add_stock (item);
			if (this.state.sold_stocks && (item.quantity == 0 )) add_stock (item);
			if (this.state.live_stocks && ((item.current_price != -1) && (item.quantity != 0 ))) add_stock (item);
		});

		this.setState ({ 
			loading: false,
			data: result 
		});

	}// filter_holdings_list;


	/********/


	private get lookup_panel () {

		if (is_null (this.state.data)) return;

		return <div style={{ display: "inline-block" }}>
			<div className="miniform">
				<input type="text" id="stock_ticker" onChange={event => this.setState ({active_ticker: event.target.value })} />
				<button id="stock_lookup_button" onClick={() => this.lookup_stock ()}>Lookup</button>
			</div>
		</div>

	}// lookup_panel;


	private get filter_panel () {

		if (is_null (this.state.data)) return;

		return <form>
			<div className="wide-column-spaced row-block">

				<BrokerList header={SelectList.All} selected_item={this.state.broker_id} 
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: (event.currentTarget.value == SelectList.All ? null : event.currentTarget.value) })}>
				</BrokerList>

				<TickerList header={SelectList.All} broker_id={this.state.broker_id}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ ticker_id: event.currentTarget.value })}>
				</TickerList>

			</div>
		</form>

	}// filter_panel;


	private get checkbox_panel () {
		return <div className="two-column-grid">
			<label htmlFor="dead_stock_checkbox">Show live stocks</label>
			<input type="checkbox" id="dead_stock_checkbox" defaultChecked={this.state.live_stocks} onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ live_stocks: event.target.checked })} />

			<label htmlFor="dead_stock_checkbox">Show dead stocks</label>
			<input type="checkbox" id="dead_stock_checkbox" defaultChecked={this.state.dead_stocks} onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ dead_stocks: event.target.checked })} />

			<label htmlFor="dead_stock_checkbox">Show sold stocks</label>
			<input type="checkbox" id="dead_stock_checkbox" defaultChecked={this.state.sold_stocks} onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ sold_stocks: event.target.checked })} />
		</div>
	}// checkbox_panel;


	private get empty_data_panel () {
		return <div className="column-centered column-block">
			No stock information available<br />
			<br />
			<div className="row-centered">To add stock purchases,&nbsp;<Link command={() => main_page.change_page (<TransactionsPage />)} text="click here" /></div>
		</div>
	}// empty_data_panel;


	private get grid_panel () {
		return <div className="body">
			<DataTable id="holdings-table" data={this.state.data} ref={this.data_table} parent={this}
				fields={["broker", "symbol", "company", "current_price", "quantity", 
					{ total_purchase_price: "Purchase Price"}, 
					{ total_sale_price: "Sale Price"}, 
					{ value: "Current Value" }, 
					{ profit: "Profit / Loss" }
				]}
				numeric_fields={["quantity"]}
				currency_fields={["current_price", "total_purchase_price", "total_sale_price", "value", "profit"]}
				total_fields={["cost", "value", "profit"]}
				keys={["ticker_id", "broker_id"]}>
			</DataTable>
		</div>
	}// grid_panel;


	/********/


	public state: HomeState = new HomeState ();


	public componentDidUpdate (previous_props: DataProps, previous_state: HomeState) {
		if ((previous_state.live_stocks != this.state.live_stocks) || (previous_state.sold_stocks != this.state.sold_stocks) || (previous_state.dead_stocks != this.state.dead_stocks)) this.filter_holdings_list ();
	}// componentDidUpdate;


	public componentDidMount () {
		this.update_holdings_list ().then ((holdings: Array<HoldingsModel>) => this.setState ({ data: this.holdings_list = holdings }, () => this.filter_holdings_list ()));
	}// componentDidMount;


	public render () {
	
		if (this.state.loading) return <Eyecandy text="Loading holdings..." />;

		return <div className="page-layout column-centered">

			{isset (this.holdings_list) ? <div>

				<div className={`${isset (this.state.data) ? "horizontally-spaced-out row-centered" : "right-aligned"}`} style={{ width: "65rem" }}>
					{this.lookup_panel}
					{this.checkbox_panel}
				</div>

				{isset (this.state.data) ? this.filter_panel : null}

			</div> : null}

			{is_null (this.state.data) ? this.empty_data_panel : this.grid_panel}

		</div>

	}// render;


}// HomePage;