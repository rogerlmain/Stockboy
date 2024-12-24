import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { BoundaryType, DataFilter, FilterType } from "Classes/Common/Collections";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component } from "react";


type FilterList = Array<DataFilter>


export default class FilterHandler extends Component {

	private filters: FilterList = null;
	private filtered_data: DataArray = null;


	private get data_page (): DataPageControl {	return (this.context as DataPageControl) }
	private get data (): DataArray { return this.data_page.props.data }


	private get_filters (type: FilterType): FilterList {

		let result: FilterList = null;

		this.filters.forEach ((filter: DataFilter) => {
			if (is_null (result)) result = new Array<DataFilter> ();
			if ((type == FilterType.inclusive) && (filter.type == FilterType.inclusive)) return result.push (filter);
			if (filter.type != FilterType.inclusive) return result.push (filter);
		});

		return result;

	}// inclusive_filters;


	private within_bounds (boundary: StringDate, subject: StringDate, filter: DataFilter): boolean {
		switch (filter.boundary) {
			case BoundaryType.lower: return subject <= boundary;
			default: return boundary <= subject;
		}// switch;
	}// within_bounds;


	/********/


	public add_filter (filter: DataFilter) {

		if (is_null (this.filters)) this.filters = new Array<DataFilter> ();

		if (filter.type != FilterType.inclusive) this.remove_filter (filter.id);

		this.filters.push (filter);
		this.filter_data ();

	}// add_filter;


	public remove_filter (id: string): void {

		let item: DataFilter = this.filters.find ((item: DataFilter) => item.id == id);

		if (isset (item)) this.filters.remove (item);
		this.filter_data ();

	}// remove_filter;


	public update_stock_filters (broker_id: string, ticker_id: string) {
		isset (broker_id) ? this.add_filter (new DataFilter (broker_id, "broker_id")) : this.remove_filter ("broker_id");
		isset (ticker_id) ? this.add_filter (new DataFilter (ticker_id, "ticker_id")) : this.remove_filter ("ticker_id");
	}// update_stock_filters;


	public search_fields (item: IBaseModel, filter: DataFilter): boolean {

		let key_list: StringArray = isset (filter.field) ? [filter.field] : this.data_page.props.properties.fields.values;
		let key: string = null;

		for (key of key_list) {
			if (item [key].toString ().contains (filter.value as string)) return true;
		}// for;

		return false;

	}// search_fields;


	public filter_items (filters: FilterList, filter_type: FilterType) {

		let data_list: DataArray = null;

		filters.forEach ((filter: DataFilter) => {

			if (not_defined (this.filtered_data)) return;

			this.filtered_data.forEach ((item: IBaseModel) => {

				let included: boolean = null;

				if (not_set (item)) return;

				switch (filter.type) {
					case FilterType.boundary: included = this.within_bounds (item [filter.field], filter.value, filter); break;
					case FilterType.date_range: included = this.within_bounds (new Date (item [filter.field]), new Date (filter.value), filter); break;
					case FilterType.partial: included = this.search_fields (item, filter); break;
					default: included = (item [filter.field] == filter.value); break;
				}// switch;

				if (included) {
					if (isset (data_list) && data_list.contains (item)) return;
					if (is_null (data_list)) data_list = new Array<IBaseModel> ();
					data_list.push (item);
				}// if;

			});

			if (filter_type != FilterType.inclusive) {
				this.filtered_data = data_list;
				data_list = null;
			}// if;

		});

		if (filter_type == FilterType.inclusive) this.filtered_data = data_list;

	}// filter_exclusive_items;


	public filter_data () {
		if (not_defined (this.data) || not_defined (this.filters)) return;
		this.filtered_data = this.data;
		this.filter_items (this.get_filters (FilterType.inclusive), FilterType.inclusive);
		this.filter_items (this.get_filters (FilterType.exclusive), FilterType.exclusive);
		this.data_page.setState ({ data: this.filtered_data });
	}// filter_data;


	public render = () => null;


	public constructor (props: Object) {
		super (props);
		FilterHandler.contextType = DataPageContext;
	}// constructor;


}// FilterHandler;