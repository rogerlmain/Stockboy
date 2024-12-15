import StockboyAPI from "Classes/StockboyAPI";
import EditList from "Controls/Common/Lists/EditList";

import { NameValueArray } from "Classes/Common/Collections";

import { IDModel } from "Models/Abstract/BaseModels";
import { BrokersModel } from "Models/Brokers";
import { Component } from "react";


class BrokerFormProps {
	data?: BrokersModel;
}// BrokerFormProps;


class BrokerFormState {
	brokers: NameValueArray = null;
}// BrokerFormState;


export default class EditBrokerForm extends Component<BrokerFormProps, BrokerFormState> {

	public state: BrokerFormState = new BrokerFormState ();


	public render () {
		return <EditList id="brokers_list" name="broker" data={this.state.brokers} 
			value={(isset (this.props.data?.id) && isset (this.props.data?.name)) ? new IDModel (this.props.data.id, this.props.data.name) : null}>
		</EditList>
	}// render;


	constructor (props: BrokerFormProps) {
		super (props);
		new StockboyAPI ().fetch_data ("GetBrokers").then ((response: NameValueArray) => this.setState ({ brokers: response }));
	}// constructor;

}// EditBrokerForm;
