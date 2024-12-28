import StockboyAPI from "Classes/StockboyAPI";
import DataPageControl from "Controls/DataPageControl";
import EditDividendForm from "Forms/EditDividendForm";
import StockStatusFilters from "Controls/StockStatusFilters";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { DividendListModel } from "Models/Dividends";
import { Component } from "react";
import Eyecandy from "Controls/Common/Eyecandy";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray (["broker", "company", "ticker", "issue_date", "amount_per_share", "share_quantity", {payout: "Total Payout"}]),
	date_fields: ["issue_date"],
	numeric_fields: ["share_quantity"],
	currency_fields: ["amount_per_share", "payout"],
	total_fields: ["payout"]
}// properties;


type DividendList = Array<DividendListModel>;


class DividendsPageState {
	data: DividendList = null;
	loading: boolean = false;
}// DividendsPageState;


export default class DividendsPage extends Component<BaseProps, DividendsPageState> {

	public state: DividendsPageState = new DividendsPageState ();


	public render () {
		return <div className="container">

			<div className="title">Dividends</div>

			{this.state.loading ? <Eyecandy text="Loading dividends" /> : <DataPageControl data={this.state.data} 
				properties={properties} data_type="dividends"
				table_buttons={true} form={EditDividendForm} search_filters={properties.fields} stock_filters={true}
				save_command="SaveDividend" delete_command="DeleteDividend" date_filter_field="issue_date" parent={this}>

				{isset (this.state.data) ? <StockStatusFilters /> : null}

			</DataPageControl>}

		</div>
	}// render;


	constructor (props: BaseProps) {

		super (props);

		this.state.loading = true;

		new StockboyAPI ().fetch_data ("GetDividends").then ((result: DividendList) => {

			if (not_defined (result)) return;

			this.setState ({ 
				data: new Array<DividendListModel> ().assign (result, DividendListModel), 
				loading: false
			});

		});

	}// constructor;

}// DividendsPage;