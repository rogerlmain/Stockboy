import React from "react";

import StylesheetList from "Classes/StylesheetList";
import MainMenuItem from "Controls/MainMenuItem";
import BaseComponent from "Controls/BaseComponent";
import PopupWindow from "Controls/PopupWindow";

import Home from "Pages/Home";
import BasePage from "Pages/Abstract/BasePage";
import Transactions from "Pages/Transactions";
import Dividends from "Pages/Dividends";
import Stocks from "Pages/Stocks";

import { createRoot } from "react-dom/client";


export class MainPageState { current_page: React.ReactElement = <Home /> }


export const PAGES	= {
	home: "Home",
	transactions: "Transactions",
	stocks: "Stocks",
	dividends: "Dividends"
}// PAGES;


export default class MainPage extends BaseComponent {


	private popup_reference: React.RefObject<PopupWindow> = React.createRef ();


	/********/


	public state: MainPageState = new MainPageState ();

	public get popup_window (): PopupWindow { return this.popup_reference.current }


	public change_page = (new_page: React.ReactElement) => this.setState ({ current_page: new_page });


	public componentDidMount = () => main_page = this;


	public render = () => <div className="page-layout">

		<PopupWindow id="popup_window" ref={this.popup_reference}>{"Default Value"}</PopupWindow>

		<div className="header">
			<div className="main-menu">
				<MainMenuItem text={ PAGES.home } page={<Home />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.transactions } page={<Transactions />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.dividends } page={<Dividends />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.stocks} page={<Stocks />} selected_page={this.state.current_page} />
			</div>
		</div>

		<div id="main_body" className="row-centered body">{this.state.current_page}</div>

		<div className="row-centered footer">
			Stockboy Stock Ledger - &copy; Copyright 2024 - The Roger Main Programming Company
		</div>

	</div>


}// MainPage;