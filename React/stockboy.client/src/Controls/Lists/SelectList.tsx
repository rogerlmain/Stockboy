import { ListItem, ListItemArray } from "Classes/Collections";
import { BaseProps } from "Controls/Abstract/BaseProperties";
import { ListControl } from "Controls/Abstract/ListControl";
import { ChangeEvent, ChangeEventHandler, RefObject, createRef } from "react";

import InputElement, { InputElementContext } from "Controls/InputElement";


export class BaseSelectListProps extends BaseProps {
	name: string;
	header?: string;
	selected_item?: string;
	selectable_header?: Boolean;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
	disabled?: boolean;
}// BaseSelectListProps;


class SelectListProps extends BaseSelectListProps {
	data: ListItemArray;
}// SelectListProps;


class SelectListState {
	selected_item?: string = null;
}// SelectListState;


export default class SelectList extends ListControl<SelectListProps, SelectListState> {

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

			{not_set (this.state.selected_item) || (this.props.selectable_header) ? <option key={this.next_key} value={String.Empty}>
				{this.props.header ?? (this.props.selectable_header ? "All" : null) ?? `Select ${this.props.name.replace (underscore, String.Space)}`}
			</option> : null}

			{this.props.data?.map ((item: ListItem) => <option key={this.next_key} value={item.id} selected={item.id == this.state.selected_item}>{item.name}</option>)}

		</select>

	}// render;

}// SelectList;