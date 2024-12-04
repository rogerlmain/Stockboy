import { Component, RefObject, createRef } from "react";

import StockboyAPI from "Classes/StockboyAPI";
import PopupWindow from "../Controls/Common/Windows/PopupWindow";


class TestState {
	public data: String = null;
}// TestState;


export default class TestPage extends Component<Object, TestState> {

	public state: TestState = new TestState ();

	public test_form: RefObject<HTMLFormElement> = createRef ();
	public popup: RefObject<PopupWindow> = createRef ();


	public componentDidMount () {
		popup_window = this.popup.current;
	}// componentDidMount;


	public render () {
		return <div className="centered full-page">
			<PopupWindow id="popup_window" ref={this.popup} />
			<div className="column-centered column-block">
				<div>Testing</div>

				<button onClick={() => {

					new StockboyAPI ().fetch_data ("TestMe", { value: "some value", user_id: "a6317141-c3cf-41cb-bae3-17545a067958" }).then (response => {
						this.setState ({ data: JSON.stringify (response) });
					});

				}}>Doit</button>

				<div>{this.state.data}</div>
			</div>
		</div>
	}// render;

}// TestPage;