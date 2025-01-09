import { Component } from "react";

import StockboyAPI from "Classes/StockboyAPI";


export default class TestPage extends Component {

	public render () {
		return <div className="centered full-page">
		</div>
	}// render;


	public constructor (props: Object) {
		super (props);
		new StockboyAPI ().fetch_data ("TestMe")
	}// constructor;

}// TestPage;