import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";

import { ChangeEvent, Component } from "react";


class TickerSelectorProps {

	broker_id?: string;
	ticker_id?: string;

	required?: boolean;
	allow_all?: boolean;

	onChange: Function;
	onBrokerChange: Function;
	onTickerChange: Function;

}// TickerSelectorProps;


class TickerSelectorState {
	broker_id: string = null;
	ticker_id: string = null;
}// TickerSelectorState;


export default class TickerSelector extends Component<TickerSelectorProps, TickerSelectorState> {

	public static defaultProps: TickerSelectorProps = {

		broker_id: null,
		ticker_id: null,

		required: false,
		allow_all: true,

		onChange: null,
		onBrokerChange: null,
		onTickerChange: null,

	}// defaultProps;


	public state: TickerSelectorState = new TickerSelectorState ();


	public componentDidMount () {
		this.state.broker_id = this.props.broker_id;
		this.state.ticker_id = this.props.ticker_id;
	}// componentDidMount;


	public render () {
		return <div className="column-centered somewhat-spaced-out row-block">

			<BrokerList selected_item={this.props.broker_id} allow_all={this.props.allow_all} required={true}
				onChange={(event: ChangeEvent<HTMLSelectElement>) => {
					this.setState ({ broker_id: event.target.value.null_value }, () =>{
						if (isset (this.props.onChange)) this.props.onChange (this.state.broker_id, this.state.ticker_id);
						if (isset (this.props.onBrokerChange)) this.props.onBrokerChange (this.state.broker_id);
					});
				}}>
			</BrokerList>

			<TickerList selected_item={this.props.ticker_id} allow_all={this.props.allow_all}
				onChange={(event: ChangeEvent<HTMLSelectElement>) => {
					this.setState ({ ticker_id: event.target.value.null_value}, () => {
						if (isset (this.props.onChange)) this.props.onChange (this.state.broker_id, this.state.ticker_id);
						if (isset (this.props.onTickerChange)) this.props.onTickerChange (this.state.ticker_id);
					});
				}}>
			</TickerList>

		</div>
	}// render;

}// TickerSelector;