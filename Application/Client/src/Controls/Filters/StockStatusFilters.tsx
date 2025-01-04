import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { DataFilter, FilterType } from "Classes/Common/Collections";
import { CheckboxFilter, CheckboxFilterList } from "Controls/Filters/CheckboxFilterList";
import { Component } from "react";


export default class StockStatusFilters extends Component {

	public render () {
		return <div style={{ position: "absolute" }}>
			<CheckboxFilterList id="checkbox_list">
				<CheckboxFilter text="Show live stocks" field_name="status" field_value="Live" checked={true} />
				<CheckboxFilter text="Show dead stocks" checked={false} field_name="status" field_value="Dead" />
				<CheckboxFilter text="Show defunct stocks" checked={false} field_name="status" field_value="Defunct" />
			</CheckboxFilterList>
		</div>
	}// render;


	public constructor (props: Object) {
		super (props);
		StockStatusFilters.contextType = DataPageContext;
	}// constructor;

}// StockStatusFilters;