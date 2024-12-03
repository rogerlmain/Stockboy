import { Component } from "react";
import { BaseProps } from "Controls/Abstract/BaseProperties";


const open_eyeball: string = "Images/eyeball.on.svg";
const closed_eyeball: string = "Images/eyeball.off.svg";


class PasswordControlProps {
	public id: string;
	public defaultValue: string;
}// PasswordControlProps;


class PasswordControlState {
	public password_visible: boolean = false;
}// PasswordControlState;


export default class PasswordControl extends Component<PasswordControlProps, PasswordControlState> {

	private toggle_visibility = () => this.setState ({ password_visible: !this.state.password_visible });


	/*********/


	public static defaultProps: PasswordControlProps = { 
		id: null,
		defaultValue: null 
	}// defaultProps;


	public state: PasswordControlState = new PasswordControlState ();


	public render () {
		return <div className="row-centered row-block">
			<input type={this.state.password_visible ? "text" : "password"} id={this.props.id} defaultValue={this.props.defaultValue} />
			<img src={this.state.password_visible ? open_eyeball : closed_eyeball} onClick={this.toggle_visibility} />
		</div>
	}// render;

}// PasswordControl;