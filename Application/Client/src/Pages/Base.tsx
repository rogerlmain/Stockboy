import PopupWindow from "Controls/Common/Windows/PopupWindow";

import LoginPage from "Pages/Login";
import MainPage from "Pages/Main";
import SignupPage from "Pages/SignupPage";

import { Component, createRef, ReactElement, RefObject } from "react";


class BasePageState {
	public new_account: boolean = false;
}// BasePageState;


export default class BasePage extends Component<Object, BasePageState> {

	private popup_ref: RefObject<PopupWindow> = createRef ();


	private get active_page (): ReactElement {
		if (Validated) return <MainPage />
		if (this.state.new_account) return <SignupPage base_page={this} />
		return <LoginPage base_page={this} />
	}// active_page;


	/********/


	public state: BasePageState = new BasePageState ();


	public componentDidMount () {
		popup_window = this.popup_ref.current;
	}// componentDidMount;


	public render () {
		return <div className="container">
			<PopupWindow id="popup_window" ref={this.popup_ref} />
			{this.active_page}
		</div>
	}// render;

}// BasePage;


