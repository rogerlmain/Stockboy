import BaseComponent from "Classes/Common/BaseComponent";

import { NameValueArray, NameValuePair } from "Classes/Collections";
import { IDModel } from "Models/Abstract/BaseModels";
import { createRef, ReactHTMLElement, RefObject } from "react";
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
	name: string;
	close_on_select?: boolean;
	children?: ReactOptionArray;
	data?: NameValueArray;
	value: IDModel;

	onChange?: Function;

}// EditListProps;


class EditListState {
	items: ReactOptionArray = null;
	opened: boolean = false;
	selected_item: IDModel = null;
}// EditListState;


export default class EditList extends BaseComponent<EditListProps, EditListState> {

	private input_field: RefObject<HTMLInputElement> = createRef ();
	private select_list: RefObject<HTMLDivElement> = createRef ();

	
	private option = (item: ReactOptionElement): HTMLOptionElement => (this.rendered_element (item) as HTMLOptionElement);


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

		return is_null (result) ? items : result;

	}// filtered_items;


	private element_text (): string {
		if (isset (this.state.selected_item?.value)) return this.state.selected_item.value;
		if (isset (this.props.value?.value)) return this.props.value.value;
		return String.Empty;
	}// element_text;


	private element_value (): string { 
		if (isset (this.state.selected_item)) return JSON.stringify (this.state.selected_item);
		if (isset (this.props.value?.id)) return this.props.value.id;
		return String.Empty;
	}// element_value;


	private select_list_item (text: string): void {

		let element: ReactOptionElement = null;

		for (element of this.filtered_items (this.state.items)) {
			let dom_element = this.option (element);
			if (dom_element.innerText == text) return this.setState ({ selected_item: new IDModel (dom_element.value, dom_element.innerText) });
		}// for;

		this.set_selected_item (new IDModel (this.props.value?.id, text));

	}// select_list_item;


	private selected_text (item: ReactOptionElement): string {
		if (isset (item)) return this.rendered_element (item)?.innerText;
		if (isset (this.props.value)) return this.props.value.value;
		return null;
	}// selected_text;


	private selected_value (item: ReactOptionElement) {
		let option_element = (this.rendered_element (item) as HTMLOptionElement);
		return new IDModel (option_element.value, option_element.innerText);
	}// selected_value;


	private set_selected_item (item: IDModel) {
		this.setState ({ selected_item: item }, () => { if (isset (this.props.onChange)) this.props.onChange (item) });
	}// set_selected_item;


	/********/


	public static defaultProps: EditListProps = {
		id: null,
		name: null,
		close_on_select: true,
		children: null,
		data: null,
		value: null,
	}// defaultProps;


	public state: EditListState = new EditListState ();


	public componentDidUpdate (props: EditListProps) {

		let item_collection: ReactOptionArray = null;

		if ((this.props.data == props.data) || this.props.data?.matches (props.data)) return;
		if (isset (this.props.children)) item_collection = Array.from (this.props.children);

		if (isset (this.props.data)) {
			this.props.data.forEach ((item: NameValuePair) => {
				if (is_null (item_collection)) item_collection = new Array<ReactOptionElement> ();
				item_collection.push (<option value={item.name}>{item.value}</option>);
			});
		}// if;

		this.setState ({ items: item_collection }, () => {

			if (not_set (this.select_list.current)) return;

			let width = get_width (this.select_list.current);
			let field = this.input_field.current;

			this.setState ({ selected_item: this.props.value });
			if (field.offsetWidth < width) return field.style.width = `${width}px`;
			this.select_list.current.style.width = `${field.offsetWidth}px`;

		});

	}// componentDidUpdate;


	public componentDidMount () {
		document.addEventListener ("click", () => this.setState ({ opened: false }));
		this.setState ({ selected_item: this.props.value });
	}// componentDidMount;


	public render () {

		let item_list: ReactOptionArray = this.filtered_items (this.state.items);
		let selectable: boolean = isset (item_list) && not_set (this.props.value);

		return <div id={this.props.id} className="edit-list relative column-block"
			onClick={(event: ClickEvent) => event.stopPropagation ()}>

			<div className="relative">

				<input type="hidden" name={this.props.name} value={this.element_value ()} />

				<input autoComplete="off" ref={this.input_field} defaultValue={this.element_text ()}
					onKeyUp={(event: KeyEvent) => this.select_list_item ((event.currentTarget as HTMLInputElement).value)}
					onClick={() => this.setState ({ opened: true })}>
				</input>

				{selectable ? <div className="container">
					<div className="glyph" onClick={() => this.setState ({ opened: !this.state.opened })}>
						<div className="carat"></div>
					</div>
				</div> : null}

			</div>

			{selectable ? <div>
				<div name="select_list" className="select-list absolute column-block" ref={this.select_list}
					style={{ 
						width: "min-content",
						display: this.state.opened ? "flex": "none",
						zIndex: 5
					}}>
					{item_list.map ((child: ReactOptionElement) => {

						let text: string = this.selected_text (child);
						let selected: boolean = (this.rendered_element (child) as HTMLOptionElement).value == this.state.selected_item?.id;

						return <div className="container">
							<div className={`${selected && !this.props.close_on_select ? "active" : String.Empty} select-element`} 
								
								onClick={() => {

									let value = this.selected_value (child);

									this.setState ({
										selected_item: this.selected_value (child),
										opened: !this.props.close_on_select
									}, () => {
										this.set_selected_item (value);
										this.input_field.current.value = text;
									});

								}}>

								{text}

							</div>
						</div>
					})}
				</div>
			</div> : null}

		</div>

	}// render;

}// EditList;