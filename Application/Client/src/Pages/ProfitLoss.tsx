import APIClass from "Classes/APIClass";

import DataPageControl from "Controls/DataPageControl";
import StockStatusFilters from "Controls/StockStatusFilters";

import { ProfitLossModel } from "Classes/ProfitLossData";
import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";
import { Component, createRef, RefObject } from "react";


const properties: DataTableProperties = {
	fields: ["broker", "symbol", "company", 
		{ sales_profit: "Sales Profit/Loss"}, 
		{ dividend_payout: "Dividend Payout" },
		"value_profit",
		{ overall_profit: "Overall Profit/Loss" }
	],
	currency_fields: ["sales_profit", "dividend_payout", "value_profit", "overall_profit"],
	total_fields: ["sales_profit", "dividend_payout", "value_profit", "overall_profit"],
	highlighted_fields: ["sales_profit", "dividend_payout", "value_profit", "overall_profit"],
	rounded_fields: [{ sales_profit: 2 }, { dividend_payout: 2 }, { value_profit: 2 }, { overall_profit: 2 }],
	keys: ["ticker_id", "broker_id"],
}// properties;


type ProfitLossList = Array<ProfitLossModel>


class ProfitLossPageState {
	data: ProfitLossList | string = null;
}// ProfitLossPageState;


export default class ProfitLossPage extends Component<BaseProps, ProfitLossPageState> {

	private data_page: RefObject<DataPageControl> = createRef ();


	public state: ProfitLossPageState = new ProfitLossPageState ();


	public render () {

		return <div className="container">

			<div className="title">Profit and Loss</div>

			<DataPageControl data={this.state.data as ProfitLossList} properties={properties}
				data_type="Profit and Loss" ref={this.data_page}>
				<div>{isset (this.state.data) ? <StockStatusFilters data_page={this.data_page.current} /> : null}</div>
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetProfitAndLoss").then ((result: ProfitLossList) => {
			this.setState ({ data: new Array ().assign (result, ProfitLossModel) });
		});
	}// constructor;


}// ProfitLossPage;