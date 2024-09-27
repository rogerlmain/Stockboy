import BaseComponent from "Controls/BaseComponent";


class LinkProps {
	command: Function = null;
	text: string = null;
}// LinkProps;


export default class Link extends BaseComponent<LinkProps> {

	public render = () => <a href="about:blank" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault ();
		this.props.command ();
	}}>{this.props.text}</a>

}// Link;