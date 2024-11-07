import DataPageControl from "Controls/DataPageControl";
import SelectList from "Controls/Lists/SelectList";
import TickerSelector from "Controls/TickerSelector";

import { DataFilter, FilterType } from "Classes/Collections";
import { DataKeyArray } from "Classes/DataKeys";

import { BaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, Component, createRef, RefObject } from "react";


class TableFiltersProps extends BaseModel {
	data: DataArray;
	parent: DataPageControl;
	search_filters: DataKeyArray;
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


	/********/


	public static defaultProps: TableFiltersProps = {
		data: null,
		parent: null,
		search_filters: null,
		stock_filters: false,
		allow_all: true,
		required: false,
	}// defaultProps;


	public state: TableFiltersState = new TableFiltersState ();


	public render () {
		return <div id={this.props.id} className="column-centered somewhat-spaced-out row-block with-legroom">

			{(this.props.search_filters && isset (this.props.data)) ? <div className="container">

				<SelectList id="ticker_id" header="All fields" allow_all={true} data={this.props.search_filters} 
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ lookup_field: event.currentTarget.value })}>
				</SelectList>

				<input type="text" id="stock_ticker" onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ lookup_value: event.currentTarget.value })} />

				<button id="stock_lookup_button" onClick={() => {
					this.props.parent.remove_partial_filters ();
					if (is_defined (this.state.lookup_value)) return this.props.parent.add_filter (new DataFilter (this.state.lookup_field, this.state.lookup_value, FilterType.exclusive, true));
					this.props.parent.filter_data ();
				}}>Lookup</button>

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