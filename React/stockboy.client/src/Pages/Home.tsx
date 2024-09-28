import React from "react";

import BasePage from "Pages/Abstract/BasePage";
import Transactions from "Pages/Transactions";

import HoldingsModel from "Models/HoldingsModel";

import TickerForm from "Forms/TickerForm";

import DataPage, { DataProps, DataState } from "Controls/DataControl";
import DataTable from "Controls/DataTable";
import Link from "Controls/Link";
import ErrorWindow from "Controls/ErrorWindow";

import { BaseProps } from "Controls/BaseComponent";

import { NameValueCollection } from "Classes/Collections";


class HomeState extends DataState<HoldingsModel> {
	active_ticker: String = null;
}// HomeState;


export default class HomePage extends DataPage<DataProps, HomeState> {


	private lookup_stock = () => alert (`looking up ${this.state.active_ticker}`);


	private data_table: React.RefObject<DataTable> = React.createRef ();


	/********/


	public state: HomeState = new HomeState ();


	public componentDidMount = () => this.fetch ("GetHoldings").then ((response: Array<HoldingsModel>) => {
		if (isset (response ["error"])) return main_page.popup_window.show (<ErrorWindow text={response ["error"]} />, null, true);
		this.setState ({data: response})
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
				fields={["broker", "symbol", "asset", "quantity", "price", "cost", "value", "profit"]}
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