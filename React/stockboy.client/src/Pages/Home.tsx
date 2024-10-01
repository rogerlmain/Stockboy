import React from "react";

import TickerForm from "Forms/TickerForm";
import HoldingsModel from "Models/HoldingsModel";
import Transactions from "Pages/Transactions";

import APIClass, { StockPriceData } from "Controls/Abstract/APIClass";
import DataPage, { DataProps, DataState } from "Controls/Abstract/DataControl";
import DataTable from "Controls/DataTable";
import ErrorWindow from "Controls/ErrorWindow";
import Link from "Controls/Link";

import { NameValueCollection } from "Classes/Collections";
import { TickerModel } from "Models/TickersModel";


const one_hour = 60 * 60 * 1000;

class HomeState extends DataState<HoldingsModel> {
	active_ticker: String = null;
}// HomeState;


export default class HomePage extends DataPage<DataProps, HomeState> {


	private lookup_stock = () => alert (`looking up ${this.state.active_ticker}`);


	private data_table: React.RefObject<DataTable> = React.createRef ();


	/********/


	public state: HomeState = new HomeState ();


	public componentDidMount = () => APIClass.fetch_data ("GetHoldings").then ((response: Array<HoldingsModel>) => {

		let ticker_list: string = null;

		response.forEach ((item: HoldingsModel) => {
			if (is_null (item.price) || ((Date.current_date ().timestamp () - new Date (item.last_updated).timestamp ()) > one_hour)) {
				if (is_null (ticker_list)) return ticker_list = item.symbol;
				ticker_list = `${ticker_list},${item.symbol}`;
			}// if;
		});

		APIClass.fetch_stock_prices (ticker_list).then ((stock_prices: Array<StockPriceData>) => {

			response.forEach ((item: HoldingsModel) => {

				let stock_price: StockPriceData = stock_prices.find ((stock_item: StockPriceData) => stock_item.symbol == item.symbol);

				if (isset (stock_price)) {
			
					item.merge (stock_price);

					item.value = (item.quantity * item.price).truncate_to (2);
					item.profit = (item.value - item.cost).truncate_to (2);

					APIClass.fetch_data ("SaveTicker", new TickerModel ().merge (stock_price, {
						id: item.ticker_id,
						name: item.company,
						last_updated: Date.current_date ()
					}));

				}// if;
			});
			
			this.setState ({ data: response });

		});

	});


	public render = () => is_null (this.state.data) ? this.load_screen : (this.state.data.empty ? <div className="column-block column-centered">
		No stock information available<br />
		<br />
		<div className="row-centered">To add stock purchases,&nbsp;<Link command={() => main_page.change_page (<Transactions />)} text="click here" /></div>
	</div> : <div>
		<div className="miniform">
			<input type="text" id="stock_ticker" onChange={event => this.setState ({active_ticker: event.target.value })} />
			<button id="stock_lookup_button" onClick={() => this.lookup_stock ()}>Lookup</button>
		</div>

		<div className="with-headspace">
			<DataTable id="holdings-table" data={this.state.data} ref={this.data_table} parent={this}
				totals={["cost", "value", "profit"]}
				fields={["broker", "symbol", "company", "price", "quantity", "cost", "value", "profit"]}
				numeric_fields={["quantity"]}
				currency_fields={["price", "cost", "value", "profit"]}
				keys={["ticker_id", "broker_id"]}
				onclick={keys => main_page.change_page (<Transactions keys={keys} />)}>
			</DataTable>
		</div>

		<div className="button-bar">
			<button id="add_ticker" onClick={() => main_page.popup_window.show (<TickerForm />, new NameValueCollection ({
				Save: () => alert ("Saving..."),
				Cancel: () => main_page.popup_window.hide ()
			}))}>Add Ticker</button>
			<button id="add_broker">Add Broker</button>
			<button id="add_transaction">Add Transaction</button>
		</div>

	</div>);

}// HomePage;