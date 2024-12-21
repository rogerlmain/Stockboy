import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { DataFilter, FilterType } from "Classes/Common/Collections";
import { CheckboxFilter, CheckboxFilterList } from "Controls/CheckboxFilterList";
import { Component } from "react";


export default class StockStatusFilters extends Component {

	public componentDidMount () {
		(this.context as DataPageControl).filter_handler.add_filter (new DataFilter ("status", "Live", FilterType.inclusive))
	}// componentDidMount;


	public render () {
		return <CheckboxFilterList id="checkbox_list">
			<CheckboxFilter text="Show live stocks" field_name="status" field_value="Live" />
			<CheckboxFilter text="Show dead stocks" checked={false} field_name="status" field_value="Dead" />
			<CheckboxFilter text="Show defunct stocks" checked={false} field_name="status" field_value="Defunct" />
		</CheckboxFilterList>
	}// render;


	public constructor (props: Object) {
		super (props);
		StockStatusFilters.contextType = DataPageContext;
	}// constructor;

}// StockStatusFilters;