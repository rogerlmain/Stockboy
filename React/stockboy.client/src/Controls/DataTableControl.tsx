import APIClass from "Classes/APIClass";
import EditForm from "Controls/EditForm";
import TickerSelector from "Controls/TickerSelector";
import BasePage from "Pages/Abstract/BasePage";
import NameValueCollection from "Classes/Collections";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { BaseProps, IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { DeleteForm } from "Forms/DeleteForm";
import { IBaseModel, IStockModel, StockModelArray } from "Models/Abstract/BaseModel";
import { ComponentClass, RefObject, createRef } from "react";
import { TransactionListModel } from "Models/TransactionModels";
import { MouseEvent } from "react";


class DataPageProps extends BaseProps implements IBaseProps {
	table_properties: DataTableProperties = null;
	procedure_name: string = null;
	parameters: NameValueCollection<any> = null;
	name: string = null;
	onCreate?: Function = null;
	onEdit?: Function = null;
	onDelete?: Function = null;
}// DataPageProps;


class DataPageState implements IBaseState {
	selected_row: IStockModel = null;
	data: StockModelArray = null;
}// TransactionState;


export default class DataTableControl extends BasePage <DataPageProps, DataPageState> {

	private data_table_ref: RefObject<DataTable> = createRef ();


	private get table () { return this.data_table_ref.current }


	/********/


	public state: DataPageState = new DataPageState ();


	public add_row (row: IStockModel) {

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


	public render = () => <div className="page-layout">

		<div className="body page-layout with-headspace">

			<div className="body" style={{ flexGrow: 0 }}>
				{is_null (this.state.data) ? <div style={{ whiteSpace: "nowrap" }}>There are no transactions</div> : <DataTable id={`${this.props.name.toLowerCase ()}_table`} 
					onclick={(row: IStockModel) => this.setState ({ selected_row: row })} ref={this.data_table_ref}
					data={this.state.data} parent={this} {...this.props.table_properties}>
				</DataTable>}
			</div>

			<div className="button-bar">

				<button id="add_button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
					event.preventDefault ();
					if (isset (this.props.onCreate)) return this.props.onCreate (); 
					throw "No create handler defined";
				}}>Add</button>

				<div style={{display: isset (this.state.selected_row) ? null : "none"}}>
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

		</div>

	</div>

}// DataTableControl;