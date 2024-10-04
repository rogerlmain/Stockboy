import React, { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";

import parse from "html-react-parser";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import SelectList from "Controls/Lists/SelectList";

import { NameValueCollection } from "Classes/Collections";
import HTMLReactParser from "html-react-parser";


class ButtonCollection extends NameValueCollection<React.MouseEventHandler<HTMLButtonElement>> {}


class PopupWindowProps extends BaseProps {
	children?: String | React.ReactElement = null;
}// PopupWindowProps;


class PopupWindowState {
	contents: String | React.ReactElement = null;
	visible: boolean = false;
}// PopupWindowState;


export default class PopupWindow extends BaseComponent<PopupWindowProps> {

	public state: PopupWindowState = new PopupWindowState ();

	public close_button: ReactElement = <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault ();
		this.hide ();
	}}>Close</button>;


	public constructor (props: PopupWindowProps) {
		super (props);
		if (isset (this.props.children)) this.state.contents = this.props.children;
	}// constructor;


	public show = (contents: String | React.ReactElement = this.state.contents) => this.setState ({ contents }, () => this.setState ({ visible: true }));


	public hide = () => this.setState ({ visible: false });


	public render = () => <div style={{ display: (this.state.visible ? "flex" : "none") }}>
		<div className="blackout"></div>
		<div className="popup-window column-block">{this.state.contents}</div>
	</div>

}// PopupWindow;