import DataTable from "Controls/Tables/DataTable";

import HoldingsPage, { IHoldingsPage } from "Pages/Abstract/HoldingsPage";

import { RefObject, createRef } from "react";



export default class HomePage extends HoldingsPage implements IHoldingsPage {

	public get grid_panel () {
		return <div className="body">
			<DataTable id="holdings-table" data={this.state.data} parent={this}
				fields={["broker", "symbol", "company", "quantity", "current_price", 
					{ current_purchase_cost: "Purchase Price"}, 
					{ value: "Current Value" }
				]}
				numeric_fields={["quantity"]}
				currency_fields={["current_price", "current_purchase_cost", "value"]}
				total_fields={["cost", "value"]}
				rounded_fields={[{ value: 2 }]}
				keys={["ticker_id", "broker_id"]}>
			</DataTable>
		</div>
	}// grid_panel;

}// HomePage;