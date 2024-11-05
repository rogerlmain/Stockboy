import { InputElementContext } from "Controls/InputElement";
import { ChangeEvent, Component, RefObject, createRef } from "react";


export class BaseSelectListProps {
	id: string;
	header?: string;
	selected_item?: string;
	allow_all?: Boolean;
	disabled?: boolean;
	required?: boolean;
	onChange?: Function;
}// BaseSelectListProps;


class SelectListProps extends BaseSelectListProps {
	data: ListItemArray;
}// SelectListProps;


class SelectListState {
	selected_item?: string = null;
}// SelectListState;


export type ListItemArray = Array<ListItem>


export class ListItem {

	public id: string = null;
	public name: string = null;

	constructor (id: string, name: string = null) {
		if (is_null (name)) name = id;
		this.id = id;
		this.name = name;
	}// constructor;

}// ListModelItem;


export default class SelectList extends Component<SelectListProps, SelectListState> {

	private update_selected_item = () => this.setState ({ selected_item: this.props.selected_item }, () => this.select_list_ref.current.dispatchEvent (new Event ("change", { bubbles: true })));


	/********/


	public static contextType = InputElementContext;


	public static defaultProps: SelectListProps = {
		id: null,
		header: null,
		selected_item: null,
		onChange: null,
		disabled: false,
		required: false,
		data: null,
	}// defaultProps;


	public state: SelectListState = new SelectListState ();


	public select_list_ref: RefObject<HTMLSelectElement> = createRef ();


	public componentDidUpdate (previous_props: SelectListProps) {
		if (previous_props.selected_item != this.props.selected_item) this.update_selected_item ();
	}// componentDidUpdate;


	public componentDidMount () { 
		if (isset (this.props.selected_item)) this.update_selected_item (); 
	}// componentDidMount;


	public render () {

		return <select id={this.props.id} name={this.props.id} ref={this.select_list_ref} value={this.state.selected_item ?? String.Empty}
			disabled={this.props.disabled} required={this.props.required}

			onChange={(event: ChangeEvent<HTMLSelectElement>) => {
				if (isset (this.props.onChange)) this.props.onChange (event);
				this.setState ({ selected_item: is_defined (event.currentTarget.value) ? event.currentTarget.value : null });
			}}>

			{not_set (this.state.selected_item) || (this.props.allow_all) ? <option key={"header"} value={String.Empty}>
				{this.props.header ?? (this.props.allow_all ? "All" : null) ?? `Select ${this.props.id.replace (underscore, String.Space)}`}
			</option> : null}

			{this.props.data?.map ((item: ListItem) => <option key={item.id} value={item.id}>{item.name}</option>)}

		</select>

	}// render;

}// SelectList;