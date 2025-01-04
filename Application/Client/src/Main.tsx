import MainMenuItem from "Controls/MainMenuItem";

import ActivityPage from "Pages/Activity";
import BrokersPage from "Pages/Brokers";
import StockDetailsPage from "Pages/Details";
import DividendsPage from "Pages/Dividends";
import HomePage from "Pages/Home";
import ProfitLossPage from "Pages/ProfitLoss";
import SplitsPage from "Pages/Splits";
import TickersPage from "Pages/Tickers";
import TransactionsPage from "Pages/Transactions";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { Component, Context, createContext } from "react";


export enum PageType {
	home = "Home",
	activity = "Activity",
	details = "Details",
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
}// MainPageState;


export const MainPageContext: Context<MainPage> = createContext (null);

export default class MainPage extends Component {

	private get active_page () {
		switch (this.state.page) {
			case PageType.home: return <HomePage />;
			case PageType.activity: return <ActivityPage />;
			case PageType.details: return <StockDetailsPage />;
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


	public change_page = (new_page: PageType) => this.setState ({ page: new_page });


	public render = () => <div className="centered full-page column-block with-row-space">

		<MainPageContext.Provider value={this}>

			<div className="full-width left-aligned row-block">
				<div className="somewhat-spaced-out row-block with-some-headspace">
					{Object.keys (PageType).map ((key: string) => {
						return <MainMenuItem key={PageType [key]}
							text={PageType [key]} page={PageType [key]} 
							selected_item={this.state.page}>
						</MainMenuItem>
					})}
				</div>					
			</div>

			<div className="full-size column-centered column-block with-headspace">{this.active_page}</div>

		</MainPageContext.Provider>


		<div className="column-centered row-block with-some-legroom with-headspace">
			Stockboy Stock Ledger - &copy; Copyright 2024-2025 - The Roger Main Programming Company
		</div>

	</div>


	constructor (props: BaseProps) {
		super (props);
		this.state.page = PageType.dividends;
	}// constructor;

}// MainPage;
