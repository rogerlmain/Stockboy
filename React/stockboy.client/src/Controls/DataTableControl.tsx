import APIClass from "Classes/APIClass";
import NameValueCollection from "Classes/Collections";
import BasePage from "Pages/Abstract/BasePage";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { BaseProps, IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { BaseModelArray, IBaseModel, IStockModel, StockModelArray } from "Models/Abstract/BaseModel";
import { MouseEvent, ReactElement, RefObject, createRef } from "react";


class DataTableControlProps extends BaseProps implements IBaseProps {
	children?: ReactElement = null;
	table_properties: DataTableProperties = null;
	procedure_name: string = null;
	parameters?: NameValueCollection<any> = null;
	blank_label?: string = null;
	editable?: boolean = true;
	name: string = null;
	onCreate?: Function = null;
	onEdit?: Function = null;
	onDelete?: Function = null;
	onChange?: DataTableControlChangeFunction = null;
}// DataTableControlProps;


class DataTableControlState implements IBaseState {
	selected_row: IStockModel = null;
	data: BaseModelArray = null;
}// TransactionState;


export type DataTableControlChangeFunction = (data: BaseModelArray) => void;


export default class DataTableControl extends BasePage <DataTableControlProps, DataTableControlState> {

	private control_ref: RefObject<HTMLDivElement> = createRef ();

	private get table () { return this.data_table.current }
	private get with_child () { return isset (this.props.children) }


	private set_styles () {

		let control: HTMLDivElement = this.control_ref.current;
		let sidebar: HTMLDivElement = control.querySelector ("#sidebar");
		let button_bar: HTMLDivElement = control.querySelector ("div.button-bar");

		control.style.merge ({
			alignItems: this.with_child ? "flex-start" : (is_defined (this.state.data) ? "flex-end" : "center"),
		});

		if (this.with_child) {

			control.classList.add ("row-block");
			sidebar.classList.add ("left-margin");

			if (this.props.editable) {
				button_bar.style.marginTop = "unset";
				button_bar.style.justifyContent = "flex-start";
			}// if;

		}// if;

	}// set_styles;


	/********/


	public data_table: RefObject<DataTable> = createRef ();


	public state: DataTableControlState = new DataTableControlState ();


	public static defaultProps: DataTableControlProps = {
		children: null,
		table_properties: null,
		procedure_name: null,
		parameters: null,
		blank_label: null,
		editable: true,
		name: null,
		onCreate: null,
		onEdit: null,
		onDelete: null,
	}// defaultProps;


	public add_row (row: IBaseModel) {

		let item: IBaseModel = null;

		let sort_field: string = this.table?.state.sort_field;
		let ascending: boolean = this.table?.state.ascending;

		if (isset (row [sort_field])) {
			for (let index = 0; index < this.state.data.length; index++) {

				let item = this.state.data [index];

				switch (ascending) {
					case true: if (row [sort_field] > item [sort_field]) continue; break;
					case false: if (row [sort_field] < item [sort_field]) continue; break;
				}// switch;

				return this.setState ({ data: this.state.data.toSpliced (index, 0, row) });

			}// for;
		}// if;

		return this.setState ({ data: this.state.data.append (row) });

	}// add_row;


	public update_row (data: IBaseModel) {

		let selected_row = this.state.data.find ((row: IBaseModel) => {

			let found: boolean = false;

			this.props.table_properties.keys.forEach (key => found = (row [key] == data [key]));

			return found;

		});

		Object.assign (selected_row, data);
		this.forceUpdate ();

	}// update_row;


	public remove_row = () => this.setState ({ data: this.state.data.toSpliced (this.state.data.indexOf (this.state.data.find ((element: IBaseModel) => element.id == this.state.selected_row.id)), 1) });


	public componentDidUpdate (props: DataTableControlProps) {
		if (is_null (props?.parameters) && is_null (this.props.parameters)) return;
		if (isset (props?.parameters) && (props.parameters?.matches (this.props.parameters))) return;
		APIClass.fetch_data (this.props.procedure_name, this.props.parameters).then ((response: StockModelArray) => {
			this.setState ({ data: response }, () => {
				this.set_styles ();
				if (isset (this.props.onChange)) this.props.onChange (this.state.data);
			});
		});
	}// componentDidUpdate;


	public componentDidMount () {
		this.componentDidUpdate (null);
	}// componentDidMount;


	public render () {
		return <div className={`page-layout with-headspace`} ref={this.control_ref}>

			<div className="body" style={{ height: this.with_child ? "100%" : "auto"}}>
				{not_defined (this.state.data) ? <div style={{ whiteSpace: "nowrap" }}>
					{isset (this.props.blank_label) ? this.props.blank_label : `There are no ${this.props.name}s`}
				</div> : <DataTable id={`${this.props.name.toLowerCase ()}_table`} 
					onclick={(row: IStockModel) => this.setState ({ selected_row: row })} ref={this.data_table}
					data={this.state.data} parent={this} {...this.props.table_properties}>
				</DataTable>}
			</div>

			<div id="sidebar">

				{this.props.editable ? <div className="button-bar"> 

					<button id="add_button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
						event.preventDefault ();
						if (isset (this.props.onCreate)) return this.props.onCreate (); 
						throw "No create handler defined";
					}}>Add</button>

					<div className="row-block" style={{display: isset (this.state.selected_row) ? null : "none"}}>

						<button id="edit_button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
							event.preventDefault ();
							if (isset (this.props.onEdit)) return this.props.onEdit (this.state.selected_row);
							throw ("No edit handler defined");
						}}>Edit</button>

						<button id="delete_button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
							event.preventDefault ();
							if (isset (this.props.onDelete)) return this.props.onDelete (this.state.selected_row);
							throw ("No delete handler defined");
						}}>Delete</button>

					</div>

				</div> : null}

				{this.with_child ? <div className="top-margin">{this.props.children}</div> : String.Empty}

			</div>

		</div>
	}// render;

}// DataTableControl;