import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { BoundaryType, DataFilter, FilterType } from "Classes/Common/Collections";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component } from "react";


type FilterList = Array<DataFilter>


export default class FilterHandler extends Component {

	private filters: FilterList = null;


	private get data_page (): DataPageControl {	return (this.context as DataPageControl) }
	private get data (): DataArray { return this.data_page.props.data }


	private within_bounds (boundary: StringDate, subject: StringDate, filter: DataFilter): boolean {
		switch (filter.boundary) {
			case BoundaryType.lower: return subject <= boundary;
			default: return boundary <= subject;
		}// switch;
	}// within_bounds;


	/********/


	public has_inclusive_filters: boolean = false;


	public add_filter (filter: DataFilter) {

		if (is_null (this.filters)) this.filters = new Array<DataFilter> ();
		if (filter.type != FilterType.inclusive) this.remove_filter (filter.id, false);

		this.filters.push (filter);
		this.filter_data ();

	}// add_filter;


	public remove_filter (id: string, filter: boolean = true): void {

		if (is_null (this.filters)) return;

		let item: DataFilter = this.filters.find ((item: DataFilter) => item.id == id);

		if (isset (item)) this.filters.remove (item);
		if (filter) this.filter_data ();

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


	public get_filters (name: string, value: any) {

		let result: FilterList = null;

		if (is_null (this.filters)) return null;

		this.filters.forEach ((filter: DataFilter) => {

			switch (name) {
				case "type": if (((value == FilterType.inclusive) && (filter.type != FilterType.inclusive)) || ((value == FilterType.exclusive) && (filter.type == FilterType.inclusive))) return; break;
				default: if (filter [name] != value) return; break;
			}// if;

			if (is_null (result)) result = new Array<DataFilter> ();

			result.push (filter);

		});

		return result;

	}// get_filters;


	public filtered_exclusively (data: DataArray, filters: FilterList): DataArray {

		let filtered_data: DataArray = null;

		if (is_null (filters)) return data;

		data.forEach ((item: IBaseModel) => {

			let included: boolean = true;
	
			for (let filter of filters) {
				switch (filter.type) {
					case FilterType.boundary: if (!this.within_bounds (item [filter.field], filter.value, filter)) return included = false; break;
					case FilterType.date_range: if (!this.within_bounds (new Date (item [filter.field]), new Date (filter.value), filter)) return included = false; break;
					case FilterType.partial: if (!this.search_fields (item, filter)) return included = false; break;
					default: if (item [filter.field] != filter.value) return included = false; break;
				}// switch;
			}// for;

			if (included) {
				if (is_null (filtered_data)) filtered_data = new Array<IBaseModel> ();
				filtered_data.push (item);
			}// if;

		});

		return filtered_data;

	}// filtered_exclusively;


	public filtered_inclusively (data: DataArray, filters: FilterList): DataArray {

		let filtered_data: DataArray = null;

		if (is_null (filters)) return null;

		data.forEach ((item: IBaseModel) => {

			let included: boolean = false;

			filters.forEach ((filter: DataFilter) => {
				if (item [filter.field] == filter.value) item.included = included = true;
			});

			if (included) {
				if (is_null (filtered_data)) filtered_data = new Array<IBaseModel> ();
				filtered_data.push (item);
			}// if;

		});

		return filtered_data;

	}// filtered_inclusively;


	public filter_data (callback: Callback = null) {

		let filtered_data: DataArray = this.filtered_exclusively (this.data, this.get_filters ("type", FilterType.exclusive));
		let filters: FilterList = this.get_filters ("type", FilterType.inclusive);

		if (this.has_inclusive_filters && is_null (filters)) return this.data_page.setState ({ data: null });

		let filter_fields: StringArray = null;

		if (isset (filters)) filters.forEach ((filter: DataFilter) => {
			if (is_null (filter_fields)) filter_fields = new Array<string> ();
			if (!filter_fields.contains (filter.field)) filter_fields.push (filter.field);
		});

		if (isset (filter_fields)) filter_fields.forEach ((field: string) => {
			filtered_data = this.filtered_inclusively (filtered_data, this.get_filters ("field", field));
		});

		this.data_page.setState ({ data: filtered_data }, callback);

	}// filter_data;


	public render = () => null;


	public constructor (props: Object) {
		super (props);
		FilterHandler.contextType = DataPageContext;
	}// constructor;


}// FilterHandler;