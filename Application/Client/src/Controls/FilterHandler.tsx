import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { BoundaryType, DataFilter, DataFilterList, FilterType } from "Classes/Common/Collections";
import { DataKeyArray } from "Classes/DataKeys";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component } from "react";


export default class FilterHandler extends Component {

	private filters: DataFilterList = null;


	private get data_page (): DataPageControl {	return (this.context as DataPageControl) }
	private get search_filters (): DataKeyArray { return this.data_page.props.search_filters }
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
		if (filter.type != FilterType.inclusive) this.filters.remove (this.filters.find ((item: DataFilter) => item.id == filter.id));

		this.filters.push (filter);
		this.filter_data ();

	}// add_filter;


	public remove_filter (id: string): void { 

		let filter: DataFilter = this.filters?.find ((filter: DataFilter) => (filter.id == id));

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
		isset (broker_id) ? this.add_filter (new DataFilter (broker_id, "broker_id")) : this.remove_filter ("broker_id");
		isset (ticker_id) ? this.add_filter (new DataFilter (ticker_id, "ticker_id")) : this.remove_filter ("ticker_id");
	}// update_stock_filters;


	public filter_exclusive_items () {

		let data: DataArray = this.data;

		this.filters.forEach ((filter: DataFilter) => {

			let included_data: DataArray = null;
			if (filter.type == FilterType.inclusive) return;

			data.forEach ((item: IBaseModel) => {

				let included: boolean = null;

				if (not_set (item)) return;

				switch (filter.type) {
					case FilterType.boundary: included = this.within_bounds (item [filter.field], filter.value, filter); break;
					case FilterType.date_range: included = this.within_bounds (new Date (item [filter.field]), new Date (filter.value), filter); break;
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

		this.data_page.setState ({ data });

	}// filter_data;


	public filter_data () {
		if (is_defined (this.data)) return /*filter_inclusive_items (*/this.filter_exclusive_items ()/*)*/
	}// filter_data;


	public render = () => null;


	public constructor (props: Object) {
		super (props);
		FilterHandler.contextType = DataPageContext;
	}// constructor;


}// FilterHandler;