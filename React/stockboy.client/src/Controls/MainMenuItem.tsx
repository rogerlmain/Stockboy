import BaseControl from "Controls/Abstract/BaseControl";

import { ReactElement, RefObject, createRef } from "react";
import { MainPageContext } from "Classes/Contexts";


export class MenuItemProps {
	public text: string = null;
	public page: ReactElement = null;
	public selected_item: ReactElement = null;
}// MenuItemProps;


export class MenuItemState { selected: Boolean = false }


export default class MainMenuItem extends BaseControl<MenuItemProps> {

	private control: RefObject<HTMLDivElement> = createRef ();


	/********/


	public render () {
		return <MainPageContext.Consumer>
			{main_page => <div ref={this.control}

				className={`${(this.props.page.type == this.props.selected_item.type) && "selected"} main-menu-item`}
				onClick={() => main_page.change_page (this.props.page)}>
		
				{this.props.text}
		
			</div>}
		</MainPageContext.Consumer>

	}// render;

}// MainMenuItem;