import BaseControl from "Controls/Abstract/BaseControl";
import HoldingsPage, { HoldingsProps } from "Pages/Abstract/HoldingsPage";

import { HoldingsFilter, HoldingsModel } from "Classes/HoldingsData";
import { DataState } from "Controls/Abstract/DataControl";
import { ChangeEvent } from "react";


class CheckboxPanelProps {
	visible: boolean = false;
	parent: HoldingsPage<HoldingsProps, DataState<HoldingsModel>> = null;
}// CheckboxPanelProps;


class CheckboxPanelState {
	filters: HoldingsFilterList = new Array<HoldingsFilter> (HoldingsFilter.live);
}// CheckboxPanelState;


export default class CheckboxPanel extends BaseControl<CheckboxPanelProps, CheckboxPanelState> {

	private set_filter (filter: HoldingsFilter, value: boolean) {

		let filters: Array<HoldingsFilter> = Object.assign (new Array<HoldingsFilter> (), this.state.filters);

		switch (value) {
			case true: filters.add (filter); break;
			default: filters.remove (filter); break;
		}// switch;

		this.setState ({ filters: not_defined (filters) ? null : filters }, () => this.props.parent.update_list (this.state.filters));

	}// set_filter;


	/********/


	public state: CheckboxPanelState = new CheckboxPanelState ();


	public render () {
		if (!this.props.visible) return;

		return <div className="two-column-grid checkbox-list">
			<input type="checkbox" id="live_stock_checkbox"
				defaultChecked={this.state.filters?.contains (HoldingsFilter.live)}
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.set_filter (HoldingsFilter.live, event.target.checked)}>
			</input>
			<label htmlFor="live_stock_checkbox">Show live stocks</label>

			<input type="checkbox" id="dead_stock_checkbox"
				defaultChecked={this.state.filters?.contains (HoldingsFilter.dead)}
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.set_filter (HoldingsFilter.dead, event.target.checked)}>
			</input>
			<label htmlFor="dead_stock_checkbox">Show dead stocks</label>

			<input type="checkbox" id="defunct_stock_checkbox"
				defaultChecked={this.state.filters?.contains (HoldingsFilter.defunct)}
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.set_filter (HoldingsFilter.defunct, event.target.checked)}>
			</input>
			<label htmlFor="defunct_stock_checkbox">Show defunct stocks</label>

		</div>
	}// render;

}// CheckboxPanel;