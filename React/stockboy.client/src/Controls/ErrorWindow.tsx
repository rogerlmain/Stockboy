import BasePage from "Pages/Abstract/BasePage";


class ErrorWindowProps { text: string = null }


export default class ErrorWindow extends BasePage<ErrorWindowProps> {

	public render = () => <div className="row-block">
		<img src="Images/error.png" className="eyecandy" />
		{this.props.text}
		<div className="button-bar">{popup_window.close_button}</div>
	</div>

}// ErrorWindow;