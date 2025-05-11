import StockboyAPI from "Classes/StockboyAPI";
import PieChart from "Controls/Graphs/PieChart";

import { GraphData, GraphDataList } from "Models/Dividends";
import { Component } from "react";


export default class TestPage extends Component {

	private get test_values (): GraphDataList {

		let result = new GraphDataList ();

		result.push (new GraphData ().assign ({ description: "First item",	value: 22 }));
		result.push (new GraphData ().assign ({ description: "Second item",	value: 14 }));
		result.push (new GraphData ().assign ({ description: "Third item",	value: 37 }));
		result.push (new GraphData ().assign ({ description: "Fourth item",	value: 19 }));
		result.push (new GraphData ().assign ({ description: "Fifth item",	value:  8 }));

		return result;

	}// test_values;


	public render () {
		return <div className="centered full-page spaced-out column-block">

			<div style={{
				width: "200px",
				height: "200px",
				position: "relative",
				borderRadius: "100%",
				border: "solid 1px black"
			}}>
			
				<div style={{
					position: "absolute",
					width: "0",
//width: "100px",
					height: "100px",
					borderLeft: "solid 1px black",
//border: "solid 1px black",
					left: "100px",
					transformOrigin: "0 100%",
					transform: "rotate(45deg)"
				}} />
			
			</div>


			<PieChart values={this.test_values} index_field="description" value_field="value" size="200px" />

		</div>
	}// render;


	public constructor (props: Object) {
		super (props);
		new StockboyAPI ().fetch_data ("TestMe")
	}// constructor;

}// TestPage;