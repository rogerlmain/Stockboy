import { Component } from "react";
import { BrokersModel } from "Models/Brokers";


class BrokerFormProps {
	data?: BrokersModel;
}// BrokerFormProps;


export default class EditBrokerForm extends Component<BrokerFormProps> {

	public render () {
		return <div>
			<input type="hidden" name="id" value={this.props.data?.id} />
			<div className="two-column-grid">
				<label htmlFor="broker_name">Broker</label>
				<input id="broker_name" type="text" name="name" defaultValue={this.props.data?.name} />
			</div>
		</div>
	}// render;

}// EditBrokerForm;
