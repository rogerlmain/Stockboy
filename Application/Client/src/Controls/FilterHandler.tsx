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


	public filter_exclusive_items () {

		let data: DataArray = this.data;

		this.filters.forEach ((filter: DataFilter) => {

			let included_data: DataArray = null;

			if (filter.type == FilterType.inclusive) return;
			if (not_defined (data)) return;

			data.forEach ((item: IBaseModel) => {

				let included: boolean = null;

				if (not_set (item)) return;

				switch (filter.type) {
					case FilterType.boundary: included = this.within_bounds (item [filter.field], filter.value, filter); break;
					case FilterType.date_range: included = this.within_bounds (new Date (item [filter.field]), new Date (filter.value), filter); break;
					case FilterType.partial: included = this.search_fields (item, filter); break;
					default: included = (item [filter.field] == filter.value); break;
				}// switch;

				if (included) {
					if (isset (included_data) && included_data.contains (item)) return;
					if (is_null (included_data)) included_data = new Array<IBaseModel> ();
					included_data.push (item);
				}// if;

			});

			data = included_data;

		});

		this.data_page.state.data = data;

	}// filter_exclusive_items;


	public filter_inclusive_items () {

	}// filter_inclusive_items;


	public filter_data () {
		if (not_defined (this.data) || not_defined (this.filters)) return;
		this.filter_exclusive_items ();
		this.filter_inclusive_items ();
		this.data_page.forceUpdate ();
	}// filter_data;


	public render = () => null;


	public constructor (props: Object) {
		super (props);
		FilterHandler.contextType = DataPageContext;
	}// constructor;


}// FilterHandler;