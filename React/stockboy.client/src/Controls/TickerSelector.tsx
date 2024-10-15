import InputElement from "Controls/InputElement";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";

import { BaseComponent } from "Controls/BaseComponent";
import { IStockModel, StockDataModel, StockModel } from "Models/Abstract/BaseModel";
import { ChangeEvent } from "react";


class TickerSelectorState {
	broker_id: string = null;
	ticker_id: string = null;
}// TickerSelectorState;


export default class TickerSelector extends BaseComponent<StockModel, TickerSelectorState> {

	public static defaultProps = {
		broker_id: null,
		ticker_id: null,
		data: null,
	}// defaultProps;


	public state: TickerSelectorState = new TickerSelectorState ();


	public componentDidUpdate (previous_props: StockModel) {
		if (this.props.broker_id != previous_props.broker_id) this.setState ({broker_id: this.props.broker_id});
		if (this.props.ticker_id != previous_props.ticker_id) this.setState ({ticker_id: this.props.ticker_id});
	}// componentDidMount;


	public render () {
		return <div className="container">
			<InputElement>
				<BrokerList selected_item={this.state.broker_id}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: event.target.value})}>
				</BrokerList>
			</InputElement>

			<InputElement>
				<TickerList selected_item={this.state.ticker_id} 
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ ticker_id: event.target.value})}>
				</TickerList>
			</InputElement>
		</div>
	}// render;

}// TickerSelector;