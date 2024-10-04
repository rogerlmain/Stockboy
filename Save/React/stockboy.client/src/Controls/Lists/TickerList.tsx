import APIClass from "Controls/Abstract/APIClass";
import SelectList, { SelectListProps } from "Controls/Lists/SelectList";
import Eyecandy from "Controls/Eyecandy";

import ListModel from "Models/ListModel";

import { DataControl, DataState } from "Controls/Abstract/DataControls";
import { BaseProps } from "Controls/BaseComponent";
import { TickerModel } from "Models/TickerModel";


class TickerListProps extends SelectListProps {
	broker_id?: string = null;
}// TickerListProps;


class TickerListState extends DataState<ListModel> {
	loading: boolean = false;
}// TickerListState;


export default class TickerList extends DataControl<TickerListProps, TickerListState> {

	public state: TickerListState = new TickerListState ();

	public load_tickers () {
		this.setState ({ loading: true }, () => APIClass.fetch_data ("GetTickers", { broker_id: this.props.broker_id }).then ((response: Array<TickerModel>) => {

			let tickers: Array<ListModel> = null;

			response.forEach (row => {
				if (is_null (tickers)) tickers = new Array<ListModel> ();
				tickers.push ({ 
					id: row.id,
					name: `${row.name} (${row.symbol})`
				});
			});
			this.setState ({ data: tickers });
		}));
	}// load_tickers;


	public constructor (props: TickerListProps) {
		super (props);
	}// constructor;


	public render = () => is_null (this.state.loading) ? <Eyecandy text="Loading..." /> : <SelectList id="ticker_list" name={this.props.name} 
		items={this.state.data} selected_item={this.props.selected_item} 
		header={this.props.header || "Select Ticker"} 
		disabled = {is_null (this.state.data)}>
	</SelectList>

}// TickerList;