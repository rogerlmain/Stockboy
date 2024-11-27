import { DataKey, DataKeyArray } from "Classes/DataKeys";
import { InputElementContext } from "Controls/InputElement";
import { CSSProperties, ChangeEvent, Component, KeyboardEventHandler, RefObject, createRef } from "react";


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
	data: DataKeyArray;
	style: CSSProperties;
	onKeyUp?: KeyboardEventHandler;
}// SelectListProps;


class SelectListState {
	selected_item?: string = null;
}// SelectListState;


export default class SelectList extends Component<SelectListProps, SelectListState> {

	private update_selected_item = () => this.setState ({ selected_item: this.props.selected_item }, () => this.select_list_ref.current.dispatchEvent (new Event ("change", { bubbles: true })));


	/********/


	public static contextType = InputElementContext;


	public static defaultProps: SelectListProps = {
		id: null,
		header: null,
		selected_item: null,
		allow_all: false,
		onChange: null,
		disabled: false,
		required: false,
		data: null,
		style: null,
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

		return <select id={this.props.id} name={this.props.id} style={this.props.style}
			disabled={this.props.disabled} required={this.props.required} onKeyPress={() => alert ("keyboard doing shit")/*this.props.onKeyUp*/}
			value={this.state.selected_item ?? String.Empty} ref={this.select_list_ref} 

			onChange={(event: ChangeEvent<HTMLSelectElement>) => {
				if (isset (this.props.onChange)) this.props.onChange (event);
				this.setState ({ selected_item: is_defined (event.currentTarget.value) ? event.currentTarget.value : null });
			}}>

			{not_set (this.state.selected_item) || (this.props.allow_all) ? <option key={"header"} value={String.Empty}>
				{this.props.header ?? (this.props.allow_all ? "All" : `Select ${this.props.id.titleCase ()}`)}
			</option> : null}

			{this.props.data?.map ((item: DataKey) => <option key={item.id} value={item.id}>{item.name}</option>)}

		</select>

	}// render;

}// SelectList;