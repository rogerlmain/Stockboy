import BaseComponent from "Controls/BaseComponent";
import { MouseEvent } from "react";


class LinkProps {
	command: Function = null;
	text: string = null;
}// LinkProps;


export default class Link extends BaseComponent<LinkProps> {

	public render = () => <a href="about:blank" onClick={(event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault ();
		this.props.command ();
	}}>{this.props.text}</a>

}// Link;