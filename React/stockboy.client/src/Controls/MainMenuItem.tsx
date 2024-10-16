import BaseControl from "Controls/Abstract/BaseControl";

import { ReactElement, RefObject, createRef } from "react";


export class MenuItemProps {
	public text: String = null;
	public page: ReactElement = null;
	public selected_item: ReactElement = null;
}// MenuItemProps;


export class MenuItemState { selected: Boolean = false }


export default class MainMenuItem extends BaseControl<MenuItemProps> {

	private control: RefObject<HTMLDivElement> = createRef ();


	/********/


	public render () {
		return <div ref={this.control} 

			className={`${(this.props.page.type == this.props.selected_item.type) ? "selected" : String.Empty} main-menu-item`}
		
			onClick={() => {
				main_page.popup_window.hide ();
				main_page.change_page (this.props.page);
			}}>
		
			{this.props.text}
		
		</div>
	}// render;

}// MainMenuItem;