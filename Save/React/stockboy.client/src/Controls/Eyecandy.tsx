import React from "react";

class EyecandyProps {
	command?: Function = null;
	text: String = null;
}// EyecandyProps;


export default class Eyecandy extends React.Component<EyecandyProps> {

	public componentDidMount () {
		if (isset (this.props.command)) this.props.command ();
	}// componentDidMount;


	public render = () => <div className="row-block">
		<img src="Images/eyecandy.gif" className="eyecandy" />
		{this.props.text}
	</div>

}// TransactionEyecandy;

