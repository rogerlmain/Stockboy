import APIClass from "Classes/APIClass";
import TickerSelector from "Controls/TickerSelector";

import { StockDetailsModel } from "Models/Holdings";
import { Component, ReactElement } from "react";


class StockDetailsPageProps {}


class StockDetailsPageState {
	public broker_id: string = null;
	public ticker_id: string = null;
	public stock_details: StockDetailsModel = null;
}// StockDetailsPageState;


export default class StockDetailsPage extends Component<StockDetailsPageProps, StockDetailsPageState> {

	private select_stock () {
		APIClass.fetch_data ("GetStockDetails", { 
			broker_id: this.state.broker_id, 
			ticker_id: this.state.ticker_id 
		}).then (result => {

			let details = new StockDetailsModel ().assign (result);

			details.first_purchased = new Date (details.first_purchased);
			details.last_purchased = new Date (details.last_purchased);
			this.setState ({ stock_details: details });

		});
	}// select_stock;


	private get_value (key: string): ReactElement {

		if (key == "brokers") return <div className="column-block">{this.state.stock_details [key].map ((broker: string) => <div>{broker}</div>)}</div>;
		if (is_null (this.state.stock_details [key])) return <div>N/A</div>

		switch (this.state.stock_details [key].GetType) {
			case Date: return <div>{this.state.stock_details [key].format ("MMMM d, yyyy")}</div>
		}// switch;
		
		return <div>{this.state.stock_details [key]}</div>

	}// get_value;


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

				<div className="two-column-grid">{
					Object.keys (this.state.stock_details).map ((key: string) => {

						if (key == "company") return;

						return <div className="container">
							<label>{key.titleCase ()}</label>
							{this.get_value (key)}
						</div>

					})
				}</div>
			
			</div> : null}
			
		</div>
	}// render;

}// StockDetailsStockDetailsPage;