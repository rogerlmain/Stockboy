import APIClass from "Classes/APIClass";
import NameValueCollection from "Classes/Collections";
import BasePage from "Pages/Abstract/BasePage";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { BaseProps, IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { BaseModelArray, IBaseModel, IStockModel, StockModelArray } from "Models/Abstract/BaseModel";
import { CSSProperties, MouseEvent, ReactElement, RefObject, createRef } from "react";


class DataPageProps extends BaseProps implements IBaseProps {
	children?: ReactElement = null;
	table_properties: DataTableProperties = null;
	procedure_name: string = null;
	parameters?: NameValueCollection<any> = null;
	name: string = null;
	onCreate?: Function = null;
	onEdit?: Function = null;
	onDelete?: Function = null;
}// DataPageProps;


class DataPageState implements IBaseState {
	selected_row: IStockModel = null;
	data: BaseModelArray = null;
}// TransactionState;


export default class DataTableControl extends BasePage <DataPageProps, DataPageState> {

	private get table () { return this.data_table_ref.current }
	private get with_child () { return isset (this.props.children) }


	/********/


	public data_table_ref: RefObject<DataTable> = createRef ();


	public state: DataPageState = new DataPageState ();


	public add_row (row: IBaseModel) {

		let item: IBaseModel = null;

		let sort_field: string = this.table.state.sort_field;
		let ascending: boolean = this.table.state.ascending;

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


	public fetch_data () {
		APIClass.fetch_data (this.props.procedure_name, this.props.parameters).then ((response: StockModelArray) => this.setState ({ data: response }));
	}// fetch_data;


	public componentDidMount = () => this.fetch_data ();


	public render () {

		let table_style: CSSProperties = { width: "auto" }

		if (this.with_child) table_style.flexDirection = "row";

		return <div className="top-aligned page-layout with-headspace" style={table_style}>

			<div className="body" style={this.with_child ? { overflow: "visible" } : null}>
				{is_null (this.state.data) ? <div style={{ whiteSpace: "nowrap" }}>There are no transactions</div> : <DataTable id={`${this.props.name.toLowerCase ()}_table`} 
					onclick={(row: IStockModel) => this.setState ({ selected_row: row })} ref={this.data_table_ref}
					data={this.state.data} parent={this} {...this.props.table_properties}>
				</DataTable>}
			</div>

			<div className={`${conditional (this.with_child, "left-margin")} full-width`}>

				<div className={`${conditional (this.with_child, "left-aligned")} button-bar`} 
					style={{ marginTop: conditional (this.with_child, "0") }}>

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

				</div>

				{this.with_child ? <div className="top-margin">{this.props.children}</div> : String.Empty}

			</div>

		</div>

	}// render;

}// DataTableControl;