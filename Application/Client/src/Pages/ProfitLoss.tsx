import APIClass from "Classes/APIClass";

import DataPageControl from "Controls/DataPageControl";
import StockStatusFilters from "Controls/StockStatusFilters";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";
import { ProfitLossModel } from "Models/Holdings";
import { Component, createRef, RefObject } from "react";
import { DataKey, DataKeyArray } from "../Classes/DataKeys";


const properties: DataTableProperties = {
	fields: new DataKeyArray ("broker", "symbol", "company", "status",
		{ sales_profit: "Sales Profit/Loss"}, 
		{ dividend_payout: "Dividend Payout" },
		"value_profit",
		{ overall_profit: "Overall Profit/Loss" }
	),
	currency_fields: ["sales_profit", "dividend_payout", "value_profit", "overall_profit"],
	total_fields: ["sales_profit", "dividend_payout", "value_profit", "overall_profit"],
	highlighted_fields: ["sales_profit", "dividend_payout", "value_profit", "overall_profit"],
	rounded_fields: [{ sales_profit: 2 }, { dividend_payout: 2 }, { value_profit: 2 }, { overall_profit: 2 }]
}// properties;


type ProfitLossList = Array<ProfitLossModel>

class ProfitLossPageState {
	data: ProfitLossList | string = null;
}// ProfitLossPageState;


export default class ProfitLossPage extends Component<BaseProps, ProfitLossPageState> {

	private data_page: RefObject<DataPageControl> = createRef ();
	private profit_loss_list: ProfitLossList = null;


	private combined_tickers (): ProfitLossList {

		let new_list: ProfitLossList = null;

		this.profit_loss_list.forEach ((profit_loss_item: ProfitLossModel) => {

			if (is_null (new_list)) new_list = new Array<ProfitLossModel> ();

			let item = new_list.find ((item: ProfitLossModel) => item.ticker_id == profit_loss_item.ticker_id);
			
			if (not_set (item)) {
				item = new ProfitLossModel ();
				new_list.push (profit_loss_item);
			}// if;

			Object.keys (profit_loss_item).forEach ((key: String) => {
				let index = key as keyof ProfitLossModel;
				if (Number.isNumber (profit_loss_item [index])) {
					if (not_set ((item as any) [index])) (item as any) [index] = 0;
					return ((item as any) [index]) += profit_loss_item [index];
				}// if;
				(item as any) [index] = profit_loss_item [index];
			});

		});

		return new_list;

	}// combined_tickers;


	private filter_tickers (event: InputChangeEvent) {

		let combined = event.currentTarget.checked;
		let data_list: ProfitLossList = (combined) ? this.combined_tickers () : this.profit_loss_list;

		this.setState ({ data: data_list }, () => {
			switch (combined) {
				case true: properties.fields.remove ("broker"); break;
				default: if (properties.fields.has ("broker")) properties.fields.insert (new DataKey ("broker"), 0); break;
			}// switch;

			this.data_page.current.filter_handler.filter_data ();

		});
	}// filter_tickers;


	public state: ProfitLossPageState = new ProfitLossPageState ();


	public render () {

		return <div className="container">

			<div className="title">Profit and Loss</div>

			<DataPageControl data={this.state.data as ProfitLossList} properties={properties}
				search_filters={properties.fields} stock_filters={true} data_type="Profit and Loss" ref={this.data_page}>
				<div>{isset (this.state.data) ? <div className="column-block">

					<StockStatusFilters data_page={this.data_page.current} />

					<div className="left-aligned two-column-grid checkbox-list with-headspace">
						<input type="checkbox" id="ticker_combine" onChange={(event: InputChangeEvent) => this.filter_tickers (event)} />
						<label>Combine tickers</label>
					</div>

				</div>: null}</div>
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetProfitAndLoss").then ((result: ProfitLossList) => {
			this.profit_loss_list = new Array<ProfitLossModel> ().assign (result, ProfitLossModel);
			this.setState ({ data: this.profit_loss_list });
		});
	}// constructor;

}// ProfitLossPage;