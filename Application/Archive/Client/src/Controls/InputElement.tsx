import { BaseProps } from "Controls/Abstract/BaseProperties";
import { cloneElement, Component, Context, createContext, createRef, ReactElement, RefObject } from "react";


class InputElementProps extends BaseProps {
	label?: string;
	children: any;

required?: boolean;

}// InputElementProps;


export const InputElementContext: Context<InputElement> = createContext (null);


export default class InputElement extends Component<InputElementProps> {

	private container: RefObject<HTMLDivElement> = createRef ();


	/********/


	public static defaultProps: InputElementProps = {
		label: null,
		children: null,
	}// defaultProps;


	public componentDidMount () {
		this.container.current.querySelectorAll<FormField> (form_fields).forEach ((element: FormField) => {
			element.addEventListener (element.type == "select" ? "change" : "keyup", () => {
				if (is_defined (element.value)) return element.style.border = "solid 1px red";
				element.style.removeProperty ("border");
			});
		});
	}// componentDidMount;


	public render () {

		let child_list = Array.isArray (this.props.children) ? this.props.children : [this.props.children];

		return <InputElementContext.Provider value={this}>
			<div className={"container"} ref={this.container}>

				{isset (this.props.label) ? <label htmlFor={this.props.id}>{this.props.label}</label> : null}

				{child_list.map ((child: ReactElement) => {

					let props = {...child.props,
						id: this.props.id,
						name: this.props.id,
						key: this.props.id,
					}// props;

					return cloneElement (child, props);
			
				})}

			</div>
		</InputElementContext.Provider>

	}// render;

}// InputElement;