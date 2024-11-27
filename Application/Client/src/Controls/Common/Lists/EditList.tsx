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
	children: ReactOptionArray;
	close_on_select?: boolean;
}// EditListProps;


class EditListState {
	opened: boolean = false;
	selected_item: ReactOptionElement = null;
}// EditListState;


export default class EditList extends Component<EditListProps, EditListState> {

	private dropdown_list: RefObject<HTMLDivElement> = createRef ();


	private selected_text (item: ReactOptionElement): string {

		if (is_null (item)) return null;

		let dom_element: HTMLElement = document.createElement ("div");

		dom_element.innerHTML = renderToString (item?.props.children);
		return dom_element.innerText;

	}// selected_text;


	private element_value (element: ReactOptionElement): string { 
		if (is_null (element)) return null;
		return is_defined (element.props.value) ? element.props.value.toString () : renderToString (element.props.children);
	}

	private select_element (value: string) {
		this.props.children.forEach ((child: ReactOptionElement) => {

		});
	}// select_element;


	/********/


	public static defaultProps: EditListProps = {
		id: null,
		children: null,
		close_on_select: true,
	}// defaultProps;


	public state: EditListState = new EditListState ();


	public componentDidMount () {
		document.addEventListener ("click", (event: Event) => {
			this.setState ({ opened: false });
		});
	}// componentDidMount;


	public render () {
		return <div id={this.props.id} className="edit-list relative column-block" ref={this.dropdown_list} 
			onClick={(event: ClickEvent) => event.stopPropagation ()}>

			<div className="relative">
				<input name="selected_item" 
					onKeyUp={(event: KeyEvent) => this.select_element ((event.currentTarget as HTMLInputElement).value)}
					onClick={() => this.setState ({ opened: true })} defaultValue={this.selected_text (this.state.selected_item)}>
				</input>
				<input type="hidden" name="selected_value" value={this.element_value (this.state.selected_item)} />
				<div className="glyph" onClick={() => this.setState ({ opened: true })}>
					<div className="carat"></div>
				</div>
			</div>
			<div>
				<div name="select_list" className="select-list absolute column-block" 
					style={{ 
						display: this.state.opened ? "flex": "none",
						zIndex: 5
					}}>
					{this.props.children.map ((child: ReactOptionElement) => {
						return <div className="container">

							<input type="hidden" name="element_value" value={this.element_value (child)} />

							<div className={`${(this.state.selected_item == child) && !this.props.close_on_select ? "active" : String.Empty} select-element`} 
								onClick={(event: ClickEvent) => this.setState ({ 
									selected_item: child,
									opened: !this.props.close_on_select
								})}>
								{child.props.children}
							</div>

						</div>
					})}
				</div>
			</div>
		</div>
	}// render;

}// EditList;