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
	fields: new DataKeyArray (["date", "broker", "company", "ticker", "transaction_type", "quantity", "price", /*"amount",*/ "total_quantity"/*, {total_amount: "Total Cost"}*/]),
	date_fields: ["date"],
	numeric_fields: ["quantity", "total_quantity"],
	currency_fields: ["amount", "total_amount", "price"],
//	rounded_fields: [{ cost: 2 }]
}// properties;


type ActivityModelArray = Array<ActivityModel>


class ActivityPageState {
	loading: string = null;
	data: ActivityModelArray = null;
	filter_handler: FilterHandler = null;
}// ActivityPageState;


export default class ActivityPage extends Component<BaseProps, ActivityPageState> {

	private data_page: RefObject<DataPageControl> = createRef ();


	/********/


	public state: ActivityPageState = new ActivityPageState ();


	public render () {
		return <div className="container">

			<div className="title">Activity</div>

			{isset (this.state.loading) ? <Eyecandy text={this.state.loading} /> : isset (this.state.data) ? <DataPageControl data={this.state.data} properties={properties} 
				stock_filters={false} table_buttons={false} ref={this.data_page} filter_handler={this.state.filter_handler}>

				{isset (this.state.data) ? <ActivityFilters /> : null}

			</DataPageControl> : null}

		</div>
	}// render;

}// ActivityPage;