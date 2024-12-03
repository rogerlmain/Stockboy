import { Component, ReactElement } from "react";
import { renderToString } from "react-dom/server";


export default class BaseComponent<TProps = Object, TState = Object> extends Component<TProps, TState> {

	protected rendered_element (item: ReactElement): HTMLElement {

		if (is_null (item)) return null;

		let dom_element: HTMLDivElement = document.createElement ("div");

		dom_element.innerHTML = renderToString (item);
		return dom_element.querySelector ("option");

	}// rendered_element;

}// BaseComponent;