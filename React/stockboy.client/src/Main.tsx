import React, { ReactElement } from "react";

import MainMenuItem from "Controls/MainMenuItem";
import BaseComponent from "Controls/BaseComponent";
import PopupWindow from "Controls/PopupWindow";

import Home from "Pages/Home";
import BasePage from "Pages/Abstract/BasePage";
import Transactions from "Pages/Transactions";


export class MainPageState { current_page: ReactElement = <Home /> }


export const PAGES	= {
	home: "Home",
	transactions: "Transactions"
}// PAGES;


export default class MainPage extends BaseComponent {


	private popup_reference: React.RefObject<PopupWindow> = React.createRef ();


	/********/


	public state: MainPageState = new MainPageState ();

	public get popup_window (): PopupWindow { return this.popup_reference.current }


	public change_page = (new_page: ReactElement) => this.setState ({ current_page: new_page });


	public componentDidMount = () => main_page = this;


	public render = () => <div>

		<PopupWindow id="popup_window" ref={this.popup_reference}>{"Default Value"}</PopupWindow>

		<div className="header">
			<div className="main-menu">
				<MainMenuItem text={ PAGES.home } page={<Home />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.transactions } page={<Transactions />} selected_page={this.state.current_page} />
{/*
				<MainMenuItem text="Dividends" />
				<MainMenuItem text="Tickers" />
*/}
			</div>
		</div>

		<div id="main_body" className="full-page row-centered with-lotsa-headspace">{this.state.current_page}</div>

		<div className="footer">
			&copy; 2024 - Stockboy
		</div>

	</div>


}// MainPage;