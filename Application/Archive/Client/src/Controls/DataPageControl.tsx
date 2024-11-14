import EditFormControl from "Controls/EditFormControl";
import Eyecandy from "Controls/Eyecandy";
import FilterHandler from "Controls/FilterHandler";
import TableButtons from "Controls/TableButtons";
import TableFilters from "Controls/TableFilters";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { DeleteForm } from "Forms/DeleteForm";
import { IBaseModel, StockModel } from "Models/Abstract/BaseModels";
import { Component, ComponentClass, Context, createContext, createRef, RefObject } from "react";


export enum ButtonAlignment { center, right }


class DataPageControlProps {

	data: DataArray;
	dataType: any;

	properties: DataTableProperties;
	save_command: string;
	delete_command: string;

	children: ChildElement;

	filter_handler: FilterHandler;
	search_filters: DataKeyArray;
	stock_filters: boolean;
	table_buttons: boolean;

	align_buttons?: ButtonAlignment;

	form: ComponentClass;
	data_type: string;

}// DataPageControlProps;


class DataPageControlState {
	data: DataArray = null;
	selected_row: IBaseModel = null;
}// DataPageControlState;


export const FilterHandlerContext: Context<FilterHandler> = createContext (null);


export default class DataPageControl extends Component<DataPageControlProps, DataPageControlState> {

	private table_filters: RefObject<TableFilters> = createRef ();
	private data_table: RefObject<DataTable> = createRef ();
	private grid_block: RefObject<HTMLDivElement> = createRef ();
	private side_panel: RefObject<HTMLDivElement> = createRef ();


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


	public filter_handler_control: RefObject<FilterHandler> = createRef ();

	public get filter_handler (): FilterHandler { return this.props.filter_handler ?? this.filter_handler_control.current }


	public static defaultProps: DataPageControlProps = {

		data: null,
		dataType: null,

		properties: null,
		save_command: null,
		delete_command: null,

		children: null,

		filter_handler: null,
		search_filters: null,
		stock_filters: false,
		table_buttons: false,

		align_buttons: ButtonAlignment.right,

		form: null,
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


	public componentDidUpdate (props: DataPageControlProps) {
		if (props.data?.matches (this.props.data)) return;
		this.setState ({ data: this.props.data });
	}// componentDidMount;
		

	public render () {
		return <div className="full-size column-block">

			{not_set (this.props.filter_handler) ? <FilterHandler data={this.props.data} parent={this} 
				search_filters={this.props.search_filters} ref={this.filter_handler_control}>
			</FilterHandler> : null}

			<FilterHandlerContext.Provider value={this.filter_handler}>

				{(this.props.search_filters || this.props.stock_filters) ? <TableFilters data={this.props.data} 
					search_filters={this.props.search_filters} stock_filters={this.props.stock_filters}
					parent={this} ref={this.table_filters} onFilterChange={this.filter_handler?.update_stock_filters.bind (this.filter_handler)}>
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

			</FilterHandlerContext.Provider>

		</div>
	}// render;

	constructor (props: DataPageControlProps) {
		super (props);
		event_handler.addEventListener ("row-selected", ((event: CustomEvent<IBaseModel>) => this.setState ({selected_row: event.detail})) as EventListener);
		this.state.data = this.props.data;
	}// constructor;

}// DataPageControl;