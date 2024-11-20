import DataPageControl, { FilterHandlerContext } from "Controls/DataPageControl";
import FilterHandler from "Controls/FilterHandler";

import { DataFilter, FilterType } from "Classes/Collections";
import { BaseProps } from "Controls/Abstract/BaseProperties";
import { Component, RefObject, createRef } from "react";


class CheckboxFilterProps {
	text: string;
	checked: boolean;
	data_page: DataPageControl;
	field_name: string;
	field_value: string;
}// CheckboxFilterProps;


class CheckboxFilterState {
	filter_handler: FilterHandler = null;
}// CheckboxFilterState;


class CheckboxFilterListProps extends BaseProps {
	children: ChildElement;
}// CheckboxFilterListProps;


export class CheckboxFilter extends Component<CheckboxFilterProps, CheckboxFilterState> {

	private checkbox: RefObject<HTMLInputElement> = createRef ();


	/********/


	public state: CheckboxFilterState = new CheckboxFilterState ();


	public static defaultProps: CheckboxFilterProps = {
		text: null,
		checked: true,
		data_page: null,
		field_name: null,
		field_value: null,
	}// CheckboxFilterProps;


	public update_filter (checkbox: HTMLInputElement) {
		if (checkbox.checked) return this.state.filter_handler?.add_filter (new DataFilter (this.props.field_name, checkbox.value, FilterType.inclusive));
		this.state.filter_handler?.remove_filter (this.props.field_name, checkbox.value);
	}// update_filter;


	public componentDidUpdate (props: CheckboxFilterProps, state: CheckboxFilterState) {
		if ((props) && (this.state?.filter_handler != state?.filter_handler)) this.update_filter (this.checkbox.current);
	}// componentDidUpdate;


	public render () {

		return <FilterHandlerContext.Consumer>
			{(handler: FilterHandler) => {

				{isset (handler) && (handler !== this.state?.filter_handler) ? this.setState ({filter_handler: handler}) : null}
				
				return <div className="container">

					<input type="checkbox" id={`${this.props.field_value}_checkbox`}
						onChange={(event: InputChangeEvent) => this.update_filter (event.currentTarget)}
						ref={this.checkbox} value={this.props.field_value} defaultChecked={this.props.checked}>
					</input>

					<label htmlFor={`${this.props.field_value}_checkbox`}>{this.props.text}</label>

				</div>

			}}
		</FilterHandlerContext.Consumer> 

	}// render;

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
