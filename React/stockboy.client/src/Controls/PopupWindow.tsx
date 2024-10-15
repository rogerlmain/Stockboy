import React, { ReactElement, MouseEvent } from "react";
import { BaseComponent, BaseProps } from "Controls/BaseComponent";


class PopupWindowProps extends BaseProps {
	children?: String | ReactElement = null;
}// PopupWindowProps;


class PopupWindowState {
	contents: String | ReactElement = null;
	visible: boolean = false;
}// PopupWindowState;


export default class PopupWindow extends BaseComponent<PopupWindowProps> {

	public state: PopupWindowState = new PopupWindowState ();

	public close_button: ReactElement = <button onClick={(event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault ();
		this.hide ();
	}}>Close</button>;


	public constructor (props: PopupWindowProps) {
		super (props);
		if (isset (this.props.children)) this.state.contents = this.props.children;
	}// constructor;


	public show = (contents: String | ReactElement = this.state.contents) => this.setState ({ contents }, () => this.setState ({ visible: true }));


	public hide = () => this.setState ({ visible: false }, () => this.setState ({contents: null}));


	public render = () => <div className="full-screen" style={{ display: (this.state.visible ? "flex" : "none") }}>
		<div className="blackout"></div>
		<div className="popup-window column-block">{this.state.contents}</div>
	</div>

}// PopupWindow;