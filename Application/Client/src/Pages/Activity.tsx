import StockboyAPI from "Classes/StockboyAPI"
import TypedArray from "Classes/TypedArray"

import Eyecandy from "Controls/Common/Eyecandy"
import DataPageControl from "Controls/DataPageControl"
import ActivityFilters from "Controls/Filters/ActivityFilters"
import FilterHandler from "Controls/Filters/FilterHandler"

import { BaseProps } from "Controls/Abstract/BaseProperties"
import { DataTableProperties } from "Controls/Tables/DataTable"

import { DataKeyArray } from "Classes/DataKeys"
import { ActivityModel } from "Models/Activity"
import { Component, createRef, RefObject } from "react"


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray (["transaction_date", "broker", "company", {symbol: "ticker"}, "transaction_type", "quantity", "cost_price", "total_cost", "total_quantity"]),
	date_fields: ["transaction_date"],
	numeric_fields: ["quantity", "total_quantity"],
	currency_fields: ["amount", "total_amount", "price"],
//	rounded_fields: [{ cost: 2 }]
}// properties;


type ActivityList = Array<ActivityModel>


class ActivityPageState {
	loading: boolean = null;
	data: ActivityList = null;
	filter_handler: FilterHandler = null;
}// ActivityPageState;


export default class ActivityPage extends Component<BaseProps, ActivityPageState> {

	private data_page: RefObject<DataPageControl> = createRef ();


	/********/


	public state: ActivityPageState = new ActivityPageState ();


	public render () {
		return <div className="container">

			<div className="title">Activity</div>

			{this.state.loading ? <Eyecandy text="Loading activity..." /> : isset (this.state.data) ? <DataPageControl 
				data={this.state.data} properties={properties} stock_filters={true} table_buttons={false} ref={this.data_page} 
				filter_handler={this.state.filter_handler}>

				{isset (this.state.data) ? <ActivityFilters /> : null}

			</DataPageControl> : null}

		</div>
	}// render;

	constructor (props: BaseProps) {

		super (props);
		this.state.loading = true;

		new StockboyAPI ().fetch_data ("GetActivity").then ((result: ActivityList) => {
			this.setState ({ loading: false }, () => {
				if (is_empty (result)) return;
				this.setState ({ 
					loading: false,
					data: new TypedArray (ActivityModel).assign_values (result) }, () => {
					let x = 0;
				});
			});
		});

	}// constructor;

}// ActivityPage;