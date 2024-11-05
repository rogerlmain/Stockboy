import APIClass from "Classes/APIClass";
import DataPageControl from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";
import { TickersListModel } from "Models/Tickers";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["symbol", "name", "price", "volume", "last_payment_date", "next_payment_date"]
}// properties;


type TickersList = Array<TickersListModel>


class TickersPageState {
	data: TickersList = null;
	form_visible: boolean = false;
}// TickersPageState;


export default class TickersPage extends Component<BaseProps, TickersPageState> {

	public static defaultProps: BaseProps = { id: null }


	public state: TickersPageState = new TickersPageState ();


	public render () {
		return <div className="container">

			<div className="title">Tickers</div>

			<DataPageControl data={this.state.data} properties={properties} 
				search_filter={true} table_buttons={true}
				save_command="SaveTicker" delete_command="DeleteTicker" data_type="Tickers">

				<form style={{ display: `${this.state.form_visible ? "flex" : "none"}` }}>
					<div className="two-column-grid">
						<input type="text" name="name" placeholder="Name" />
						<input type="text" name="symbol" placeholder="Symbol" style={{ width: "4rem" }} />
						<select name="dividend_frequency">
							<option value={String.Empty}>Dividend Frequency</option>
							<option value="1">Monthly</option>
							<option value="3">Quarterly</option>
							<option value="12">Annually</option>
						</select>
						<input type="date" name="last_paid" placeholder="Last paid" />
					</div>
				</form>

			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetTickers").then ((result: TickersList) => this.setState ({ data: result }));
	}// constructor;

}// TickersPage;