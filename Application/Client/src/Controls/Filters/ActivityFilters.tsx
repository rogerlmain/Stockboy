import BaseComponent from "Classes/Common/BaseComponent"
import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { CheckboxFilterList, CheckboxFilter } from "Controls/Filters/CheckboxFilterList"
import { DataFilter, FilterType } from "Classes/Common/Collections";


export default class ActivityFilters extends BaseComponent {

	public render () {
		return <CheckboxFilterList id="checkbox_list">
			<CheckboxFilter text="Buys" field_name="transaction_type" field_value="Buy" />
			<CheckboxFilter text="Reinvestments" field_name="transaction_type" field_value="Reinvestment" />
			<CheckboxFilter text="Sales" field_name="transaction_type" field_value="Sell" />
			<CheckboxFilter text="Dividends" field_name="transaction_type" field_value="Dividend" />
			<CheckboxFilter text="Splits" field_name="transaction_type" field_value="Split" />
		</CheckboxFilterList>
	}// render;


	public constructor (props: Object) {
		super (props);
		ActivityFilters.contextType = DataPageContext;
	}// constructor;

}// ActivityFilters;

