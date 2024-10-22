import MainMenuItem from "Controls/MainMenuItem";
import PopupWindow from "Controls/PopupWindow";
import BasePage from "Pages/Abstract/BasePage";

import BrokersPage from "Pages/Brokers";
import DividendsPage from "Pages/Dividends";
import HomePage from "Pages/Home";
import SplitsPage from "Pages/Splits";
import TickersPage from "Pages/Tickers";
import TransactionsPage from "Pages/Transactions";

import React, { Context, createContext, ReactElement } from "react";


export class MainPageState { 
	current_page: ReactElement = <TransactionsPage />;
}// MainPageState;


export const pages = {
	home: HomePage,
	transactions: TransactionsPage,
	dividends: DividendsPage,
	splits: SplitsPage,
	brokers: BrokersPage,
	tickers: TickersPage,
}// pages;


export const MenuContext: Context<ReactElement> = createContext (null);


export default class MainPage extends BasePage {


	private popup_ref: React.RefObject<PopupWindow> = React.createRef ();


	/********/


	public state: MainPageState = new MainPageState ();

	public get popup_window (): PopupWindow { return this.popup_ref.current }


	public change_page = (new_page: React.ReactElement) => this.setState ({ current_page: new_page });


	public componentDidMount () {
		main_page = this;
	}// componentDidMount;


	public render = () => <div className="page-layout">

		<PopupWindow id="popup_window" ref={this.popup_ref}>{"Default Value"}</PopupWindow>

		<div className="full-width left-aligned">
			<div className="row-block main-menu margin">
				{Object.keys (pages).map ((key: string) => {
					const PageName = pages [key];
					return <MainMenuItem key={key} text={key.titleCase ()} page={<PageName />} selected_item={this.state.current_page} />
				})}
			</div>
		</div>

		<div id="main_body" className="full-page page-layout">{this.state.current_page}</div>

		<div className="column-margin footer">
			Stockboy Stock Ledger - &copy; Copyright 2024 - The Roger Main Programming Company
		</div>

	</div>


}// MainPage;