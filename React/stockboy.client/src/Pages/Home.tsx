import React from "react";

import HoldingsModel from "Models/HoldingsModel";
import DataTable from "Controls/DataTable";

import BasePage from "Pages/Abstract/BasePage";
import DataPage, { DataProps, DataState } from "Controls/DataControl";
import Transactions from "Pages/Transactions";

import { BaseProps } from "Controls/BaseComponent";


class HomeState extends DataState<HoldingsModel> {
	active_ticker: String = null;
}// HomeState;


export default class Home extends DataPage<DataProps, HomeState> {


	private lookup_stock = () => alert (`looking up ${this.state.active_ticker}`);


	private data_table = React.createRef<DataTable> ();


	/********/


	public state: HomeState = new HomeState ();


	public componentDidMount = () => this.fetch ("GetHoldings").then (response => {
		this.setState ({data: response})
	});


	public render = () => is_null (this.state.data) ? this.load_screen : <div>
		<div className="miniform">
			<input type="text" id="stock_ticker" onChange={event => this.setState ({active_ticker: event.target.value })} />
			<button id="stock_lookup_button" onClick={() => this.lookup_stock ()}>Lookup</button>
		</div>

		<div className="with-headspace">
			<DataTable id="holdings-table" data={this.state.data} ref={this.data_table} 
				totals={["cost", "value", "profit"]}
				fields={["broker", "symbol", "asset", "quantity", "price", "cost", "value", "profit"]}
				keys={["ticker_id", "broker_id"]}
				onclick={keys => main_page.change_page (<Transactions keys={keys} />)}>
			</DataTable>
		</div>

		<div className="button-bar">
			<button id="add_ticker">Add Ticker</button>
			<button id="add_broker">Add Broker</button>
			<button id="add_transaction">Add Transaction</button>
		</div>

	</div>

}// Home;