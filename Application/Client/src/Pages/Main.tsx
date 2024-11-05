import HoldingsData from "Classes/HoldingsData";
import ProfitLossData from "Classes/ProfitLossData";

import MainMenuItem from "Controls/MainMenuItem";
import PopupWindow from "Controls/PopupWindow";

import ActivityPage from "Pages/Activity";
import BrokersPage from "Pages/Brokers";
import DividendsPage from "Pages/Dividends";
import HomePage from "Pages/Home";
import ProfitLossPage from "Pages/ProfitLoss";
import SplitsPage from "Pages/Splits";
import TickersPage from "Pages/Tickers";
import TransactionsPage from "Pages/Transactions";

import { MainPageContext } from "Classes/Contexts";
import { BaseProps } from "Controls/Abstract/BaseProperties";
import { Component, createRef, RefObject } from "react";


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


export default class MainPage extends Component {


	private popup_ref: RefObject<PopupWindow> = createRef ();


	private get active_page () {
		switch (this.state.page) {
			case PageType.home: return <HomePage />;
			case PageType.activity: return <ActivityPage />;
			case PageType.transactions: return <TransactionsPage />;
			case PageType.dividends: return <DividendsPage />;
			case PageType.splits: return <SplitsPage />;
			case PageType.brokers: return <BrokersPage />;
			case PageType.tickers: return <TickersPage />;
			case PageType.profits: return <ProfitLossPage />;
		}// switch;
	}// active_page;


	/********/


	public state: MainPageState = new MainPageState ();


	public change_page = (new_page: PageType) => {
		if (new_page == PageType.profits) event_handler.dispatchEvent (new CustomEvent<HoldingsData> ("profit-loss", { detail: this.state.holdings }));
		this.setState ({ page: new_page });
	}// change_page;


	public componentDidMount () {
		popup_window = this.popup_ref.current;
	}// componentDidMount;


	public render = () => <div className="centered full-page column-block">

		<PopupWindow id="popup_window" ref={this.popup_ref} />

		<div className="full-width left-aligned row-block">
			<MainPageContext.Provider value={this}>
				<div className="somewhat-spaced-out row-block with-some-headspace">
					{Object.keys (PageType).map ((key: string) => {
						return <MainMenuItem key={PageType [key]}
							text={PageType [key]} page={PageType [key]} 
							selected_item={this.state.page}>
						</MainMenuItem>
					})}
				</div>					
			</MainPageContext.Provider>
		</div>

		<div className="full-size column-centered column-block with-headspace">{this.active_page}</div>

		<div className="column-centered row-block with-some-legroom with-headspace">
			Stockboy Stock Ledger - &copy; Copyright 2024 - The Roger Main Programming Company
		</div>

	</div>


	constructor (props: BaseProps) {
		super (props);
		this.state.page = PageType.transactions;
	}// constructor;

}// MainPage;