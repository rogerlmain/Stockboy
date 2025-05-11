import Eyecandy from "Controls/Common/Eyecandy";

import { Component } from "react";


class LoadingProps {
	public condition: boolean;
	public children?: ReactElementContainer;
}// LoadingProps;


export default class Loading extends Component<LoadingProps> {

	public static defaultProps: LoadingProps = {
		condition: false,
		children: null,
	}// defaultProps;


	public render = () => this.props.condition ? this.props.children : <Eyecandy text="Loading..." />

}// Loading;