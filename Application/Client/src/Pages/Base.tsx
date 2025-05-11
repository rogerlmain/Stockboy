import PopupWindow from "Controls/Windows/PopupWindow";

import MainPage from "Main";

import LoginPage from "Pages/Login";
import SignupPage from "Pages/SignupPage";

import { Component, createRef, ReactElement, RefObject } from "react";


class BasePageState {
	public new_account: boolean = false;
}// BasePageState;


export default class BasePage extends Component<Object, BasePageState> {

	private popup: RefObject<PopupWindow> = createRef ();


	private get active_page (): ReactElement {
		if (Validated) return <MainPage />
		if (this.state.new_account) return <SignupPage base_page={this} />
		return <LoginPage base_page={this} />
	}// active_page;


	/********/


	public state: BasePageState = new BasePageState ();


	public componentDidMount () {
		popup_window = this.popup.current;
		base_page = this;
	}// componentDidMount;


	public render () {
		return <div className="container">
			<PopupWindow id="popup_window" ref={this.popup} />
			{this.active_page}
		</div>
	}// render;

}// BasePage;


