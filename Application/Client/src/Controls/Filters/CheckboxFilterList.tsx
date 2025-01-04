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


class CheckboxFilterState {
	checked: boolean = false;
}// CheckboxFilterState;


class CheckboxFilterListProps extends BaseProps {
	children: ChildElement;
}// CheckboxFilterListProps;


export class CheckboxFilter extends Component<CheckboxFilterProps, CheckboxFilterState> {

	private checkbox: RefObject<HTMLInputElement> = createRef ();

	private id: string = `${this.props.field_value.cleaned}_checkbox`;


	/********/


	public data_page: DataPageControl = null;


	public static defaultProps: CheckboxFilterProps = {
		text: null,
		checked: false,
		field_name: null,
		field_value: null,
	}// CheckboxFilterProps;


	public update_filter () {
		if (this.state.checked) return this.data_page.filter_handler.add_filter (new DataFilter ({
			id: this.id, 
			field: this.props.field_name,
			value: this.props.field_value,
			type: FilterType.inclusive
		}));
		this.data_page.filter_handler.remove_filter (this.id);
	}// update_filter;


	public componentDidMount () {
		this.data_page = this.context as DataPageControl;
		this.setState ({ checked: this.props.checked });
	}// componentDidMount;


	public componentDidUpdate (props: CheckboxFilterProps, state: CheckboxFilterState) {

		this.data_page.filter_handler.has_inclusive_filters = true;

		if (props?.checked != this.props.checked) this.setState ({ checked: this.props.checked });
		if (state?.checked != this.state.checked) this.update_filter ();

	}// componentDidUpdate;


	public render () {
		return <div className="container">

			<input type="checkbox" id={this.id}
				onChange={(event: InputChangeEvent) => this.setState ({ checked: event.currentTarget.checked })}
				ref={this.checkbox} value={this.props.field_value} defaultChecked={this.props.checked}>
			</input>

			<label htmlFor={this.id}>{this.props.text}</label>

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
