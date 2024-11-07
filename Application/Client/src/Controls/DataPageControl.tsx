import EditFormControl from "Controls/EditFormControl";
import Eyecandy from "Controls/Eyecandy";
import TableButtons from "Controls/TableButtons";
import TableFilters from "Controls/TableFilters";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { DataFilter, DataFilterList, FilterType } from "Classes/Collections";
import { DataKeyArray } from "Classes/DataKeys";

import { DeleteForm } from "Forms/DeleteForm";
import { IBaseModel, StockModel } from "Models/Abstract/BaseModels";
import { Component, ComponentClass, createRef, RefObject } from "react";


export enum ButtonAlignment { center, right }


class DataPageControlProps {

	data: DataArray;
	dataType: any;

	properties: DataTableProperties;
	save_command: string;
	delete_command: string;

	children: ChildElement;

	search_filters: DataKeyArray;
	stock_filters: boolean;
	table_buttons: boolean;

	align_buttons?: ButtonAlignment;

	form: ComponentClass;
	onFilterChange?: Function;
	data_type: string;

}// DataPageControlProps;


class DataPageControlState {
	data: DataArray = null;
	selected_row: IBaseModel = null;
}// DataPageControlState;


export default class DataPageControl extends Component<DataPageControlProps, DataPageControlState> {

	private table_filters: RefObject<TableFilters> = createRef ();
	private data_table: RefObject<DataTable> = createRef ();
	private grid_block: RefObject<HTMLDivElement> = createRef ();
	private side_panel: RefObject<HTMLDivElement> = createRef ();

	private filters: DataFilterList = null;


	private inclusive_data (data: DataArray, filters: DataFilterList) {

		let filtered_data: DataArray = null;

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


	private exclusive_data (data: DataArray, filters: DataFilterList) {

		if (not_defined (filters) || not_defined (data)) return data;

		let filtered_data: DataArray = data.Duplicate;

		filters.forEach ((filter: DataFilter) => {

			let data_list: DataArray = Object.assign (filtered_data.Replica, filtered_data);
	
			data_list.forEach ((item: IBaseModel) => {

				if (filter.partial) {

					let found: boolean = false;
					let fields = (is_null (filter.field) ? this.props.search_filters.ids : [filter.field]);

					for (let field of fields) {
						if (item?.[field].toString ()?.includes (filter.value)) {
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


	private show_form (data?: IBaseModel) {
		popup_window.show (<EditFormControl form={this.props.form} 
			save_command={this.props.save_command}
			data={isset (data) ? data : this.props.stock_filters ? new StockModel ().merge ({ 
				broker_id: this.table_filters.current.state.broker_id,
				ticker_id: this.table_filters.current.state.ticker_id,
			}) : null}
			data_page_control={this}>
		</EditFormControl>);
	}// show_form;


	/********/


	public static defaultProps: DataPageControlProps = {

		data: null,
		dataType: null,

		properties: null,
		save_command: null,
		delete_command: null,

		children: null,
		search_filters: null,
		stock_filters: false,
		table_buttons: false,

		align_buttons: ButtonAlignment.right,

		form: null,
		onFilterChange: null,
		data_type: null,

	}// defaultProps;


	public state: DataPageControlState = new DataPageControlState ();


	public add_row (row: IBaseModel) {

		let sort_field: string = this.data_table.current.state.sort_field;
		let ascending: boolean = this.data_table.current.state.ascending;

		if (isset (row [sort_field])) {
			for (let index = 0; index < this.props.data.length; index++) {

				let item = this.props.data [index];

				switch (ascending) {
					case true: if (row [sort_field] > item [sort_field]) continue; break;
					case false: if (row [sort_field] < item [sort_field]) continue; break;
				}// switch;

				return this.setState ({ data: this.props.data.toSpliced (index, 0, row) });

			}// for;
		}// if;

		return this.setState ({ data: this.state.data.append (row) });

	}// add_row;


	public update_row (data: IBaseModel) {

		let selected_row = this.state.data.find ((row: IBaseModel) => {

			let found: boolean = false;

			row.Keys.forEach (key => found = (row [key] == data [key]));
			return found;

		});

		Object.assign (selected_row, data);
		this.forceUpdate ();

	}// update_row;


	public remove_row = () => this.setState ({ data: this.state.data.toSpliced (this.state.data.indexOf (this.state.data.find ((element: IBaseModel) => element.id == this.state.selected_row.id)), 1) });


	public add_filter (filter: DataFilter) {

		if (is_null (this.filters)) this.filters = new Array<DataFilter> ();
		if (filter.type == FilterType.exclusive) this.filters.remove (this.filters.find ((item: DataFilter) => item.field == filter.field));

		this.filters.push (filter);
		this.filter_data ();

	}// add_filter;


	public remove_filter (name: string, value: string = null): void { 

		let filter: DataFilter = this.filters.find ((filter: DataFilter) => (filter.field == name) && (is_null (value) || (filter.value == value)));

		if (isset (filter)) {
			this.filters.remove (filter);
			this.filter_data ();
		}// if;

	}// remove_filter;


	public remove_partial_filters () {
		let filters = this.filters.filter ((filter: DataFilter) => filter.partial);
		filters.forEach ((filter: DataFilter) => this.filters.remove (filter));
	}// remove_partial_filters;


	public filter_data () {

		let data_list = this.inclusive_data (this.props.data, this.filters.filter ((filter: DataFilter) => filter.type == FilterType.inclusive));
		data_list = this.exclusive_data (data_list, this.filters.filter ((filter: DataFilter) => filter.type == FilterType.exclusive));

		this.setState ({ data: data_list });

	}// filter_data;


	public componentDidMount () {
		this.setState ({ data: this.props.data });
	}// componentDidMount;


	public render () {
		return <div className="full-size column-block">

			{(this.props.search_filters || this.props.stock_filters) ? <TableFilters data={this.props.data} 
				search_filters={this.props.search_filters} stock_filters={this.props.stock_filters}
				parent={this} ref={this.table_filters}>
			</TableFilters> : null}

			<div className="full-size column-centered row-block" ref={this.grid_block}>

				<div className="full-height column-block">

					{is_null (this.props.data) ? <Eyecandy text={`Loading ${this.props.data_type}`} /> : <DataTable data={this.state.data} properties={this.props.properties} ref={this.data_table} parent={this} /> }

					{this.props.table_buttons ? <div className={`button-bar ${this.props.align_buttons == ButtonAlignment.center ? "column-centered" : null}`}>
						<TableButtons selected_row={this.state.selected_row}

							onCreate={() => this.show_form ()}
							onEdit={() => this.show_form (this.state.selected_row)}

							onDelete={() => popup_window.show (<DeleteForm delete_command={this.props.delete_command}
								data={this.state.selected_row}
								data_page_control={this}>
							</DeleteForm>)}>

						</TableButtons>
					</div>: null}

				</div>

				{isset (this.props.children) ? <div id="side_panel" ref={this.side_panel}>{this.props.children}</div> : null}

			</div>

		</div>
	}// render;

	constructor (props: DataPageControlProps) {
		super (props);
		event_handler.addEventListener ("row-selected", ((event: CustomEvent<IBaseModel>) => this.setState ({selected_row: event.detail})) as EventListener);
		this.state.data = this.props.data;
	}// constructor;

}// DataPageControl;