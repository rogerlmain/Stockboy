import React from "react";

import StylesheetList from "Classes/StylesheetList";
import MainMenuItem from "Controls/MainMenuItem";
import BaseComponent from "Controls/BaseComponent";
import PopupWindow from "Controls/PopupWindow";

import BasePage from "Pages/Abstract/BasePage";
import HomePage from "Pages/Home";
import TransactionsPage from "Pages/Transactions";
import DividendsPage from "Pages/Dividends";
import StocksPage from "Pages/Stocks";
import SplitsPage from "Pages/Splits";

import DataPage from "Pages/DataPage";
import TransactionModel from "Models/TransactionModel";

import { createRoot } from "react-dom/client";
import { EditTransactionForm } from "../Forms/EditTransactionForm";
import SplitsModel from "../Models/SplitModel";
import SplitModel from "../Models/SplitModel";


export class MainPageState { current_page: React.ReactElement = <HomePage /> }


export const PAGES	= {
	home: "Home",
	transactions: "Transactions",
	stocks: "Stocks",
	dividends: "Dividends",
	splits: "Splits"
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
				<MainMenuItem text={ PAGES.home } page={<HomePage />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.transactions } page={<TransactionsPage />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.dividends } page={<DividendsPage />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.stocks} page={<StocksPage />} selected_page={this.state.current_page} />
				<MainMenuItem text={ PAGES.splits } page={<SplitsPage />} selected_page={this.state.current_page} />
			</div>
		</div>

		<div id="main_body" className="row-centered body">{this.state.current_page}</div>

		<div className="row-centered footer">
			Stockboy Stock Ledger - &copy; Copyright 2024 - The Roger Main Programming Company
		</div>

	</div>


}// MainPage;