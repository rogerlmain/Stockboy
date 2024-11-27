import EyecandyButton from "Controls/Common/EyecandyButton";
import Link from "Controls/Link";
import PasswordControl from "Controls/PasswordControl";

import StockboyAPI from "Classes/StockboyAPI";
import BasePage from "Pages/Base";

import { createHash } from "crypto";
import { Component } from "react";


class SignupPageProps {
	public base_page: BasePage;
}//SignupPageProps;


class SignupPageState {
	public signing_up: boolean = false;
	public account_created: boolean = false;
	public warning: string = null;
}// SignupPageState;


export default class SignupPage extends Component<SignupPageProps, SignupPageState> {

	private api = new StockboyAPI ();

	private submit_application () {

		const password: string = (document.getElementById ("password") as HTMLInputElement).value;
		const form_data: FormData = new FormData ();

		form_data.append ("email_address", (document.getElementById ("email_address") as HTMLInputElement).value);
		form_data.append ("password", createHash ("sha256").update (password).digest ("hex"));

		this.api.fetch_data ("SaveUser", form_data).then ((response) => {
			this.setState ({ account_created: true });
		}).catch (() => this.setState ({ signing_up: false }));

	}// submit_application;


	private validate_email_address (email_address: string) {
		this.api.fetch_data ("ValidateEmailAddress", { text: email_address }).then ((response) => {
			this.setState ({ warning: response.message });
		});
	}// validate_email_address;


	/********/


	public static defaultProps: SignupPageProps = { base_page: null }


	public state: SignupPageState = new SignupPageState ();


	public render () {
		return <div className="centered full-page">
			{this.state.account_created ? <div>
				Your account has been created.&nbsp;<Link text="Click here" command={() => this.props.base_page.setState ({ new_account: false })} />&nbsp; to log in.
			</div> : <div className="column-block">

				<div className="two-column-grid">

					<div className="all-columns row-centered row-block warning" 
						style={{ 
							visibility: isset (this.state.warning) ? "visible" : "hidden",
							minHeight: "1.11em"
						}}>
						{this.state.warning}
					</div>

					<label htmlFor="email_address">Select a username</label>
					<input id="email_address" onKeyUp={(event: KeyEvent) => {
						this.validate_email_address ((event.currentTarget as HTMLInputElement).value)
					}} />

					<label htmlFor="password">Select a password</label>
					<PasswordControl id="password" />

				</div>

				<div className="button-bar">
					<EyecandyButton text="Signing up..." eyecandy_visible={this.state.signing_up}
						onClick={() => this.setState ({ signing_up: true }, () => this.submit_application ())}>
						Sign up
					</EyecandyButton>
				</div>

				<div className="right-aligned full-width row-block with-headspace">
					Already have an account?&nbsp;<Link text="Click here" command={() => this.props.base_page.setState ({ new_account: false })} />&nbsp;to log in.
				</div>

			</div>}
		</div>
	}// render;

}// SignupPage;