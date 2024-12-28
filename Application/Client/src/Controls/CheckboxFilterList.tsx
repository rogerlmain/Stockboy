import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { DataFilter, FilterType } from "Classes/Common/Collections";
import { BaseProps } from "Controls/Abstract/BaseProperties";
import { Component, RefObject, createRef } from "react";


class CheckboxFilterProps {
	text: string;
	checked: boolean;
	field_name: string;
	field_value: string;
}// CheckboxFilterProps;


class CheckboxFilterListProps extends BaseProps {
	children: ChildElement;
}// CheckboxFilterListProps;


export class CheckboxFilter extends Component<CheckboxFilterProps> {

	private checkbox: RefObject<HTMLInputElement> = createRef ();


	public data_page: DataPageControl = null;


	/********/


	public static defaultProps: CheckboxFilterProps = {
		text: null,
		checked: true,
		field_name: null,
		field_value: null,
	}// CheckboxFilterProps;


	public update_filter (checkbox: HTMLInputElement) {
		if (checkbox.checked) return this.data_page.filter_handler.add_filter (new DataFilter ({
			id: checkbox.id, 
			field: this.props.field_name,
			value: checkbox.value,
			type: FilterType.inclusive
		}));
		this.data_page.filter_handler.remove_filter (checkbox.id);
	}// update_filter;


	public componentDidMount () {
		this.data_page = this.context as DataPageControl;
		this.data_page.filter_handler.filter_data ();
	}// componentDidMount;


	public render () {

		let id: string = `${this.props.field_value.cleaned}_checkbox`;

		return <div className="container">

			<input type="checkbox" id={id}
				onChange={(event: InputChangeEvent) => this.update_filter (event.currentTarget)}
				ref={this.checkbox} value={this.props.field_value} defaultChecked={this.props.checked}>
			</input>

			<label htmlFor={id}>{this.props.text}</label>

		</div>
	}// render;


	public constructor (props: CheckboxFilterProps) {
		super (props);
		CheckboxFilter.contextType = DataPageContext;
	}// CheckboxFilter;

}// CheckboxFilter;


export class CheckboxFilterList extends Component<CheckboxFilterListProps> {

	private container: RefObject<HTMLDivElement> = createRef ();


	public static defaultProps: CheckboxFilterListProps = {
		children: null,
	}// CheckboxListProps;


	public render () {
		return <div id={this.props.id} className="left-aligned two-column-grid checkbox-list" ref={this.container}>
			{this.props.children}
		</div>
	}// render;

}// CheckboxFilterList;
