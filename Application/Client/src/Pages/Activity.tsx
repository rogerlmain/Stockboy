import APIClass from "Classes/APIClass"

import DataPageControl from "Controls/DataPageControl"
import Eyecandy from "Controls/Eyecandy"
import FilterHandler from "Controls/FilterHandler"
import TableFilters from "Controls/TableFilters"

import { BaseProps } from "Controls/Abstract/BaseProperties"
import { CheckboxFilter, CheckboxFilterList } from "Controls/CheckboxFilterList"
import { DataTableProperties } from "Controls/Tables/DataTable"

import { DataKeyArray } from "Classes/DataKeys"
import { ActivityModel } from "Models/Activity"
import { Component, createRef, RefObject } from "react"


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray ("date", "transaction_type", "broker", "company", "ticker", "quantity", /*"amount",*/ "total_quantity"/*, {total_amount: "Total Cost"}*/),
	date_fields: ["date"],
	numeric_fields: ["quantity", "total_quantity"],
	currency_fields: ["amount", "total_amount"],
//	rounded_fields: [{ cost: 2 }]
}// properties;


type ActivityModelArray = Array<ActivityModel>


class ActivityPageState {
	loading: string = null;
	data: ActivityModelArray = null;
	filter_handler: FilterHandler = null;
}// ActivityPageState;


export default class ActivityPage extends Component<BaseProps, ActivityPageState> {

	private filter_handler: RefObject<FilterHandler> = createRef ();
	private data_page: RefObject<DataPageControl> = createRef ();
	private filter_list: RefObject<CheckboxFilterList> = createRef ();
	private table_filters: RefObject<TableFilters> = createRef ();

	private data: ActivityModelArray = null;


	private update_data = (broker_id: string, ticker_id: string) => this.setState ({ loading: "Loading activity"}, () => {
		APIClass.fetch_data ("GetActivity", { broker_id, ticker_id }).then (response => {

			this.data = new Array<ActivityModel> ().assign (response, ActivityModel);

			this.setState ({ 
				data: response.Duplicate,
				filter_handler: this.filter_handler.current,
				loading: null,
			});

		});
	});


	/********/


	public state: ActivityPageState = new ActivityPageState ();


	public render () {
		return <div className="container">

			<div className="title">Activity</div>

			<FilterHandler data={this.data} parent={this} ref={this.filter_handler} />

			<TableFilters data={this.state.data} search_filters={properties.fields} stock_filters={true}
				onFilterChange={this.update_data} ref={this.table_filters}>
			</TableFilters>

			{isset (this.state.loading) ? <Eyecandy text={this.state.loading} /> : isset (this.state.data) ? <DataPageControl data={this.state.data} properties={properties} 
				stock_filters={false} table_buttons={false} ref={this.data_page} filter_handler={this.state.filter_handler}>

				<div>{isset (this.state.data) ? <CheckboxFilterList id="checkbox_list" ref={this.filter_list}>
					<CheckboxFilter text="Buys" data_page={this.data_page.current} field_name="transaction_type" field_value="Buy" />
					<CheckboxFilter text="Reinvestments" checked={false} data_page={this.data_page.current} field_name="transaction_type" field_value="Reinvestment" />
					<CheckboxFilter text="Sales" data_page={this.data_page.current} field_name="transaction_type" field_value="Sell" />
					<CheckboxFilter text="Dividends" data_page={this.data_page.current} field_name="transaction_type" field_value="Dividend" />
					<CheckboxFilter text="Splits" data_page={this.data_page.current} field_name="transaction_type" field_value="Split" />
				</CheckboxFilterList> : null}</div>

			</DataPageControl> : null}

		</div>
	}// render;

}// ActivityPage;