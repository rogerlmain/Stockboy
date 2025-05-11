import { Component } from "react"


class ErrorWindowProps { 
	text: string = null;
	onClose?: Function = null;
}// ErrorWindowProps;


export default class ErrorWindow extends Component<ErrorWindowProps> {

	public render = () => <div className="column-block">
		<div className="wrappable row-block">
			<img src="Images/error.png" className="eyecandy" />
			{this.props.text}
		</div>
		<div className="button-bar">{popup_window.close_button (this.props.onClose)}</div>
	</div>

}// ErrorWindow;