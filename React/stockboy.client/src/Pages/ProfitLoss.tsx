import CheckboxPanel from "Controls/CheckboxPanel";
import DataTable from "Controls/Tables/DataTable";
import TickerSelector from "Controls/TickerSelector";

import HoldingsPage, { HoldingsProps, HoldingsState } from "Pages/Abstract/HoldingsPage";

import { HoldingsModel } from "Classes/HoldingsData";
import { DataState } from "Controls/Abstract/DataControl";


export default class ProfitLossPage extends HoldingsPage {


	public get grid_panel () {
		return <div className="body">
			<DataTable id="holdings-table" data={this.state.data} parent={this}
				fields={["broker", "symbol", "company", 
					{ sales_profit: "Sales Profit/Loss"}, 
					{ dividend_payout: "Dividend Payout" },
					"value_profit",
					{ overall_profit: "Overall Profit/Loss" }
				]}
				currency_fields={["sales_profit", "dividend_payout", "value_profit", "overall_profit"]}
				total_fields={["sales_profit", "dividend_payout", "value_profit", "overall_profit"]}
				highlighted_fields={["sales_profit", "dividend_payout", "value_profit", "overall_profit"]}
				rounded_fields={[{ sales_profit: 2 }, { dividend_payout: 2 }, { value_profit: 2 }, { overall_profit: 2 }]}
				keys={["ticker_id", "broker_id"]}>
			</DataTable>
		</div>
	}// grid_panel;


}// ProfitLossPage;