import DataPageControl, { DataPageContext } from "Controls/DataPageControl";
import FilterHandler from "Controls/FilterHandler";

import { BoundaryType, DataFilter, FilterType } from "Classes/Common/Collections";
import { BaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, Component, createRef, RefObject } from "react";


class CheckboxDateFilterProps extends BaseModel {
	public boundary: BoundaryType;
}// CheckboxDateFilterProps;


class CheckboxDateFilterState {
	public use_date: boolean = false;
}// CheckboxDateFilterState;


export default class CheckboxDateFilter extends Component<CheckboxDateFilterProps, CheckboxDateFilterState> {

	private date_checkbox: RefObject<HTMLInputElement> = createRef ();
	private date_field: RefObject<HTMLInputElement> = createRef ();


	private get data_page (): DataPageControl { return (this.context as DataPageControl) }
	private get filter_handler (): FilterHandler { return this.data_page.filter_handler }
	private get date_filter_field (): string { return this.data_page.props.date_filter_field }


	private set_date_filter () {
		this.setState ({ use_date: this.date_checkbox.current.checked }, () => {

			if (not_defined (this.date_field.current.value)) return;

			if (this.state.use_date) {
				this.filter_handler.add_filter (new DataFilter ({
					id: this.props.id,
					field: this.date_filter_field, 
					value: this.date_field.current.value,
					type: FilterType.date_range,
					boundary: this.props.boundary
				}));
			} else {
				this.filter_handler.remove_filter (this.props.id);
			}// if;

			this.filter_handler.filter_data ();

		});
	}// set_date_filter;


	/********/


	public static defaultProps: CheckboxDateFilterProps = {
		id: null,
		boundary: null
	}// CheckboxDateFilterState;


	public state: CheckboxDateFilterState = new CheckboxDateFilterState ();


	public render () {
		return <div className="row-centered row-block">
			<label htmlFor="start_date" onClick={() => this.date_checkbox.current.click ()}>Start date</label>
			<input type="checkbox" className="with-a-little-right-space" ref={this.date_checkbox}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					this.setState ({ use_date: event.currentTarget.checked }, () => this.set_date_filter ())
				}}>
			</input>
			<input type="date" id={this.props.id} disabled={!this.state.use_date} ref={this.date_field}
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.set_date_filter ()}>
			</input>
		</div>
	}// render;


	public constructor (props: CheckboxDateFilterProps) {
		super (props);
		CheckboxDateFilter.contextType = DataPageContext;
	}// constructor;

}// CheckboxDateFilter;