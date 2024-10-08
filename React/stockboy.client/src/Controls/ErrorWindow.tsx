import BaseComponent from "Controls/BaseComponent";


class ErrorWindowProps { text: string = null }


export default class ErrorWindow extends BaseComponent<ErrorWindowProps> {

	public render = () => <div className="row-block">
		<img src="Images/error.png" className="eyecandy" />
		{this.props.text}
	</div>

}// ErrorWindow;