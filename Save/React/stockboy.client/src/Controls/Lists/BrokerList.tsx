import APIClass from "Controls/Abstract/APIClass";
import SelectList, { SelectListProps } from "Controls/Lists/SelectList";
import Eyecandy from "Controls/Eyecandy";

import ListModel from "Models/ListModel";

import { DataControl, DataState } from "Controls/Abstract/DataControls";
import { BaseProps } from "Controls/BaseComponent";


export default class BrokerList extends DataControl<SelectListProps, DataState<ListModel>> {

	public state: DataState<ListModel> = new DataState<ListModel> ();


	public constructor (props: SelectListProps) {
		super (props);
		APIClass.fetch_data ("GetBrokers").then ((response: Array<ListModel>) => this.setState ({ data: response }));
	}// constructor;


	public render = () => is_null (this.state.data) ? <Eyecandy text="Loading..." /> : <SelectList id="broker_list" name={this.props.name}

		items={this.state.data} selected_item={this.props.selected_item} 
		header={this.props.header || "Select broker"} 

		onChange={this.props.onChange}>

	</SelectList>

}// BrokerList;