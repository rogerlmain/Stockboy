import StockboyAPI from "Classes/StockboyAPI";
import EyecandyButton from "Controls/Common/EyecandyButton";
import Link from "Controls/Link";
import PasswordControl from "Controls/PasswordControl";
import BasePage from "Pages/Base";

import { createHash } from "crypto";
import { Component } from "react";


class LoginPageProps {
	public base_page: BasePage;
}// LoginPageProps;


class LoginPageState {
	public logging_in: boolean = false;
}// LoginPageState;


export default class LoginPage extends Component<LoginPageProps, LoginPageState> {

	private submit_credentials () {

		const remember_me: Boolean = (document.getElementById ("remember_me") as HTMLInputElement).checked;
		const password: string = (document.getElementById ("password") as HTMLInputElement).value;
		const form_data: FormData = new FormData ();

		form_data.append ("email_address", (document.getElementById ("email_address") as HTMLInputElement).value);
		form_data.append ("password", createHash ("sha256").update (password).digest ("hex"));

		new StockboyAPI ().fetch_data ("LoginUser", form_data).then ((response) => {
			if (response.message.matches ("validated")) {

				// TO DO: Encrypt end user credentials including full name, administrator status and user id
				switch (remember_me) {
					case true: localStorage.setItem ("key", response.user_id); break;
					default: sessionStorage.setItem ("key", response.user_id); break;
				}// switch;
				this.props.base_page.forceUpdate ();
			}// if;
		}).catch (() => this.setState ({ logging_in: false }));

	}// submit_credentials;


	/********/


	public static defaultProps: LoginPageProps = { base_page: null }


	public state: LoginPageState = new LoginPageState ();


	public render () {
		return <div className="centered full-page">
			<div className="column-block">

				<div className="two-column-grid">

					<label htmlFor="email_address">Email address</label>
					<input id="email_address" defaultValue={ window.debugging ? "rex@rogerlmain.com" : null } />

					<label htmlFor="password">Password</label>
					<PasswordControl id="password" defaultValue={ window.debugging ? "Strange-1" : null } />

				</div>

				<div className="totally-spaced-out second-column row-block">

					<div className="a-little-spaced-out row-centered row-block with-some-headspace">
						<input type="checkbox" id="remember_me" />
						<label htmlFor="remember_me">Remember me</label>
					</div>

					<div className="button-bar">

						<EyecandyButton text="Logging in..." eyecandy_visible={this.state.logging_in}
							onClick={() => this.setState ({ logging_in: true }, () => this.submit_credentials ())}>
							Log In
						</EyecandyButton>

					</div>

				</div>

				<div className="right-aligned all-columns row-block with-headspace">
					No account? No problem.&nbsp;<Link text="Click here" command={() => this.props.base_page.setState ({ new_account: true })} />&nbsp;to open an account.
				</div>

			</div>
		</div>
	}// render;

}// LoginPage;