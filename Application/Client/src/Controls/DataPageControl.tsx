import EditFormControl from "Controls/EditFormControl";
import TableButtons from "Controls/TableButtons";

import FilterHandler from "Controls/Filters/FilterHandler";
import TableFilters from "Controls/Filters/TableFilters";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { DeleteForm } from "Forms/DeleteForm";
import { IBaseModel, StockModel } from "Models/Abstract/BaseModels";
import { Component, ComponentClass, createContext, createRef, RefObject } from "react";


class DataPageControlProps {

	data: DataArray;
	dataType: any;

	properties: DataTableProperties;
	save_command: string;
	delete_command: string;

	children: ChildElement;

	filter_handler: FilterHandler;
	stock_filters: boolean;
	table_buttons: boolean;

	search_filters: DataKeyArray;
	date_filter_field?: string;

	align_buttons?: ButtonAlignment;

	form: ComponentClass<any, any>;
	data_type: string;

	parent: Component;

}// DataPageControlProps;


class DataPageControlState {
	data: DataArray = null;
	selected_row: IBaseModel = null;
}// DataPageControlState;


export enum ButtonAlignment { center, right }


export var DataPageContext = createContext (null);


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


	private recenter_grid_block () {
		if (not_set (this.side_panel.current) || not_set (this.grid_block.current) || (this.side_panel.current.offsetWidth == 0)) return setTimeout (this.recenter_grid_block.bind (this));
		this.grid_block.current.style.setProperty ("margin-left", `${this.side_panel.current.offsetWidth}px`);
	}// recenter_grid_block;


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
		stock_filters: true,
		table_buttons: false,

		search_filters: null,
		date_filter_field: null,

		align_buttons: ButtonAlignment.right,

		form: null,
		data_type: null,

		parent: null,

	}// defaultProps;


	public state: DataPageControlState = new DataPageControlState ();


	public sort = (): void => this.data_table.current.sort ();


	public remove_row = () => this.setState ({ data: this.state.data.toSpliced (this.state.data.indexOf (this.state.data.find ((element: IBaseModel) => element.id == this.state.selected_row.id)), 1) });


	public componentDidUpdate (props: DataPageControlProps) {
		if ((props.data == this.props.data) || (props.data?.matches (this.props.data))) return;
		if (isset (this.props.children)) this.recenter_grid_block.bind (this) ();
		this.setState ({ data: this.props.data });
	}// componentDidUpdate;


	public render () {
		return <DataPageContext.Provider value={this}>
			<div className="full-size column-block">

				{not_set (this.props.filter_handler) ? <FilterHandler ref={this.filter_handler_control} /> : null}

				{((this.props.search_filters || this.props.stock_filters) && isset (this.props.data)) ? <TableFilters ref={this.table_filters} /> : null}

				<div className="full-size column-centered row-block" ref={this.grid_block}>

					<div className="full-height column-centered column-block">

						{is_null (this.props.data) ? <div className="bold-text">{`No ${this.props.data_type} defined`}</div> : <DataTable data={this.state.data} 
							properties={this.props.properties} ref={this.data_table} parent={this}>
						</DataTable>}

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
		</DataPageContext.Provider>
	}// render;

	constructor (props: DataPageControlProps) {
		super (props);
		event_handler.addEventListener ("row-selected", ((event: CustomEvent<IBaseModel>) => this.setState ({selected_row: event.detail})) as EventListener);
		this.state.data = this.props.data;
	}// constructor;

}// DataPageControl;