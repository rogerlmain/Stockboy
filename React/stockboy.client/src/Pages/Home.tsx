import Link from "Controls/Link";
import DataTable from "Controls/Tables/DataTable";
import TickerSelector from "Controls/TickerSelector";

import TransactionsPage from "Pages/Transactions";

import HoldingsData, { HoldingsFilter, HoldingsFilterList, HoldingsModel } from "Classes/HoldingsData";

import { HoldingsDataContext, MainPageContext } from "Classes/Contexts";
import { DataControl, DataProps, DataState } from "Controls/Abstract/DataControl";
import { ChangeEvent, Context, RefObject, createRef } from "react";
import InputElement from "../Controls/InputElement";


class HomeState extends DataState<HoldingsModel> {
	active_ticker: String = null;
	filters: HoldingsFilterList = null;//new Array<HoldingsFilter> (HoldingsFilter.live);
}// HomeState;


export default class HomePage extends DataControl<DataProps, HomeState> {

	private data_table: RefObject<DataTable> = createRef ();


	private lookup_stock = () => alert (`looking up ${this.state.active_ticker}`);
	private get holdings (): HoldingsData { return (this.context as HoldingsData) }


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
		return <form>
			<div className="wide-column-spaced column-centered row-block margin">
				<TickerSelector id="ticker_selector"
					broker_id={this.state.broker_id}
					ticker_id={this.state.ticker_id}>
				</TickerSelector>
			</div>
		</form>
	}// filter_panel;


	private get checkbox_panel () {
		return <div className="two-column-grid">
			<InputElement id="live_stock_checkbox" label="Show live stocks">
				<input type="checkbox"
					defaultChecked={this.state.filters?.contains (HoldingsFilter.live)}
					onChange={(event: ChangeEvent<HTMLInputElement>) => this.set_filter (HoldingsFilter.live, event.target.checked)}>
				</input>
			</InputElement>

			<InputElement id="dead_stock_checkbox" label="Show dead stocks">
				<input type="checkbox"
					defaultChecked={this.state.filters?.contains (HoldingsFilter.dead)}
					onChange={(event: ChangeEvent<HTMLInputElement>) => this.set_filter (HoldingsFilter.dead, event.target.checked)}>
				</input>
			</InputElement>

			<InputElement id="defunct_stock_checkbox" label="Show defunct stocks">
				<input type="checkbox"
					defaultChecked={this.state.filters?.contains (HoldingsFilter.defunct)}
					onChange={(event: ChangeEvent<HTMLInputElement>) => this.set_filter (HoldingsFilter.defunct, event.target.checked)}>
				</input>
			</InputElement>

		</div>
	}// checkbox_panel;


	private get empty_data_panel () {
		return <div className="column-centered">
			No stock information available<br />
			<br />
			<div className="row-centered">To add stock purchases,&nbsp;
				<MainPageContext.Consumer>
					{main_page => <Link command={() => main_page.change_page (<TransactionsPage />)} text="click here" />}
				</MainPageContext.Consumer>
			</div>
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


	private set_filter (filter: HoldingsFilter, value: boolean) {

		let filters: Array<HoldingsFilter> = Object.assign (new Array<HoldingsFilter> (), this.state.filters);

		switch (value) {
			case true: filters.add (filter); break;
			default: filters.remove (filter); break;
		}// switch;

		this.setState ({ filters: not_defined (filters) ? null : filters });

	}// set_filter;


	/********/



	public state: HomeState = new HomeState ();


	public static contextType: Context<HoldingsData> = HoldingsDataContext;


	public componentDidUpdate (previous_props: DataProps, previous_state: HomeState) {
		if (this.state.filters != previous_state.filters) this.setState ({ data: this.holdings.list (this.state.filters) });
	}// componentDidUpdate;


	public componentDidMount () {
		this.setState ({ data: this.holdings.list (this.state.filters) });
	}// componentDidMount;


	public render () {

		return <div className="page-layout">

			{isset (this.holdings.list) ? <div>

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