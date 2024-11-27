import { Component, MouseEventHandler } from "react";
import Eyecandy from "Controls/Common/Eyecandy";


class EyecandyButtonProps {

	public text: String;
	public children: any;
	public eyecandy_visible: boolean;

	public onClick: MouseEventHandler<HTMLButtonElement>;

}// EyecandyButtonProps;


class EyecandyButtonState {
	public eyecandy_visible: boolean;
}// EyecandyButtonState;


export default class EyecandyButton extends Component<EyecandyButtonProps, EyecandyButtonState> {

	private click_handler = (event: ButtonClickEvent) => this.setState ({ eyecandy_visible: true }, () => this.props.onClick (event));


	public static defaultProps: EyecandyButtonProps = {
		text: null,
		onClick: null,
		children: null,
		eyecandy_visible: null,
	}// defaultProps;


	public state: EyecandyButtonState = new EyecandyButtonState ();


	public componentDidUpdate (props: EyecandyButtonProps) {
		if (this.props.eyecandy_visible != props.eyecandy_visible) this.setState ({ eyecandy_visible: this.props.eyecandy_visible });
	}// componentDidUpdate;


	public componentDidMount () {
		this.state.eyecandy_visible = this.props.eyecandy_visible;
	}// componentDidMount;

	
	public render () {
		switch (this.state.eyecandy_visible) {
			case true: return <Eyecandy text={this.props.text} />
			default: return <button onClick={(event: ButtonClickEvent) => this.click_handler (event)}>{this.props.children}</button>
		}// switch;
	}// render;

}// EyecandyButton;