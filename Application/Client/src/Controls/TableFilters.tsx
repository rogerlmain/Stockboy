import DataPageControl from "Controls/DataPageControl";
import TickerSelector from "Controls/TickerSelector";

import SelectList, { ListItem, ListItemArray } from "Controls/Lists/SelectList";

import { DataFilter, FilterType } from "Classes/Collections";
import { BaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, Component, createRef, RefObject } from "react";


class TableFiltersProps extends BaseModel {

	data: DataArray;
	dataType: any;

	parent: DataPageControl;
	search_filter: boolean;
	stock_filters: boolean;
	allow_all?: boolean;
	required?: boolean;

}// TableFiltersProps;


class TableFiltersState {
	broker_id: string = null;
	ticker_id: string = null;
	lookup_field: string = null;
	lookup_value: string = null;
}// TableFiltersState;


export default class TableFilters extends Component<TableFiltersProps, TableFiltersState> {

	private ticker_selector: RefObject<TickerSelector> = createRef ();


	private data_field_list (): ListItemArray {

		let result: ListItemArray = null;

		Object.keys (this.props.parent.props.data?.[0]).forEach ((item: string) => {
			if (this.props.dataType?.invisible_fields.contains (item)) return;
			if (is_null (result)) result = new Array<ListItem> ();
			result.push (new ListItem (item.titleCase ()));
		});
		
		return result.sorted ("name");

	}// data_field_list;


	/********/


	public static defaultProps: TableFiltersProps = {

		data: null,
		dataType: null,

		parent: null,
		search_filter: false,
		stock_filters: false,
		allow_all: true,
		required: false,

	}// defaultProps;


	public state: TableFiltersState = new TableFiltersState ();


	public render () {
		return <div id={this.props.id} className="column-centered somewhat-spaced-out row-block with-legroom">

			{(this.props.search_filter && isset (this.props.data)) ? <div className="container">

				<SelectList id="ticker_id" header="All fields" allow_all={true} data={this.data_field_list ()} 
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ lookup_field: event.currentTarget.value })}>
				</SelectList>

				<input type="text" id="stock_ticker" onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ lookup_value: event.currentTarget.value })} />
				<button id="stock_lookup_button" onClick={() => this.props.parent.add_filter (new DataFilter (this.state.lookup_field, this.state.lookup_value, FilterType.exclusive, true))}>Lookup</button>

			</div> : null}

			{this.props.stock_filters ? <TickerSelector allow_all={true} ref={this.ticker_selector} 
				onBrokerChange={(broker_id: string) => this.setState ({ broker_id })}
				onTickerChange={(ticker_id: string) => this.setState ({ ticker_id })}

				onChange={(broker_id: string, ticker_id: string) => this.setState ({ broker_id, ticker_id }, () => {
					if (isset (this.props.parent.props.onFilterChange)) {
						this.props.parent.props.onFilterChange (this.state.broker_id, this.state.ticker_id);
						return;
					}// if;
					isset (broker_id) ? this.props.parent.add_filter (new DataFilter ("broker_id", broker_id)) : this.props.parent.remove_filter ("broker_id");
					isset (ticker_id) ? this.props.parent.add_filter (new DataFilter ("ticker_id", ticker_id)) : this.props.parent.remove_filter ("ticker_id");
				})}>
			</TickerSelector> : null}

		</div>
	}// render;

}// TableFilters;