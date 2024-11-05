import APIClass from "Classes/APIClass"
import DataPageControl from "Controls/DataPageControl"

import { BaseProps } from "Controls/Abstract/BaseProperties"
import { CheckboxFilter, CheckboxFilterList } from "Controls/CheckboxFilterList"
import { DataTableProperties } from "Controls/Tables/DataTable"

import { ActivityModel } from "Models/Activity"
import { Component, createRef, RefObject } from "react"


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["date", "transaction_type", "broker", "company", "ticker", "quantity", /*"amount",*/ "total_quantity"/*, {total_amount: "Total Cost"}*/],
	date_fields: ["date"],
	numeric_fields: ["quantity", "total_quantity"],
	currency_fields: ["amount", "total_amount"],
//	rounded_fields: [{ cost: 2 }]
}// properties;


type ActivityModelArray = Array<ActivityModel>


class ActivityPageState {
	loading: string = null;
	data: ActivityModelArray = null;
}// ActivityPageState;


export default class ActivityPage extends Component<BaseProps, ActivityPageState> {

	private data_page: RefObject<DataPageControl> = createRef ();
	private filter_list: RefObject<CheckboxFilterList> = createRef ();


	private update_data = (broker_id: string, ticker_id: string) => this.setState ({ loading: "Loading activity"}, () => {
		APIClass.fetch_data ("GetActivity", { broker_id, ticker_id }).then (response => {
			this.setState ({ 
				data: response,
				loading: null,
			}, () => this.filter_list.current.update_filters ())
		});
	});


	private get checkbox_list () {
		return <CheckboxFilterList id="checkbox_list" ref={this.filter_list}>
			<CheckboxFilter text="Buys" data_page={this.data_page.current} field_name="transaction_type" field_value="buy" />
			<CheckboxFilter text="Reinvestments" data_page={this.data_page.current} field_name="transaction_type" field_value="reinvestment" />
			<CheckboxFilter text="Sales" data_page={this.data_page.current} field_name="transaction_type" field_value="sell" />
			<CheckboxFilter text="Dividends" data_page={this.data_page.current} field_name="transaction_type" field_value="dividend" />
			<CheckboxFilter text="Splits" data_page={this.data_page.current} field_name="transaction_type" field_value="split" />
		</CheckboxFilterList>
	}// checkbox_list;


	/********/


	public state: ActivityPageState = new ActivityPageState ();


	public render () {
		return <div className="container">

			<div className="title">Activity</div>

			<DataPageControl data={this.state.data} properties={properties} ref={this.data_page}
				search_filter={true} stock_filters={true} table_buttons={false} onFilterChange={this.update_data}>
				<div>{isset (this.state.data) ? this.checkbox_list : null}</div>
			</DataPageControl>

		</div>
	}// render;

}// ActivityPage;