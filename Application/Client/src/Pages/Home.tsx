import StockboyAPI from "Classes/StockboyAPI";
import StockStatusFilters from "Controls/Filters/StockStatusFilters";

import Eyecandy from "Controls/Common/Eyecandy";
import DataPageControl from "Controls/DataPageControl";

import { DataKeyArray } from "Classes/DataKeys";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { Container } from "Controls/Common";
import { DataTableContext, DataTableProperties } from "Controls/Tables/DataTable";

import { HoldingsModel, HomeDetailsModel } from "Models/Holdings";

import { Component, createRef, RefObject } from "react";


export type HoldingsList = Array<HoldingsModel>


const properties: DataTableProperties = {
	keys: ["ticker_id", "broker_id"],
	fields: new DataKeyArray (["broker", "company", {symbol: "Ticker"}, "status", "quantity", "current_price", { current_purchase_cost: "Purchase Value", value: "Current Value", profit: "Profit / Loss" }]),
	highlighted_fields: ["profit"],
	numeric_fields: ["quantity"],
	currency_fields: ["current_price", "current_purchase_cost", "value", "profit"],
	rounded_fields: [{ value: 2 }, { profit: 2 }],
	total_fields: ["current_purchase_cost", "value", "profit"],
}// properties;


class HomePageState {
	data: HomeDetailsModel = null;
	loading: boolean = true;
}// HomePageState;


export default class HomePage extends Component<BaseProps, HomePageState> {

	private data_page: RefObject<DataPageControl> = createRef ();


	/********/


	public state: HomePageState = new HomePageState ();


	public load_data (refresh: boolean) {
		return new Promise<void> (resolve => {
			new StockboyAPI ().fetch_data ("GetHoldings", { refresh }).then ((result: HomeDetailsModel) => {
				let data: HomeDetailsModel = new HomeDetailsModel ();
				this.setState ({ 
					loading: false,
					data: data.assign (result) 
				}, () => resolve ());
			});
		});
	}// load_data;


	public render () {
		return <div className="container">

			<div className="somewhat-spaced-out row-block with-headspace with-lotsa-legroom">
{/*
				{this.state.loading ? <Eyecandy text="Loading pending dividends" /> : (isset (this.state.data?.payments_list) ? <div className="column-block with-legroom">
			
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
							<div>{new Date (payment.payment_date).format ("MMMM d, yyyy")}</div>
							<div className="right-aligned row-block">{(payment.amount_per_share * payment.quantity).round_to (4)}</div>
						</div>)}
					</div>

				</div> : <label>No pending dividends</label>)}
*/}
{/*
				{this.state.loading ? <Eyecandy text="Loading monthly dividends" /> : (isset (this.state.data?.monthly_payout) ? <div className="column-block">

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

				</div> : <label>No monthly dividends</label>)}
*/}
			</div>

			{this.state.loading ? <Eyecandy text="Loading holdings" /> : (isset (this.state.data) ? <Container>
				<DataTableContext.Provider value={this}>
					<DataPageControl data={this.state.data?.holdings_list} 
						properties={properties} data_type="Stock Holdings" table_buttons={false} ref={this.data_page} 
						search_filters={properties.fields}>
						<StockStatusFilters />
					</DataPageControl>
				</DataTableContext.Provider>
			</Container> : <label>No stock holdings</label>)}

		</div>
	}// render;


	public constructor (props: BaseProps) {
		super (props);
		this.load_data (false);
	}// constructor;

}// TransactionsPage;
