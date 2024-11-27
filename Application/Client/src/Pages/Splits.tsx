import StockboyAPI from "Classes/StockboyAPI";
import DataPageControl from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { EditSplitForm } from "Forms/EditSplitForm";
import { SplitListModel } from "Models/Splits";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray (["broker", "company", {symbol: "Tickers"}, "previous", "current", "split_date"]),
	date_fields: ["split_date"],
	numeric_fields: ["previous", "current"]
}// properties;


type SplitList = Array<SplitListModel>


class SplitsPageState {
	data: SplitList = null;
}// SplitsPageState;


export default class SplitsPage extends Component<BaseProps, SplitsPageState> {

	public state: SplitsPageState = new SplitsPageState ();


	public render () {
		return <div className="container">

			<div className="title">Splits</div>

			<DataPageControl data={this.state.data} properties={properties} form={EditSplitForm}
				search_filters={properties.fields} stock_filters={true} table_buttons={true}
				save_command="SaveSplit" delete_command="DeleteSplit" data_type="Splits">
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		new StockboyAPI ().fetch_data ("GetSplits").then ((result: SplitList) => this.setState ({ data: result }));
	}// constructor;

}// SplitsPage;
