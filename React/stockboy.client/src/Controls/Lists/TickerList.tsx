import DataControl, { DataState } from "Controls/Abstract/DataControl";
import APIClass from "Controls/Abstract/APIClass";
import SelectList, { SelectListProps } from "Controls/Lists/SelectList";
import Eyecandy from "Controls/Eyecandy";

import ListModel from "Models/ListModel";

import { BaseProps } from "Controls/BaseComponent";
import { TickerModel } from "Models/TickersModel";


export default class TickerList extends DataControl<SelectListProps> {

	public state: DataState<ListModel> = new DataState<ListModel> ();


	public constructor (props: SelectListProps) {

		super (props);

		APIClass.fetch_data ("GetTickers").then ((response: Array<TickerModel>) => {

			let tickers: Array<ListModel> = null;

			response.forEach (row => {
				if (is_null (tickers)) tickers = new Array<ListModel> ();
				tickers.push ({ 
					id: row.id,
					name: `${row.name} (${row.symbol})`
				});
			});
			this.setState ({ data: tickers });
		});

	}// constructor;


	public render = () => is_null (this.state.data) ? <Eyecandy text="Loading..." /> : <SelectList id="ticker_list" name={this.props.name} 
		items={this.state.data} selected_item={this.props.selected_item} header="Select Ticker">
	</SelectList>

}// TickerList;