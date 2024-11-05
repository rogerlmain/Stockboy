import { MainPageContext } from "Classes/Contexts";
import { Component, RefObject, createRef } from "react";

import { PageType } from "Pages/Main";


export class MenuItemProps {
	public text: string = null;
	public page: PageType = null;
	public selected_item: PageType = null;
}// MenuItemProps;


export class MenuItemState { selected: Boolean = false }


export default class MainMenuItem extends Component<MenuItemProps> {

	private control: RefObject<HTMLDivElement> = createRef ();


	/********/


	public render () {
		return <MainPageContext.Consumer>
			{main_page => <div ref={this.control}

				className={`${(this.props.page == this.props.selected_item) && "selected"} main-menu-item`}
				onClick={() => main_page.change_page (this.props.page)}>
		
				{this.props.text}
		
			</div>}
		</MainPageContext.Consumer>

	}// render;

}// MainMenuItem;