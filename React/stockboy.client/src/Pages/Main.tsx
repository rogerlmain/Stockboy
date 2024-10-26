import HoldingsData from "Classes/HoldingsData";
import ProfitLossData from "Classes/ProfitLossData";

import Eyecandy from "Controls/Eyecandy";
import MainMenuItem from "Controls/MainMenuItem";
import PopupWindow from "Controls/PopupWindow";

import BasePage from "Pages/Abstract/BasePage";

import ActivityPage from "Pages/Activity";
import BrokersPage from "Pages/Brokers";
import DividendsPage from "Pages/Dividends";
import HomePage from "Pages/Home";
import ProfitLossPage from "Pages/ProfitLoss";
import SplitsPage from "Pages/Splits";
import TickersPage from "Pages/Tickers";
import TransactionsPage from "Pages/Transactions";

import React, { ReactElement } from "react";

import { MainPageContext } from "Classes/Contexts";
import { BaseProps } from "Controls/Abstract/BaseProperties";


export enum PageType {
	home = "Home",
	activity = "Activity",
	transactions = "Transactions",
	dividends = "Dividends",
	splits = "Splits",
	brokers = "Brokers",
	tickers = "Tickers",
	profits = "Profit and Loss",
}// PageType;


export class MainPageState {
	page_name: string = null;
	page: PageType = null;
	holdings: HoldingsData = new HoldingsData ();
	profits: ProfitLossData = null;
}// MainPageState;


export default class MainPage extends BasePage {


	private popup_ref: React.RefObject<PopupWindow> = React.createRef ();


	private get active_page () {
		switch (this.state.page) {
			case PageType.home: return <HomePage holdings={this.state.holdings} />;
			case PageType.activity: return <ActivityPage />;
			case PageType.transactions: return <TransactionsPage />;
			case PageType.dividends: return <DividendsPage />;
			case PageType.splits: return <SplitsPage />;
			case PageType.brokers: return <BrokersPage />;
			case PageType.tickers: return <TickersPage />;
			case PageType.profits: return <ProfitLossPage holdings={this.state.profits} />;
			default: return <div className="full-page centered"><Eyecandy text="Loading holdings..." /></div>
		}// switch;
	}// active_page;


	/********/


	public state: MainPageState = new MainPageState ();


	public change_page = (new_page: PageType) => {

		if (new_page == PageType.profits) {
			let profits = new ProfitLossData ();
			event_handler.dispatchEvent (new CustomEvent<HoldingsData> ("profit_loss", { detail: this.state.holdings }));
		}// if;

		this.setState ({ page: new_page });

	}// change_page;


	public componentDidMount () {
		popup_window = this.popup_ref.current;
	}// componentDidMount;


	public render = () => <div className="page-layout">

		<PopupWindow id="popup_window" ref={this.popup_ref} />

		<div className="full-width left-aligned">
			<div className="row-block main-menu margin">
				<MainPageContext.Provider value={this}>
					{Object.keys (PageType).map ((key: string) => {
						return <MainMenuItem key={PageType [key]}
							text={PageType [key]} page={PageType [key]} 
							selected_item={this.state.page}>
						</MainMenuItem>
					})}
				</MainPageContext.Provider>
			</div>
		</div>

		<div id="main_body" className="full-page page-layout">{this.active_page}</div>

		<div className="column-margin footer">
			Stockboy Stock Ledger - &copy; Copyright 2024 - The Roger Main Programming Company
		</div>

	</div>


	constructor (props: BaseProps) {

		super (props);

		event_handler.addEventListener ("holdings", () => this.change_page (PageType.activity/*.home*/));
		event_handler.addEventListener ("dividends", ((event: CustomEvent<ProfitLossData>) => this.setState ({ profits: event.detail })) as EventListener);

	}// constructor;

}// MainPage;