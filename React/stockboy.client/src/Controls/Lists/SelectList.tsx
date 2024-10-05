import React from "react";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import ListModel from "Models/ListModel"


export class ListProps extends BaseProps {
	header?: string;
	disabled?: boolean;
	selected_item?: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}// ListProps;


export class SelectProps extends ListProps {
	name: string;
	table: string;
}// SelectProps;


class SelectListProps extends SelectProps {
	data?: Array<ListModel>;
}// SelectListProps;


class SelectListState {
	selected_item?: string = null;
}// SelectListState;


export default class SelectList extends BaseComponent<SelectListProps, SelectListState> {

	private static defaultProps: SelectListProps = {
		data: null,
		name: null,
		table: null,
		selected_item: null
	}// defaultProps;


	private update_selected_item = () => this.setState ({ selected_item: this.props.selected_item }, () => this.select_list_reference.current.dispatchEvent (new Event ("change", { bubbles: true })));


	/********/


	public static All: string = "All";


	public state: SelectListState = new SelectListState ();


	public select_list_reference: React.RefObject<HTMLSelectElement> = React.createRef ();


	public componentDidUpdate (previous_props: SelectListProps) {
		if (previous_props.selected_item != this.props.selected_item) this.update_selected_item ();
	}// componentDidUpdate;


	public componentDidMount () { if (isset (this.props.selected_item)) this.update_selected_item (); }


	public render = () => {

		return <select id={this.props.id} name={this.props.name} ref={this.select_list_reference}

		onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
			this.setState ({ selected_item: event.currentTarget.value });
			if (isset (this.props.onChange)) this.props.onChange (event);
		}}

		disabled={this.props.disabled}>

		{not_set (this.state.selected_item) || (this.props.header == SelectList.All) ? <option key={this.next_key}>{this.props.header ?? `Select ${this.props.name.replace (underscore, String.Space)}`}</option> : null}
		{this.props.data?.map ((item: ListModel) => <option key={this.next_key} value={item.id} selected={item.id == this.state.selected_item}>{item.name}</option>)}

	</select>};

}// SelectList;