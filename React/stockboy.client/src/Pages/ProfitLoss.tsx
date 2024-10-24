import CheckboxPanel from "Controls/CheckboxPanel";
import DataTable from "Controls/Tables/DataTable";

import HoldingsPage, { HoldingsProps } from "Pages/Abstract/HoldingsPage";
import HoldingsData, { HoldingsModel } from "Classes/HoldingsData";

import { HoldingsDataContext } from "Classes/Contexts";
import { DataState } from "Controls/Abstract/DataControl";
import { Context } from "react";
import ProfitLossData, { ProfitLossModel } from "../Classes/ProfitLossData";


class ProfitLossState extends DataState<HoldingsModel> {}


export default class ProfitLossPage extends HoldingsPage<HoldingsProps, ProfitLossState> {


	public state: ProfitLossState = new ProfitLossState ();


	public render () {

		if (is_null (this.props.holdings)) return null;

		return <div className="page-layout">

			<div className="with-legroom">
				<div className="title">Profits and Losses</div>
				<CheckboxPanel visible={true} parent={this} ref={this.checkbox_panel} />
			</div>

			{isset (this.state.data) ? <DataTable id="holdings-table" data={this.state.data} parent={this}
				fields={["broker", "symbol", "company", 
					{ sales_profit: "Sales Profit/Loss"}, 
					{ dividend_payout: "Dividend Payout" },
					"value_profit",
					{ overall_profit: "Overall Profit/Loss" }
				]}
				currency_fields={["sales_profit", "dividend_payout", "value_profit", "overall_profit"]}
				total_fields={["sales_profit", "dividend_payout", "value_profit", "overall_profit"]}
				highlighted_fields={["sales_profit", "dividend_payout", "value_profit", "overall_profit"]}
				rounded_fields={[{ value: 2 }]}
				keys={["ticker_id", "broker_id"]}>
			</DataTable> : <div>No options chosen</div>}

		</div>
	}// render;


}// ProfitLossPage;