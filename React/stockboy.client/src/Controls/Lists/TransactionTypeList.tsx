import DataControl, { DataState } from "Controls/DataControl";
import SelectList, { SelectListProps } from "Controls/Lists/SelectList";
import Eyecandy from "Controls/Eyecandy";

import ListModel from "Models/ListModel";

import { BaseProps } from "Controls/BaseComponent";


export default class TransactionTypeList extends DataControl<SelectListProps, DataState<ListModel>> {

	public state: DataState<ListModel> = new DataState<ListModel> ();


	public constructor (props: SelectListProps) {
		super (props);
		this.fetch ("GetTransactionTypes").then (result => this.setState ({ data: result }));
	}// constructor;


	public render = () => is_null (this.state.data) ? <Eyecandy text="Loading..." /> : <SelectList id="transaction_type_list" name={this.props.name} items={this.state.data} selected_item={this.props.selected_item} />

}// TransactionTypeList;