import { NameValueArray, NameValuePair } from "Classes/Collections";
import { Component, createRef, ReactHTMLElement, RefObject } from "react";
import { renderToString } from "react-dom/server";


type ReactOptionElement = ReactHTMLElement<HTMLOptionElement>
type ReactOptionArray = Array<ReactOptionElement>


declare module "react" {
	interface ReactHTMLElement<T> {
		ref?: RefObject<T>;
	}// interface;
}// module;

class EditListProps {
	id?: string;
	close_on_select?: boolean;
	children: ReactOptionArray;
	data: NameValueArray;
}// EditListProps;


class EditListState {
	items: ReactOptionArray = null;
	opened: boolean = false;
	selected_item: ReactOptionElement = null;
}// EditListState;


export default class EditList extends Component<EditListProps, EditListState> {

	private input_field: RefObject<HTMLInputElement> = createRef ();


	private filtered_items (items: ReactOptionArray): ReactOptionArray {

		let result: ReactOptionArray = null;
		let item: ReactOptionElement = null;

		if (is_null (items)) return null;
		if (is_null (this.input_field.current.value)) return items;

		for (item of items) {

			let text = renderToString (item.props.children);

			if (text == this.input_field.current.value) return items;

			if (text.startsWith (this.input_field.current.value)) {
				if (is_null (result)) result = new Array<ReactOptionElement> ();
				result.push (item);
			}// if;

		}// for;

		return result;

	}// filtered_items;


	private get item_collection () { 

		let result: ReactOptionArray = null;

		if (isset (this.props.children)) result = Array.from (this.props.children);

		if (isset (this.props.data)) {
			this.props.data.forEach ((item: NameValuePair) => {
				if (is_null (result)) result = new Array<ReactOptionElement> ();
				result.push (<option value={item.name}>{item.value}</option>);
			});
		}// if;

		return this.filtered_items (result);

	}// item_collection;


	private element_value (element: ReactOptionElement): string { 
		if (is_null (element)) return null;
		return is_defined (element.props.value) ? element.props.value.toString () : renderToString (element.props.children);
	}// element_value;


	private selected_text (item: ReactOptionElement): string {

		if (is_null (item)) return null;

		let dom_element: HTMLElement = document.createElement ("div");

		dom_element.innerHTML = renderToString (item?.props.children);
		return dom_element.innerText;

	}// selected_text;


	/********/


	public static defaultProps: EditListProps = {
		id: null,
		close_on_select: true,
		children: null,
		data: null,
	}// defaultProps;


	public state: EditListState = new EditListState ();


	public componentDidMount () {
		document.addEventListener ("click", () => this.setState ({ opened: false }));
	}// componentDidMount;


	public render () {

		let item_list: ReactOptionArray = this.item_collection;

		return <div id={this.props.id} className="edit-list relative column-block"
			onClick={(event: ClickEvent) => event.stopPropagation ()}>

			<div className="relative">
				<input name="selected_item" autoComplete="off" ref={this.input_field}
					onKeyUp={() => this.setState ({ items: this.item_collection })}
					onClick={() => this.setState ({ opened: true })} defaultValue={this.selected_text (this.state.selected_item)}>
				</input>
				{isset (item_list) ? <div className="container">
					<input type="hidden" name="selected_value" value={this.element_value (this.state.selected_item)} />
					<div className="glyph" onClick={() => this.setState ({ opened: !this.state.opened })}>
						<div className="carat"></div>
					</div>
				</div> : null}
			</div>
			<div>
				{isset (item_list) ? <div name="select_list" className="select-list absolute column-block" 
					style={{ 
						display: this.state.opened ? "flex": "none",
						zIndex: 5
					}}>
					{this.item_collection.map ((child: ReactOptionElement) => {
						return <div className="container">

							<input type="hidden" name="element_value" value={this.element_value (child)} />

							<div className={`${(this.state.selected_item == child) && !this.props.close_on_select ? "active" : String.Empty} select-element`} 
								onClick={() => this.setState ({
									selected_item: child,
									opened: !this.props.close_on_select
								}, () => this.input_field.current.value = this.selected_text (child))}>
								{child.props.children}
							</div>

						</div>
					})}
				</div> : null}
			</div>
		</div>
	}// render;

}// EditList;