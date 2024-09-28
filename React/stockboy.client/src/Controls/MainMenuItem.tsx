import React from "react";

import MainPage from "Main";
import BaseComponent from "Controls/BaseComponent";
import BasePage from "Pages/Abstract/BasePage";


export class MenuItemProps {
	public text: String = null;
	public page: React.ReactElement = null;
	public selected_page: React.ReactElement = null;
}// MenuItemProps;


export class MenuItemState { selected: Boolean = false }


export default class MainMenuItem extends BaseComponent<MenuItemProps> {


	private control: React.RefObject<HTMLDivElement> = React.createRef ();


	/********/


	public render = () => <div className="main-menu-item" ref={this.control} onClick={() => {
		main_page.popup_window.hide ();
		main_page.change_page (this.props.page);
	}}>{this.props.text}</div>


	public componentDidUpdate = () => this.control.current.setClass ("selected", this.props.page.type == this.props.selected_page.type);


	public componentDidMount = this.componentDidUpdate;


}// MainMenuItem;