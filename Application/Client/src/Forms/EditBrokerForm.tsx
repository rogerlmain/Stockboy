import StockboyAPI from "Classes/StockboyAPI";

import { NameValueArray } from "Classes/Collections";
import EditList from "Controls/Common/Lists/EditList";

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
		return <EditList id="brokers_list" data={this.state.brokers} />
	}// render;


	constructor (props: BrokerFormProps) {
		super (props);
		new StockboyAPI ().fetch_data ("GetBrokers").then ((response: NameValueArray) => this.setState ({ brokers: response }));
	}// constructor;

}// EditBrokerForm;
