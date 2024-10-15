import NameValueCollection from "Classes/Collections";

import React, { RefObject, ReactElement, Context, createRef, cloneElement, createContext } from "react";
import EditForm, { EditFormContext } from "Forms/EditForm";

import { BaseComponent, BaseProps } from "Controls/BaseComponent";


class InputElementProps extends BaseProps {
	children: any;
	label?: string;
	required?: boolean;
}// InputElementProps;


export const InputElementContext: Context<InputElement> = createContext (null);


export default class InputElement extends BaseComponent<InputElementProps> {

	private input_element_ref: RefObject<HTMLDivElement> = createRef ();


	/********/


	public static contextType = EditFormContext;

	public static defaultProps: InputElementProps = {
		children: null,
		label: null,
		required: true,
	}// defaultProps;


	public handle_change (element: FormItem) {
		if ((this.context as EditForm).state.complete) return;
		if (not_defined (element.value)) return element.style.border = "solid 1px red";
		element.style.removeProperty ("border");
	}// handle_change;


	public componentDidMount () {
		this.input_element_ref.current.querySelectorAll<FormInputItem> ("input, textarea").forEach ((element: FormInputItem) => {
			element.addEventListener ("keyup", () => this.handle_change (element));
		});
	}// componentDidMount;


	public render () {

		let child_list = Array.isArray (this.props.children) ? this.props.children : [this.props.children];

		return <InputElementContext.Provider value={this}>
			<div name="input_element" className={`${this.props.required ? "required" : String.Empty} container`} ref={this.input_element_ref}>

				{isset (this.props.label) ? <label htmlFor={this.props.id}>{this.props.label}</label> : String.Empty}

				{child_list.map ((child: ReactElement) => {
				
					let element: ReactElement = cloneElement (child, {...child.props,
						id: this.props.id,
						name: this.props.id,
					});

					return element;
			
				})}

			</div>
		</InputElementContext.Provider>

	}// render;

}// InputElement;