import APIClass from "Classes/APIClass";

import DataPageControl from "Controls/DataPageControl";
import StockStatusFilters from "Controls/StockStatusFilters";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { HoldingsModel } from "Models/Holdings";
import { Component, createRef, RefObject } from "react";


export type HoldingsList = Array<HoldingsModel>


const properties: DataTableProperties = {
	keys: ["ticker_id", "broker_id"],
	fields: new DataKeyArray ("broker", "symbol", "company", "status", "quantity", "current_price", { current_purchase_cost: "Purchase Value", value: "Current Value" }),
	numeric_fields: ["quantity"],
	currency_fields: ["current_price", "current_purchase_cost", "value"],
	rounded_fields: [{ value: 2 }],
	total_fields: ["current_purchase_cost", "value"],
}// properties;


class HomePageState {
	data: HoldingsList | string = null;
}// HomePageState;


export default class HomePage extends Component<BaseProps, HomePageState> {

	private data_page: RefObject<DataPageControl> = createRef ();


	/********/


	public state: HomePageState = new HomePageState ();


	public render () {
		return <div className="container">
			<DataPageControl data={this.state.data as HoldingsList} properties={properties} search_filters={properties.fields} 
				stock_filters={true} table_buttons={false} ref={this.data_page} data_type="Stock Holdings">
				{isset (this.state.data) ? <StockStatusFilters data_page={this.data_page.current} /> : null}
			</DataPageControl>
		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetHoldings").then ((result: HoldingsList) => {
			this.setState ({ data: new Array<HoldingsModel> ().assign (result, HoldingsModel) });
		});
	}// constructor;

}// TransactionsPage;

