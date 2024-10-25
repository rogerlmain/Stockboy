import CheckboxPanel from "Controls/CheckboxPanel";
import Link from "Controls/Link";
import DataTable from "Controls/Tables/DataTable";
import TickerSelector from "Controls/TickerSelector";

import HoldingsData, { HoldingsModel } from "Classes/HoldingsData";

import { MainPageContext } from "Classes/Contexts";
import { DataControl, DataProps, DataState } from "Controls/Abstract/DataControl";
import { PageType } from "Pages/Main";
import { RefObject, createRef } from "react";


export interface IHoldingsPage {
	get grid_panel ();
}// IHoldingsPage;


export class HoldingsProps extends DataProps {
	holdings: HoldingsData = null;
}// HoldingsProps;


export class HoldingsState extends DataState<HoldingsModel> {
	active_ticker: string = null;
}// HoldingsState;


export default abstract class HoldingsPage extends DataControl<HoldingsProps, HoldingsState> implements IHoldingsPage {

	protected checkbox_panel: RefObject<CheckboxPanel> = createRef ();


	protected lookup_stock = () => alert (`looking up ${this.state.active_ticker}`);


	protected get empty_data_panel () {
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


	protected get lookup_panel () {

		if (is_null (this.state.data)) return;

		return <div style={{ display: "inline-block" }}>
			<div className="miniform">
				<input type="text" id="stock_ticker" onChange={event => this.setState ({active_ticker: event.target.value })} />
				<button id="stock_lookup_button" onClick={() => this.lookup_stock ()}>Lookup</button>
			</div>
		</div>

	}// lookup_panel;


	protected get selector_panel () {
		return <form>
			<div className="wide-column-spaced column-centered row-block margin">
				<TickerSelector id="ticker_selector"
					broker_id={this.state.broker_id} ticker_id={this.state.ticker_id}
					onBrokerChange={(value: string) => this.setState ({ broker_id: value })}
					onTickerChange={(value: string) => this.setState ({ ticker_id: value })}>
				</TickerSelector>
			</div>
		</form>
	}// selector_panel;


	/********/


	public state: HoldingsState = new HoldingsState ();


	public abstract get grid_panel ();


	public update_list (filters: HoldingsFilterList) {
		this.setState ({ data: this.props.holdings.list (filters, this.state.broker_id, this.state.ticker_id) });
	}// componentDidUpdate;


	public componentDidUpdate (props?: HoldingsProps, state?: HoldingsState) {
		if ((this.props.holdings != props?.holdings) ||
			(this.state.broker_id != state?.broker_id) ||
			(this.state.ticker_id != state?.ticker_id)) 
		this.update_list (this.checkbox_panel.current.state.filters);
	}// componentDidUpdate;


	public componentDidMount = () => this.componentDidUpdate ();


	public render () {
		return isset (this.props.holdings) ? <div className="page-layout">

			<div className="title">Overview</div>

			<div className={`${isset (this.state.data) ? "horizontally-spaced-out row-centered" : "right-aligned"}`} style={{ width: "65rem" }}>
				{this.lookup_panel}
				<CheckboxPanel visible={this.props.holdings.has_data} parent={this} ref={this.checkbox_panel} />
			</div>

			{this.selector_panel}

			{is_null (this.state.data) ? this.empty_data_panel : this.grid_panel}

		</div> : null
	}// render;


}// HoldingsPage;