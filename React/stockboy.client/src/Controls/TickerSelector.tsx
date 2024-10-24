import BaseControl from "Controls/Abstract/BaseControl";
import InputElement from "Controls/InputElement";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";

import { StockModel } from "Models/Abstract/BaseModel";
import { ChangeEvent } from "react";


class TickerSelectorProps extends StockModel {
	onBrokerChange?: Function = null;
	onTickerChange?: Function = null;
	selectable_header?: Boolean = true;
}// TickerSelectorProps;


class TickerSelectorState {
	broker_id: string = null;
	ticker_id: string = null;
}// TickerSelectorState;


export default class TickerSelector extends BaseControl<TickerSelectorProps, TickerSelectorState> {

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


	public componentDidMount = () => this.setState ({
		broker_id: this.props.broker_id,
		ticker_id: this.props.ticker_id,
	});


	public render () {
		return <div className="container">

			<InputElement>
				<BrokerList key="broker_list" selected_item={this.state.broker_id} selectable_header={this.props.selectable_header}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						this.setState ({ broker_id: event.target.value});
						if (isset (this.props.onBrokerChange)) this.props.onBrokerChange (event.target.value);
					}}>
				</BrokerList>
			</InputElement>

			<InputElement>
				<TickerList key="ticker_list" selected_item={this.state.ticker_id} selectable_header={this.props.selectable_header}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						this.setState ({ ticker_id: event.target.value})
						if (isset (this.props.onTickerChange)) this.props.onTickerChange (event.target.value);
					}}>
				</TickerList>
			</InputElement>

		</div>
	}// render;

}// TickerSelector;