import React, { ChangeEvent, ChangeEventHandler, RefObject, createRef } from "react";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import InputElement, { InputElementContext } from "Controls/InputElement";

import EditForm, { EditFormContext } from "Forms/EditForm";

import ListModel from "Models/ListModel";


export class BaseSelectListProps extends BaseProps {
	name: string;
	header?: string;
	selected_item?: string;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
	disabled?: boolean;
}// BaseSelectListProps;


class SelectListProps extends BaseSelectListProps {
	data: Array<ListModel>;
}// SelectListProps;


class SelectListState {
	selected_item?: string = null;
}// SelectListState;


export default class SelectList extends BaseComponent<SelectListProps, SelectListState> {

	private update_selected_item = () => this.setState ({ selected_item: this.props.selected_item }, () => this.select_list_ref.current.dispatchEvent (new Event ("change", { bubbles: true })));


	/********/


	public static contextType = InputElementContext;

	public static defaultProps: SelectListProps = {
		name: null,
		header: null,
		selected_item: null,
		onChange: null,
		disabled: false,
		data: null,
	}// defaultProps;


	public static All: string = "All";


	public state: SelectListState = new SelectListState ();


	public select_list_ref: RefObject<HTMLSelectElement> = createRef ();


	public componentDidUpdate (previous_props: SelectListProps) {

		if (previous_props.selected_item != this.props.selected_item) this.update_selected_item ();

		if (isset (this.context)) {

			let input_element: InputElement = (this.context as InputElement);

			input_element.handle_change (this.select_list_ref.current);

		}// if;

	}// componentDidUpdate;


	public componentDidMount () { 

		if (isset (this.props.selected_item)) this.update_selected_item (); 

		if (isset (this.context)) {

			let select_list = this.select_list_ref.current;

			select_list.addEventListener ("change", () => (this.context as InputElement).handle_change (select_list));

		}// if;

	}// componentDidMount;


	public render () {

		return <select id={this.props.id} name={this.props.name} ref={this.select_list_ref}

			onChange={(event: ChangeEvent<HTMLSelectElement>) => {
				this.setState ({ selected_item: event.currentTarget.value });
				if (isset (this.props.onChange)) this.props.onChange (event);
			}}

			disabled={this.props.disabled}>

			{not_set (this.state.selected_item) || (this.props.header == SelectList.All) ? <option key={this.next_key} value={String.Empty}>{this.props.header ?? `Select ${this.props.name.replace (underscore, String.Space)}`}</option> : null}
			{this.props.data?.map ((item: ListModel) => <option key={this.next_key} value={item.id} selected={item.id == this.state.selected_item}>{item.name}</option>)}

		</select>

	}// render;

}// SelectList;