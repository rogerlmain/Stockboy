import CheckboxDateFilter from "Controls/CheckboxDateFilter";
import FilterHandler from "Controls/Filters/FilterHandler";
import SelectList from "Controls/Lists/SelectList";
import TickerSelector from "Controls/TickerSelector";

import DataPageControl, { DataPageContext } from "Controls/DataPageControl";

import { BoundaryType, DataFilter, FilterType } from "Classes/Common/Collections";
import { DataKeyArray } from "Classes/DataKeys";

import { BaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, Component, createRef, RefObject } from "react";


const search_threshold: number = 20;


class TableFiltersProps extends BaseModel {
	allow_all?: boolean;
	required?: boolean;
}// TableFiltersProps;


class TableFiltersState {

	broker_id: string = null;
	ticker_id: string = null;

	lookup_field: string = null;
	lookup_value: string = null;

	start_date: Date = null;
	end_date: Date = null;

}// TableFiltersState;


export default class TableFilters extends Component<TableFiltersProps, TableFiltersState> {

	private ticker_selector: RefObject<TickerSelector> = createRef ();

	private get data_page (): DataPageControl { return (this.context as DataPageControl) }

	private get data (): DataArray { return this.data_page.props.data }
	private get filter_handler (): FilterHandler { return this.data_page.filter_handler }
	private get search_filters (): DataKeyArray { return this.data_page.props.search_filters }
	private get stock_filters (): Boolean { return this.data_page.props.stock_filters }
	private get date_filter_field (): string { return this.data_page.props.date_filter_field }


	private set_stock_filter (field: string, value: string) {
		isset (value) ? this.filter_handler.add_filter (new DataFilter ({ id: field, value, field})) : this.filter_handler.remove_filter (field);
	}// set_stock_filter;


	/********/


	public static defaultProps: TableFiltersProps = {
		allow_all: true,
		required: false,
	}// defaultProps;


	public state: TableFiltersState = new TableFiltersState ();


	public render () {
		return <div id={this.props.id} className="column-centered somewhat-spaced-out row-block with-legroom">

			{(this.search_filters && isset (this.data) && (this.data.length > search_threshold)) ? <div className="container">

				<div className="column-block">

					<div className={`${isset (this.date_filter_field) ? "totally-spaced-out" : "somewhat-spaced-out"} row-block`}>

						<SelectList id="field_id" header="All fields" allow_all={true} data={this.search_filters} 
							onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ lookup_field: event.currentTarget.value })}>
						</SelectList>

						<input type="text" id="stock_ticker" style={{ width: "9rem" }}
							onChange={(event: InputChangeEvent) => this.setState ({ lookup_value: event.currentTarget.value })}>
						</input>

						<button id="stock_lookup_button" onClick={() => {

							if (not_empty (this.state.lookup_value)) return this.filter_handler.add_filter (new DataFilter ({
								id: "stock_lookup",
								field: this.state.lookup_field, 
								value: this.state.lookup_value, 
								type: FilterType.partial
							}));

							this.filter_handler.filter_data ();

						}}>Lookup</button>

						<button id="clear_lookup_button" onClick={() => {}}>Clear</button>

					</div>

					{isset (this.date_filter_field) ? <div className="somewhat-spaced-out column-centered row-block with-a-little-headspace">
						<CheckboxDateFilter id="start_date" boundary={BoundaryType.lower} />
						<CheckboxDateFilter id="end_date" boundary={BoundaryType.upper} />
					</div> : null}

				</div>

			</div> : null}

			{this.stock_filters ? <TickerSelector allow_all={true} ref={this.ticker_selector} 
				onBrokerChange={(broker_id: string) => this.set_stock_filter ("broker_id", broker_id)}
				onTickerChange={(ticker_id: string) => this.set_stock_filter ("ticker_id", ticker_id)}>
			</TickerSelector> : null}

		</div>
	}// render;


	public constructor (props: TableFiltersProps) {
		super (props);
		TableFilters.contextType = DataPageContext;
	}// constructor;

}// TableFilters;
