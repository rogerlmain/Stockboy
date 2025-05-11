import { Component } from "react";


class OptionalProps {
	public condition: boolean;
	public children: ReactElementContainer;
}// OptionalProps;

export default class Optional extends Component<OptionalProps> {

	public render = () => this.props.condition ? this.props.children : String.Empty;

}// Optional;