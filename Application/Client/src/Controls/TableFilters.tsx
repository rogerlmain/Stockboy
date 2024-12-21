import DataPageControl, { DataPageContext } from "Controls/DataPageControl";
import FilterHandler from "Controls/FilterHandler";
import SelectList from "Controls/Lists/SelectList";
import TickerSelector from "Controls/TickerSelector";

import { BoundaryType, DataFilter, FilterType } from "Classes/Common/Collections";
import { DataKeyArray } from "Classes/DataKeys";

import { BaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, Component, createRef, RefObject } from "react";


const search_threshold: number = 20;


type FilterKey = keyof TableFiltersState;

class TableFiltersProps extends BaseModel {
	data: DataArray;
	parent: DataPageControl;
	search_filters: DataKeyArray;
	stock_filters: boolean;
	date_filters: boolean;
	allow_all?: boolean;
	required?: boolean;
	onFilterChange?: Function;
}// TableFiltersProps;


class TableFiltersState {

	broker_id: string = null;
	ticker_id: string = null;

	lookup_field: string = null;
	lookup_value: string = null;

	use_start_date: boolean = false;
	use_end_date: boolean = false;

	start_date_filter: DataFilter = null;
	end_date_filter: DataFilter = null;

	start_date: Date = null;
	end_date: Date = null;

}// TableFiltersState;


export default class TableFilters extends Component<TableFiltersProps, TableFiltersState> {

	private ticker_selector: RefObject<TickerSelector> = createRef ();

	private start_date_checkbox: RefObject<HTMLInputElement> = createRef ();
	private end_date_checkbox: RefObject<HTMLInputElement> = createRef ();

	private filter_handler: FilterHandler = null;


	private add_date_filter (field_name: keyof TableFiltersState, value: string, boundary: BoundaryType) {
		
		let filter: DataFilter = new DataFilter (String.Empty, value, FilterType.inclusive, false, boundary);
		let filter_key: FilterKey  = `$${field_name}_filter` as FilterKey;

		this.setState ({ 
			[filter_key]: filter,
			[field_name]: new Date (value)
		} as unknown as Pick<TableFiltersState, FilterKey>, () => {
			this.filter_handler.add_filter (filter);
			this.filter_handler.filter_data ();
		});

	}// add_date_filter;


	/********/


	public static defaultProps: TableFiltersProps = {
		data: null,
		parent: null,
		search_filters: null,
		stock_filters: true,
		date_filters: true,
		allow_all: true,
		required: false,
		onFilterChange: null,
	}// defaultProps;


	public state: TableFiltersState = new TableFiltersState ();


	public componentDidMount () {
		this.filter_handler = (this.context as DataPageControl).filter_handler;
	}// componentDidMount;


	public render () {
		return <div id={this.props.id} className="column-centered somewhat-spaced-out row-block with-legroom">

			{(this.props.search_filters && isset (this.props.data) && (this.props.data.length > search_threshold)) ? <div className="container">

				<div className="column-block">

					<div className={`${this.props.date_filters ? "totally-spaced-out" : "somewhat-spaced-out"} row-block`}>

						<SelectList id="ticker_id" header="All fields" allow_all={true} data={this.props.search_filters} 
							onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ lookup_field: event.currentTarget.value })}>
						</SelectList>

						<input type="text" id="stock_ticker" onChange={(event: InputChangeEvent) => this.setState ({ lookup_value: event.currentTarget.value })} />

						<button id="stock_lookup_button" onClick={() => {
							this.filter_handler.remove_partial_filters ();
							if (is_defined (this.state.lookup_value)) return this.filter_handler.add_filter (new DataFilter (this.state.lookup_field, this.state.lookup_value, FilterType.exclusive, true));
							this.filter_handler.filter_data ();
						}}>Lookup</button>

					</div>

					{this.props.date_filters ? <div className="somewhat-spaced-out column-centered row-block with-a-little-headspace">
						<div className="row-centered row-block">
							<label htmlFor="start_date" onClick={() => this.start_date_checkbox.current.click ()}>Start date</label>
							<input type="checkbox" className="with-a-little-right-space" ref={this.start_date_checkbox}
								onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ use_start_date: event.currentTarget.checked })}>
							</input>
							<input type="date" id="start_date" disabled={!this.state.use_start_date} 
								onChange={(event: ChangeEvent<HTMLInputElement>) => this.add_date_filter ("start_date", event.currentTarget.value, BoundaryType.lower)}>
							</input>
						</div>
						<div className="row-centered row-block">
							<label htmlFor="end_date" onClick={() => this.end_date_checkbox.current.click ()}>end date</label>
							<input type="checkbox" className="with-a-little-right-space" ref={this.end_date_checkbox}
								onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ use_end_date: event.currentTarget.checked })}>
							</input>
							<input type="date" id="end_date" disabled={!this.state.use_end_date}
								onChange={(event: ChangeEvent<HTMLInputElement>) => this.add_date_filter ("end_date", event.currentTarget.value, BoundaryType.upper)}>
							</input>
						</div>
					</div> : null}

				</div>

			</div> : null}

			{this.props.stock_filters ? <TickerSelector allow_all={true} ref={this.ticker_selector} 
				onBrokerChange={(broker_id: string) => this.setState ({ broker_id })}
				onTickerChange={(ticker_id: string) => this.setState ({ ticker_id })}

				onChange={(broker_id: string, ticker_id: string) => this.setState ({ broker_id, ticker_id }, () => {
					if (isset (this.props.onFilterChange)) {
						this.props.onFilterChange (this.state.broker_id, this.state.ticker_id);
						return;
					}// if;
				})}>
			</TickerSelector> : null}

		</div>
	}// render;


	public constructor (props: TableFiltersProps) {
		super (props);
		TableFilters.contextType = DataPageContext;
	}// constructor;

}// TableFilters;
