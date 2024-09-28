import React from "react";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import StylesheetList from "Classes/StylesheetList";

import { NameValueCollection } from "Classes/Collections";


class PopupWindowProps extends BaseProps {
	children?: String | React.ReactElement = null;
	buttons?: NameValueCollection = null;
	closable?: boolean = false;
}// PopupWindowProps;


class PopupWindowState {
	contents: String | React.ReactElement = null;
	buttons: NameValueCollection = null;
	visible: boolean = false;
	closable: boolean = false;
}// PopupWindowState;


export default class PopupWindow extends BaseComponent<PopupWindowProps> {


	private static styles: String = `
		position: absolute;
		left: 50%;
		top: 25%;
		transform: translate(-50%);
		padding: 2em;
		border: var(--popup-border);
		border-radius: 0.2rem;
		filter: drop-shadow(0.15em 0.15em 0.1em #666);
		background-color: #FFFFFD;
		transition: opacity 0.25s ease-in-out;
	`;


	private close_button: NameValueCollection = new NameValueCollection ({ Close: () => this.setState ({ visible: false }) });


	private button_list = (): React.ReactElement => is_null (this.state.buttons) ? null : <div className="button-bar">
		{ Object.keys (this.state.buttons).map ((key: String) => <button key={this.next_key} onClick={this.state.buttons [key as keyof NameValueCollection]}>{key}</button>) }
	</div>


	/********/


	public state: PopupWindowState = new PopupWindowState ();


	public constructor (props: PopupWindowProps) {

		super (props);
		StylesheetList.add_stylesheet ("div.popup-window", PopupWindow.styles);

		if (isset (this.props.children)) this.state.contents = this.props.children;

		if (this.props.closable) {
			this.state.buttons = this.close_button;
			this.state.closable = true;
		}// if;

	}// constructor;


	public show (contents?: String | React.ReactElement, buttons?: NameValueCollection, closable: boolean = false) {

		let new_state = new NameValueCollection ({ buttons: null });

		if (isset (contents)) new_state ["contents"] = contents;

		if (closable) {
			if (not_set (buttons)) buttons = new NameValueCollection ();
			buttons.merge (this.close_button);
			new_state ["closable"] = true;
		}// if;

		if (isset (buttons)) new_state ["buttons"] = buttons;

		return this.setState (new_state, () => this.setState ({ visible: true }));

	}// show;


	public hide = () => this.setState ({ visible: false });


	public render = () => <div className="popup-window column-block" style={{ display: (this.state.visible ? "flex" : "none") }}>
		<div>{this.state.contents}</div> 
		{this.button_list ()}
	</div>

}// PopupWindow;