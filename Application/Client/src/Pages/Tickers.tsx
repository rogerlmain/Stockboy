import APIClass from "Classes/APIClass";
import DataPageControl from "Controls/DataPageControl";
import EditTickersForm from "Forms/EditTickersForm";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { TickersListModel } from "Models/Tickers";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray ("symbol", "name", "price", "volume", "last_payment_date", "next_payment_date"),
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
				search_filter={true} table_buttons={true} form={EditTickersForm}
				save_command="SaveTicker" delete_command="DeleteTicker" data_type="Tickers">
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetTickers").then ((result: TickersList) => this.setState ({ data: result }));
	}// constructor;

}// TickersPage;