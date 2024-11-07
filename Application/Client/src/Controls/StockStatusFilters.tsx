import DataPageControl from "Controls/DataPageControl"

import { CheckboxFilterList, CheckboxFilter } from "Controls/CheckboxFilterList";
import { Component } from "react";


class StockStatusFiltersProps {
	public data_page: DataPageControl;
}// StockStatusFiltersProps;


export default class StockStatusFilters extends Component<StockStatusFiltersProps> {

	public render () {
		return <CheckboxFilterList id="checkbox_list">
			<CheckboxFilter text="Show live stocks" data_page={this.props.data_page} field_name="status" field_value="Live" />
			<CheckboxFilter text="Show dead stocks" data_page={this.props.data_page} checked={false} field_name="status" field_value="Dead" />
			<CheckboxFilter text="Show defunct stocks" data_page={this.props.data_page} checked={false} field_name="status" field_value="Defunct" />
		</CheckboxFilterList>
	}// render;

}// StockStatusFilters;