import HoldingsPage, { HoldingsProps } from "Pages/Abstract/HoldingsPage";

import CheckboxPanel from "Controls/CheckboxPanel";
import Link from "Controls/Link";
import DataTable from "Controls/Tables/DataTable";
import TickerSelector from "Controls/TickerSelector";

import TransactionsPage from "Pages/Transactions";

import { MainPageContext } from "Classes/Contexts";
import { HoldingsModel } from "Classes/HoldingsData";

import { DataState } from "Controls/Abstract/DataControl";
import { RefObject, createRef } from "react";

import { PageType } from "Pages/Main";


class HomeState extends DataState<HoldingsModel> {
	active_ticker: String = null;
}// HomeState;


export default class HomePage extends HoldingsPage<HoldingsProps, HomeState> {

	private data_table: RefObject<DataTable> = createRef ();


	private lookup_stock = () => alert (`looking up ${this.state.active_ticker}`);


	private get lookup_panel () {

		if (is_null (this.state.data)) return;

		return <div style={{ display: "inline-block" }}>
			<div className="miniform">
				<input type="text" id="stock_ticker" onChange={event => this.setState ({active_ticker: event.target.value })} />
				<button id="stock_lookup_button" onClick={() => this.lookup_stock ()}>Lookup</button>
			</div>
		</div>

	}// lookup_panel;


	private get selector_panel () {

		if (is_null (this.state.data)) return;

		return <form>
			<div className="wide-column-spaced column-centered row-block margin">
				<TickerSelector id="ticker_selector"
					broker_id={this.state.broker_id}
					ticker_id={this.state.ticker_id}>
				</TickerSelector>
			</div>
		</form>

	}// selector_panel;


	private get empty_data_panel () {
		return <div className="column-centered">
			No stock information available<br />
			<br />

			{!this.props.holdings.has_data ? <div className="row-centered">

				To add stock purchases,&nbsp;

				<MainPageContext.Consumer>
					{main_page => <Link command={() => main_page.change_page (PageType.transactions)} text="click here" />}
				</MainPageContext.Consumer>

			</div> : null}

		</div>
	}// empty_data_panel;


	private get grid_panel () {
		return <div className="body">
			<DataTable id="holdings-table" data={this.state.data} ref={this.data_table} parent={this}
				fields={["broker", "symbol", "company", "quantity", "current_price", 
					{ current_purchase_cost: "Purchase Price"}, 
					{ value: "Current Value" }
				]}
				numeric_fields={["quantity"]}
				currency_fields={["current_price", "current_purchase_cost", "value"]}
				total_fields={["cost", "value"]}
				rounded_fields={[{ value: 2 }]}
				keys={["ticker_id", "broker_id"]}>
			</DataTable>
		</div>
	}// grid_panel;


	/********/


	public state: HomeState = new HomeState ();


	public render () {
		return <div className="page-layout">

			<div className="title">Overview</div>

			<div className={`${isset (this.state.data) ? "horizontally-spaced-out row-centered" : "right-aligned"}`} style={{ width: "65rem" }}>
				{this.lookup_panel}
				<CheckboxPanel visible={this.props.holdings.has_data} parent={this} ref={this.checkbox_panel} />
			</div>

			{this.selector_panel}

			{is_null (this.state.data) ? this.empty_data_panel : this.grid_panel}

		</div>
	}// render;


}// HomePage;