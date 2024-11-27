import StockboyAPI from "Classes/StockboyAPI";
import TickerSelector from "Controls/TickerSelector";

import { StockDetailsModel } from "Models/Holdings";
import { Component } from "react";


class StockDetailsPageProps {}


class StockDetailsPageState {
	public broker_id: string = null;
	public ticker_id: string = null;
	public stock_details: StockDetailsModel = null;
}// StockDetailsPageState;


export default class StockDetailsPage extends Component<StockDetailsPageProps, StockDetailsPageState> {

	private select_stock () {
		new StockboyAPI ().fetch_data ("GetStockDetails", { 
			broker_id: this.state.broker_id, 
			ticker_id: this.state.ticker_id 
		}).then (result => this.setState ({ stock_details: new StockDetailsModel ().assign (result) }));
	}// select_stock;


	/********/


	public state: StockDetailsPageState = new StockDetailsPageState ();


	public render () {
		return <div>
		
			<TickerSelector allow_all={false}
				onBrokerChange={(broker_id: string) => this.setState ({ broker_id }, this.select_stock)}
				onTickerChange={(ticker_id: string) => this.setState ({ ticker_id }, this.select_stock)}>
			</TickerSelector>

			{is_defined (this.state.stock_details) ? <div className="column-block with-lotsa-headspace">

				<div className="centered row-block title">{this.state.stock_details.company}</div>

				<div className="two-column-grid">

					<label>Brokers</label>
					<div className="column-block">{this.state.stock_details.brokers.map ((broker: string) => <div>{broker}</div>)}</div>

					<label>Ticker</label>
					<div>{this.state.stock_details.ticker}</div>

					<label>First Purchased</label>
					<div>{this.state.stock_details.first_purchased as string}</div>

					<label>Last Purchased</label>
					<div>{this.state.stock_details.last_purchased as string}</div>

					<label>First Dividend</label>
					<div>{this.state.stock_details.first_dividend_date as string}</div>

					<label>Last Dividend</label>
					<div>{this.state.stock_details.last_dividend_date as string}</div>

					<label>Next Dividend</label>
					<div>{this.state.stock_details.next_dividend_date as string}</div>

					<label>Dividend Freqency</label>

				</div>
			
			</div> : null}
			
		</div>
	}// render;

}// StockDetailsStockDetailsPage;