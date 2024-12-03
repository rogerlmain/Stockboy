import StockboyAPI from "Classes/StockboyAPI";
import Eyecandy from "Controls/Common/Eyecandy";
import EditTickersForm from "Forms/EditTickersForm";

import DataPageControl, { ButtonAlignment } from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { TickersListModel } from "Models/Tickers";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray (["symbol", "name", "price", "volume", "last_payment_date", "next_payment_date"]),
}// properties;


type TickersList = Array<TickersListModel>


class TickersPageState {
	data: TickersList = null;
	form_visible: boolean = false;
	loading: boolean = false;
}// TickersPageState;


export default class TickersPage extends Component<BaseProps, TickersPageState> {

	public static defaultProps: BaseProps = { id: null }


	public state: TickersPageState = new TickersPageState ();


	public update_data (): Promise<Boolean> {
		return new Promise<Boolean> ((resolve: Function) => {
			new StockboyAPI ().fetch_data ("GetUserTickers").then ((response: TickersList) => {
				if (not_empty (response)) this.setState ({ data: response }, () => resolve (true));
				this.setState ({ loading: false });
			});
		});
	}// update_data;


	public render () {
		return <div className="container">

			<div className="title">Tickers</div>

			{this.state.loading ? <Eyecandy text="Loading tickers" /> : <DataPageControl data={this.state.data} 
				properties={properties} align_buttons={ButtonAlignment.center} parent={this}
				search_filters={properties.fields} table_buttons={true} data_type="Tickers" form={EditTickersForm}
				save_command="SaveTicker" delete_command="DeleteTicker">
			</DataPageControl>}

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		this.update_data ();
	}// constructor;

}// TickersPage;