import DataPageControl from "Controls/DataPageControl";

import { DataFilter, FilterType } from "Classes/Collections";
import { BaseProps } from "Controls/Abstract/BaseProperties";
import { ChangeEvent, Component, ReactElement, RefObject, createRef } from "react";


interface HTMLCheckboxElement extends HTMLInputElement {
	update_filter?: Function;
}// HTMLCheckboxElement;


class CheckboxFilterListProps extends BaseProps {
	children: Array<ReactElement>
}// CheckboxFilterListProps;


class CheckboxFilterProps {
	text: string;
	checked: boolean;
	data_page: DataPageControl;
	field_name: string;
	field_value: string;
}// CheckboxFilterProps;


export class CheckboxFilterList extends Component<CheckboxFilterListProps> {

	private container: RefObject<HTMLDivElement> = createRef ();

	public static defaultProps: CheckboxFilterListProps = {
		children: null,
	}// CheckboxListProps;


	public update_filters () {
		this.container.current.querySelectorAll ("input").forEach ((element: HTMLCheckboxElement) => element.update_filter ())
	}// update_filters;


	public render () {
		return <div id={this.props.id} className="right-aligned two-column-grid checkbox-list" ref={this.container}>
			{this.props.children}
		</div>
	}// render;

}// CheckboxFilterList;


export class CheckboxFilter extends Component<CheckboxFilterProps> {

	private checkbox: RefObject<HTMLCheckboxElement> = createRef ();


	/********/


	public static defaultProps: CheckboxFilterProps = {
		text: null,
		checked: true,
		data_page: null,
		field_name: null,
		field_value: null,
	}// CheckboxFilterProps;


	public update_filter (checkbox: HTMLCheckboxElement) {
		if (checkbox.checked) return this.props.data_page.add_filter (new DataFilter (this.props.field_name, checkbox.value, FilterType.inclusive));
		this.props.data_page.remove_filter (this.props.field_name, checkbox.value);
	}// update_filter;


	public componentDidMount () {
		this.checkbox.current.update_filter = () => this.update_filter (this.checkbox.current);
		this.checkbox.current.update_filter ();
	}// componentDidMount;


	public render () {
		return <div className="container">

			<input type="checkbox" id={`${this.props.field_value}_checkbox`}
				onChange={(event: ChangeEvent<HTMLCheckboxElement>) => this.update_filter (event.currentTarget)}
				ref={this.checkbox} value={this.props.field_value} defaultChecked={this.props.checked}>
			</input>

			<label htmlFor={`${this.props.field_value}_checkbox`}>{this.props.text}</label>

		</div>
	}// render;

}// CheckboxFilter;


