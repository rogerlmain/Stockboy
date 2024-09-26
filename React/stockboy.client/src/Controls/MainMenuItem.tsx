import React, { ReactElement } from "react";

import MainPage from "Main";
import BaseComponent from "Controls/BaseComponent";
import BasePage from "Pages/Abstract/BasePage";


export class MenuItemProps {
	public text: String = null;
	public page: ReactElement = null;
	public selected_page: ReactElement = null;
}// MenuItemProps;


export class MenuItemState { selected: Boolean = false }


export default class MainMenuItem extends BaseComponent<MenuItemProps> {


	private control = React.createRef<HTMLDivElement> ();


	/********/


	public render = () => <div className="main-menu-item" onClick={() => main_page.change_page (this.props.page)} ref={this.control}>{this.props.text}</div>


	public componentDidUpdate = () => this.control.current.setClass ("selected", this.props.page.type == this.props.selected_page.type);


	public componentDidMount = this.componentDidUpdate;


}// MainMenuItem;