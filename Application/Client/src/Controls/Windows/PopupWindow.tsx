import { BaseProps } from "Controls/Abstract/BaseProperties";
import { Component, MouseEvent, ReactElement } from "react";


class PopupWindowProps extends BaseProps {
	children?: String | ReactElement = null;
}// PopupWindowProps;


class PopupWindowState {
	contents: String | ReactElement = null;
	visible: boolean = false;
}// PopupWindowState;


export default class PopupWindow extends Component<PopupWindowProps> {

	public state: PopupWindowState = new PopupWindowState ();

	public close_button = (onClose: Function = null): ReactElement => <button onClick={(event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault ();
		this.hide ();
		if (isset (onClose)) onClose ();
	}}>Close</button>;


	public constructor (props: PopupWindowProps) {
		super (props);
		if (isset (this.props.children)) this.state.contents = this.props.children;
	}// constructor;


	public show = (contents: String | ReactElement = this.state.contents) => this.setState ({ contents }, () => this.setState ({ visible: true }));


	public hide = () => this.setState ({ visible: false }, () => this.setState ({contents: null}));


	public render () {
		return <div className="full-screen" style={{ display: (this.state.visible ? "flex" : "none") }}>
			<div className="blackout"></div>
			<div className="popup-window">{this.state.contents}</div>
		</div>
	}// render;

}// PopupWindow;