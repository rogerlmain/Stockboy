import BaseComponent from "Classes/Common/BaseComponent";
import { DataPageContext } from "Controls/DataPageControl";

import { CheckboxFilter, CheckboxFilterList } from "Controls/Filters/CheckboxFilterList";


export default class ActivityFilters extends BaseComponent {

	public render () {
		return <CheckboxFilterList id="checkbox_list">
			<CheckboxFilter text="Buys" field_name="transaction_type" field_value="Buy" checked={true} />
			<CheckboxFilter text="Reinvestments" field_name="transaction_type" field_value="Reinvestment" checked={true} />
			<CheckboxFilter text="Sales" field_name="transaction_type" field_value="Sell" checked={true} />
			<CheckboxFilter text="Dividends" field_name="transaction_type" field_value="Dividend" checked={true} />
			<CheckboxFilter text="Splits" field_name="transaction_type" field_value="Split" checked={true} />
		</CheckboxFilterList>
	}// render;


	public constructor (props: Object) {
		super (props);
		ActivityFilters.contextType = DataPageContext;
	}// constructor;

}// ActivityFilters;

