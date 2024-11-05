import APIClass from "Classes/APIClass";
import DataPageControl from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { EditSplitForm } from "Forms/EditSplitForm";
import { SplitListModel } from "Models/Splits";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "company", "symbol", "previous", "current", "split_date"],
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
				search_filter={true} stock_filters={true} table_buttons={true}
				save_command="SaveSplit" delete_command="DeleteSplit" data_type="Splits"
				invisible_fields={new SplitListModel ().constructor.prototype.invisible_fields}>
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetSplits").then ((result: SplitList) => this.setState ({ data: result }));
	}// constructor;

}// SplitsPage;
