import StockboyAPI from "Classes/StockboyAPI";
import EditList from "Controls/Common/Lists/EditList";

import { NameValueArray, NameValuePair } from "Classes/Common/Collections";
import { IDModel } from "Models/Abstract/BaseModels";
import { TickersDataModel } from "Models/Tickers";
import { Component } from "react";


let debugging: boolean = true;


const test_data: TickersDataModel = {

	id: null,

	name: "Pennant Investment",
	symbol: "PNNT",

}// test_data;


class TickerModel extends NameValuePair { public symbol: string = null }


type TickerArray = Array<TickerModel>


class TickersFormProps {
	data?: TickersDataModel;
}// TickersFormProps;


class TickersFormState {
	tickers: TickerArray = null;
	symbol: string = null;
}// TickersFormState;


export default class EditTickersForm extends Component<TickersFormProps, TickersFormState> {

	private ticker_list (): NameValueArray {

		let result: NameValueArray = null;

		this.state?.tickers?.forEach ((ticker: TickerModel) => {

			let item = new NameValuePair (ticker.name, ticker.value);

			if (is_null (result)) result = new Array<NameValuePair> ();
			result.push (item);

		});

		return result;

	}// ticker_list;


	private get_selected_item (id: string) {
		
		let ticker: TickerModel = null;

		for (ticker of this.state.tickers) {
			if (ticker.name == id) return ticker;
		}// for;

		return null;

	}// get_selected_item;


	private update_symbol (item: IDModel) {
		let selected_item = this.get_selected_item (item.id);
		if (isset (selected_item)) this.setState ({ symbol: selected_item.symbol });
	}// update_symbol;


	/********/


	public state: TickersFormState = new TickersFormState ();


	public render () {
		return <div className="two-column-grid">
{/*
<div className="outlined">
			<EditList id="tickers_list" name="ticker" data={this.ticker_list ()} 
				value={debugging ? new IDModel (null, test_data.name) : (isset (this.props.data) ? new IDModel (this.props.data.id, this.props.data.name) : null)}
				onChange={(value: IDModel) => this.update_symbol (value)}>
			</EditList>
</div>
*/}
			<input type="hidden" name="id" value={this.props.data.id} />
			<input type="text" name="ticker" defaultValue={debugging ? test_data.name : (isset (this.props.data) ? this.props.data.name : String.Empty)} />
			<input type="text" name="symbol" placeholder="Symbol" style={{ width: "4rem" }} defaultValue={debugging ? test_data.symbol : this.state.symbol} />
		</div>
	}// render;

	constructor (props: TickersFormProps) {
		super (props);
		new StockboyAPI ().fetch_data ("GetTickers").then ((response: TickerArray) => this.setState ({ tickers: response }));
	}// constructor;

}// EditTickersForm;

