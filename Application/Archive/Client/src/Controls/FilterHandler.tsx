import { DataFilter, DataFilterList, FilterType } from "Classes/Collections";
import { DataKeyArray } from "Classes/DataKeys";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component } from "react";


class FilterHandlerProps {
	data: DataArray;
	search_filters: DataKeyArray;
	parent: Component;
}// FilterHandlerProps;

export default class FilterHandler extends Component<FilterHandlerProps> {

	private filters: DataFilterList = null;


	private inclusive_data (data: DataArray) {

		let filtered_data: DataArray = null;
		let filters: DataFilterList = this.filters?.filter ((filter: DataFilter) => filter.type == FilterType.inclusive)

		if (not_defined (filters) || not_defined (data)) return data;

		filters.forEach ((filter: DataFilter) => {
			data.forEach ((item: IBaseModel) => {
				if (item?.[filter.field] == filter.value) {
					if (isset (filtered_data) && filtered_data.contains (item)) return;
					if (is_null (filtered_data)) filtered_data = new Array<IBaseModel> ();
					filtered_data.push (item);
				}// if;
			});
		});

		return filtered_data;

	}// inclusive_data;


	private exclusive_data (data: DataArray) {

		let filtered_data: DataArray = data.Duplicate;
		let filters: DataFilterList = this.filters?.filter ((filter: DataFilter) => filter.type == FilterType.exclusive)

		if (not_defined (filters) || not_defined (data)) return data;

		filters.forEach ((filter: DataFilter) => {

			let data_list: DataArray = Object.assign (filtered_data.Replica, filtered_data);
	
			data_list.forEach ((item: IBaseModel) => {

				if (filter.partial) {

					let found: boolean = false;
					let fields = (is_null (filter.field) ? this.props.search_filters.ids : [filter.field]);

					for (let field of fields) {

						if (is_null (item) || is_null (item [field])) continue;

						if (item [field].toString ()?.includes (filter.value)) {
							found = true;
							break;
						}// if;

					}// for;

					return (found ? null : filtered_data.remove (item));

				}// if;

				if (item?.[filter.field] != filter.value) filtered_data.remove (item);

			});

		});

		return filtered_data;

	}// exclusive_data;


	/********/


	public static defaultProps: FilterHandlerProps = {
		data: null,
		search_filters: null,
		parent: null,
	}// defaultProps;


	public add_filter (filter: DataFilter) {

		if (is_null (this.filters)) this.filters = new Array<DataFilter> ();
		if (filter.type == FilterType.exclusive) this.filters.remove (this.filters.find ((item: DataFilter) => item.field == filter.field));

		this.filters.push (filter);
		this.filter_data ();

	}// add_filter;


	public remove_filter (name: string, value: string = null): void { 

		let filter: DataFilter = this.filters?.find ((filter: DataFilter) => (filter.field == name) && (is_null (value) || (filter.value == value)));

		if (isset (filter)) {
			this.filters.remove (filter);
			this.filter_data ();
		}// if;

	}// remove_filter;


	public remove_partial_filters () {
		if (isset (this.filters)) {
			let filters = this.filters.filter ((filter: DataFilter) => filter.partial);
			filters.forEach ((filter: DataFilter) => this.filters.remove (filter));
		}// if;
	}// remove_partial_filters;


	public update_stock_filters (broker_id: string, ticker_id: string) {
		isset (broker_id) ? this.add_filter (new DataFilter ("broker_id", broker_id)) : this.remove_filter ("broker_id");
		isset (ticker_id) ? this.add_filter (new DataFilter ("ticker_id", ticker_id)) : this.remove_filter ("ticker_id");
	}// update_stock_filters;


	public filter_data () {

		let data_list = this.props.data;

		if (is_defined (this.filters)) {
			if (is_defined (data_list)) data_list = this.inclusive_data (data_list);
			if (is_defined (data_list)) data_list = this.exclusive_data (data_list);
		}// if;

		this.props.parent.setState ({ data: data_list });

	}// filter_data;


	public render = () => null;


}// FilterHandler;