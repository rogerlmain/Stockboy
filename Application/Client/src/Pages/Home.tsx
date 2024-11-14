import APIClass from "Classes/APIClass";

import DataPageControl from "Controls/DataPageControl";
import StockStatusFilters from "Controls/StockStatusFilters";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { DividendPayment, DividendPayoutItem } from "Models/Dividends";
import { HoldingsModel, HomeDetailsModel } from "Models/Holdings";
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
	data: HomeDetailsModel = null;
}// HomePageState;


export default class HomePage extends Component<BaseProps, HomePageState> {

	private data_page: RefObject<DataPageControl> = createRef ();


	/********/


	public state: HomePageState = new HomePageState ();


	public render () {
		return <div className="container">

			<div className="somewhat-spaced-out row-block with-headspace with-lotsa-legroom">

				{isset (this.state.data?.payments_list) ? <div className="column-block with-legroom">
			
					<div className="title">Upcoming Dividend Payments</div>
				
					<div className="data-table" style={{ gridTemplateColumns: "repeat(4, min-content)" }}>
						<div className="table-header">
							<div>Company</div>
							<div>Ticker</div>
							<div>Payment Date</div>
							<div>Projected Amount</div>
						</div>
				
						{this.state.data?.payments_list?.map ((payment: DividendPayment) => <div className="table-row">
							<div>{payment.company}</div>
							<div>{payment.ticker}</div>
							<div>{payment.payment_date as String}</div>
							<div className="right-aligned row-block">{(payment.amount_per_share * payment.quantity).round_to (4)}</div>
						</div>)}
					</div>

				</div> : null}

				{isset (this.state.data?.monthly_payout) ? <div className="column-block">

					<div className="title">Monthly Dividend Payments</div>
				
					<div className="data-table" style={{ gridTemplateColumns: "repeat(3, min-content)" }}>
						<div className="table-header">
							<div>Company</div>
							<div>Ticker</div>
							<div>Monthly Amount</div>
						</div>
						{this.state.data?.monthly_payout.payouts.map ((payout: DividendPayoutItem) => <div className="table-row">
							<div>{payout.company}</div>
							<div>{payout.ticker}</div>
							<div className="right-aligned row-block">{payout.amount.round_to (4)}</div>
						</div>)}
					</div>

					<div className="somewhat-spaced-out centered row-block with-headspace">
						<label>Total monthly dividend</label>
						<div>${this.state.data.monthly_payout.total.round_to (4)}</div>
					</div>

				</div> : null}

			</div>

			<DataPageControl data={this.state.data?.holdings_list} properties={properties} search_filters={properties.fields} 
				stock_filters={true} table_buttons={false} ref={this.data_page} data_type="Stock Holdings">
				{isset (this.state.data) ? <StockStatusFilters data_page={this.data_page.current} /> : null}
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {

		super (props);

		APIClass.fetch_data ("GetHoldings").then ((result: HomeDetailsModel) => {
			this.setState ({ data: new HomeDetailsModel ().assign (result)});
		});

	}// constructor;

}// TransactionsPage;

