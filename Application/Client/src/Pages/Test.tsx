import { DataKeyArray } from "Classes/DataKeys";
import { Component } from "react";

import StockboyAPI from "Classes/StockboyAPI";
import EditList from "Controls/Common/Lists/EditList";


class TestState {
	public data: DataKeyArray = null;
}// TestState;


export default class TestPage extends Component<Object, TestState> {

	public state: TestState = new TestState ();


	public render () {
		return <div className="full-page column-centered column-block with-lotsa-headspace">
			<EditList id="test_list" close_on_select={false}>
				<option value="first">First</option>
				<option>Second</option>
				<option>Third</option>
				<option>
					<div>Fourth</div>
					<div>and Fifth</div>
				</option>
			</EditList>
		</div>;
	}// render;


	public constructor () {
		super (null);
		new StockboyAPI ().fetch_data ("GetBrokers").then (response => {
			this.setState ({ data: new DataKeyArray (response, ["id", "name"]) });
		});
	}// constructor;

}// TestPage;