import BasePage from "Pages/Abstract/BasePage"
import DataPage from "Controls/DataPage"
import ActivityModel from "Models/ActivityModel"

import { DataTableProperties } from "Controls/Tables/DataTable"
import { ChangeEvent, RefObject, createRef } from "react"
import { BaseProps } from "../Controls/Abstract/BaseProperties"
import { StockModelArray } from "../Models/Abstract/BaseModel"


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
	data: ActivityModelArray = null;
}// ActivityPageState;


export default class ActivityPage extends BasePage<BaseProps, ActivityPageState> {

	private data_page: RefObject<DataPage> = createRef ();
	private data: Array<ActivityModel> = null;

	private get data_control () { return this.data_page.current.data_table_control.current }


	private get_filters (): StringArray {

		let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll ("#checkbox_list input");
		let filter_list: StringArray = null;

		checkboxes.forEach ((checkbox: HTMLInputElement) => {
			if (!checkbox.checked) return;
			if (is_null (filter_list)) filter_list = new Array<string> ();
			filter_list.push (checkbox.value);
		});

		return filter_list;

	}// get_filters;


	private filter_data () {

		let filtered_data: ActivityModelArray = null;

		let filters: StringArray = this.get_filters ();


		function add_item (item: ActivityModel) {
			if (is_null (filtered_data)) filtered_data = new Array<ActivityModel> ();
			filtered_data.push (item);
		}// add_item;


		this.state.data.forEach ((item: ActivityModel) => {
			if ((item.transaction_type == "Buy") && (filters.contains ("buy"))) add_item (item);
			if ((item.transaction_type == "Reinvestment") && (filters.contains ("reinvestment"))) add_item (item);
			if ((item.transaction_type == "Sell") && (filters.contains ("sell"))) add_item (item);
			if ((item.transaction_type == "Dividend") && (filters.contains ("dividend"))) add_item (item);
			if ((item.transaction_type == "Split") && (filters.contains ("split"))) add_item (item);
		});

		this.data_control.setState ({ data: filtered_data });

	}// filter_data;


	private update_data = (data: StockModelArray) => this.setState ({ data: data as ActivityModelArray });


	private get checkbox_list () {
		return <div id="checkbox_list" className="right-aligned two-column-grid checkbox-list">

			<input type="checkbox" id="buy_checkbox" defaultChecked={true} value="buy"
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.filter_data ()} />
			<label htmlFor="buy_checkbox">Buys</label>

			<input type="checkbox" id="reinvestment_checkbox" defaultChecked={true} value="reinvestment"
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.filter_data ()} />
			<label htmlFor="reinvestment_checkbox">Reinvestments</label>

			<input type="checkbox" id="sell_checkbox" defaultChecked={true} value="sell"
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.filter_data ()} />
			<label htmlFor="sell_checkbox">Sales</label>

			<input type="checkbox" id="dividends_checkbox" defaultChecked={true} value="dividend"
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.filter_data ()} />
			<label htmlFor="dividend_checkbox">Dividends</label>

			<input type="checkbox" id="split_checkbox" defaultChecked={true} value="split"
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.filter_data ()} />
			<label htmlFor="split_checkbox">Splits</label>

		</div>
	}// checkbox_list;


	/********/


	public state: ActivityPageState = new ActivityPageState ();


	public render () {
		return <div className="page-layout">

			<div className="title">Activity</div>

			<DataPage name="activity" procedure_name="GetActivities" table_properties={properties} ref={this.data_page}
				required_parameters={["broker_id", "ticker_id"]}
				blank_label="There is no activity" editable={false}
				onDataChange={(data: StockModelArray) => this.update_data (data)}>

				<div>{isset (this.state.data) ? this.checkbox_list : null}</div>

			</DataPage>

		</div>
	}// render;

}// ActivityPage;