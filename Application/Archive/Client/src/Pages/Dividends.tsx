import APIClass from "Classes/APIClass";
import DataPageControl from "Controls/DataPageControl";
import EditDividendForm from "Forms/EditDividendForm";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { DividendListModel } from "Models/Dividends";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray ("broker", "company", "ticker", "issue_date", "amount_per_share", "share_quantity", {payout: "Total Payout"}),
	date_fields: ["issue_date"],
	numeric_fields: ["share_quantity"],
	currency_fields: ["amount_per_share", "payout"],
	total_fields: ["payout"]
}// properties;


type DividendList = Array<DividendListModel>;


class DividendsPageState {
	data: DividendList = null;
}// DividendsPageState;


export default class DividendsPage extends Component<BaseProps, DividendsPageState> {

	public state: DividendsPageState = new DividendsPageState ();


	public render () {
		return <div className="container">

			<div className="title">Dividends</div>

			<DataPageControl data={this.state.data} properties={properties} form={EditDividendForm}
				search_filters={properties.fields} stock_filters={true} table_buttons={true}
				save_command="SaveDividend" delete_command="DeleteDividend">
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetDividends").then ((result: DividendList) => {
			this.setState ({ data: new Array<DividendListModel> ().assign (result, DividendListModel) })
		});
	}// constructor;

}// DividendsPage;