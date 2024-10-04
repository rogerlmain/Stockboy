import BaseComponent from "Controls/BaseComponent";


class ErrorWindowProps { text: string = null }


export default class ErrorWindow extends BaseComponent<ErrorWindowProps> {

	public render = () => <div className="row-block">
		<img src="Images/error.png" className="eyecandy" />
		{this.props.text}
		<div className="button-bar">{main_page.popup_window.close_button}</div>
	</div>

}// ErrorWindow;