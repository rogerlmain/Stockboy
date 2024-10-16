import BaseControl from "Controls/Abstract/BaseControl";

import { MouseEvent } from "react";


class LinkProps {
	command: Function = null;
	text: string = null;
}// LinkProps;


export default class Link extends BaseControl<LinkProps> {

	public render = () => <a href="about:blank" onClick={(event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault ();
		this.props.command ();
	}}>{this.props.text}</a>

}// Link;