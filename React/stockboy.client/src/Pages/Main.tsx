import HoldingsData from "Classes/HoldingsData";

import Eyecandy from "Controls/Eyecandy";
import MainMenuItem from "Controls/MainMenuItem";
import PopupWindow from "Controls/PopupWindow";

import BasePage from "Pages/Abstract/BasePage";
import BrokersPage from "Pages/Brokers";
import DividendsPage from "Pages/Dividends";
import HomePage from "Pages/Home";
import SplitsPage from "Pages/Splits";
import TickersPage from "Pages/Tickers";
import TransactionsPage from "Pages/Transactions";

import React, { ReactElement } from "react";

import { HoldingsDataContext, MainPageContext } from "Classes/Contexts";

import { BaseProps } from "Controls/Abstract/BaseProperties";


const pages = {
	home: <HomePage />,
	transactions: <TransactionsPage />,
	dividends: <DividendsPage />,
	splits: <SplitsPage />,
	brokers: <BrokersPage />,
	tickers: <TickersPage />,
}// pages;


export class MainPageState {
	page_name: string = null;
	holdings_data: HoldingsData = new HoldingsData ();
	page: ReactElement = <div className="full-page centered"><Eyecandy text="Loading holdings..." /></div>
}// MainPageState;


export default class MainPage extends BasePage {


	private popup_ref: React.RefObject<PopupWindow> = React.createRef ();


	/********/


	public state: MainPageState = new MainPageState ();


	public change_page = (new_page: ReactElement) => this.setState ({ page: new_page });


	public componentDidMount () {
		popup_window = this.popup_ref.current;
	}// componentDidMount;


	public render = () => <HoldingsDataContext.Provider value={this.state.holdings_data}>
		<div className="page-layout">

			<PopupWindow id="popup_window" ref={this.popup_ref} />

			{isset (this.state.holdings_data) ? <div className="full-width left-aligned">
				<div className="row-block main-menu margin">
					<MainPageContext.Provider value={this}>
						{Object.keys (pages).map ((key: string) => {
							return <MainMenuItem key={key} text={key.titleCase ()} page={pages [key]} selected_item={this.state.page} />
						})}
					</MainPageContext.Provider>
				</div>
			</div> : String.Empty}

			<div id="main_body" className="full-page page-layout">{this.state.page}</div>

			<div className="column-margin footer">
				Stockboy Stock Ledger - &copy; Copyright 2024 - The Roger Main Programming Company
			</div>

		</div>
	</HoldingsDataContext.Provider>


	constructor (props: BaseProps) {
		super (props);
		this.state.holdings_data.load_holdings ().then (() => this.change_page (pages.home));
	}// constructor;

}// MainPage;