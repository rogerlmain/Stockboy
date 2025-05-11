import Optional from "Controls/Common/Optional";
import DividendDetailsPage from "Pages/Details/Dividends";
import StockDetailsPage from "Pages/Details/Stocks";

import { Component } from "react";


enum DetailsSelection { stocks, dividends }


class DetailsPageState {
	public selection: DetailsSelection = null;
}// DetailsPageState;


export default class DetailsPage extends Component<Object, DetailsPageState> {

	public state: DetailsPageState = new DetailsPageState ();


	public render () {
		return <div className="full-size flex-grid">
		
			<div className="spaced-out top-aligned full-page row-block">

				<div className="two-column-grid">

					<input type="radio" id="stock_selection" name="details_selection" value={DetailsSelection.stocks} 
						onClick={() => this.setState ({ selection: DetailsSelection.stocks })} />
					<label htmlFor="stock_selection" className="left-aligned">Stocks</label>

					<input type="radio" id="dividend_selection" name="details_selection" value={DetailsSelection.dividends} 
						onClick={() => this.setState ({ selection: DetailsSelection.dividends })}/>
					<label htmlFor="dividend_selection" className="left-aligned">Dividends</label>

				</div>

				<Optional condition={this.state.selection == DetailsSelection.dividends}><DividendDetailsPage /></Optional>
				<Optional condition={this.state.selection == DetailsSelection.stocks}><StockDetailsPage /></Optional>

			</div>

		</div>
	}// render;


	public constructor (props: Object) {
		super (props);
		this.state.selection = DetailsSelection.dividends;
	}// constructor;

}// DetailsPage;