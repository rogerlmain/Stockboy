import React, { ComponentType, ChangeEvent, RefObject, createRef } from "react";

import BaseComponent, { BaseProps, IBaseProps, IBaseState } from "Controls/BaseComponent";
import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import APIClass from "Classes/APIClass";

import BrokerList from "Controls/Lists/BrokerList";
import SelectList from "Controls/Lists/SelectList";
import TickerList from "Controls/Lists/TickerList";
import EditForm from "Forms/EditForm";

import { DeleteForm } from "Forms/DeleteForm";
import { IBaseModel } from "Models/Abstract/BaseModel";


class DataPageProps extends BaseProps implements IBaseProps {
	edit_form: ComponentType = null;
	table_properties: DataTableProperties = null;
	name: string = null;
}// DataPageProps;


class DataPageState implements IBaseState {
	broker_id: string = null;
	ticker_id: string = null;
	selected_row: IBaseModel = null;
	data: Array<IBaseModel> = null;
}// TransactionState;


export default class DataPage extends BaseComponent <DataPageProps, DataPageState> {

	private data_table_ref: RefObject<DataTable> = createRef ();


	private get table () { return this.data_table_ref.current }


	private edit_record = (row: IBaseModel = null) => main_page.popup_window.show (<EditForm data={row} body={this.props.edit_form} broker_id={this.state.broker_id} ticker_id={this.state.ticker_id} parent={this} />);

	private delete_record = () => main_page.popup_window.show (<DeleteForm key_names={["broker_id", "ticker_id"]} parent={this} record={this.state.selected_row} />);


	/********/


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

		let parameters = {};

		if (isset (this.state.broker_id)) parameters ["broker_id"] = this.state.broker_id;
		if (isset (this.state.ticker_id)) parameters ["ticker_id"] = this.state.ticker_id;

		APIClass.fetch_data (`Get${this.props.name}s`, parameters).then ((response: Array<IBaseModel>) => {
			this.setState ({ data: response });
		});

	}// fetch_data;


	public componentDidUpdate (previous_props: DataPageProps, previous_state: DataPageState) {
		if ((previous_state.broker_id != this.state.broker_id) || (previous_state.ticker_id != this.state.ticker_id)) this.fetch_data ();
	}// componentDidUpdate;


	public componentDidMount = () => this.fetch_data ();


	public render = () => <div className="page-layout">

		<form>
			<div className="wide-column-spaced row-block">

				<BrokerList header={SelectList.All} selected_item={this.state.broker_id} 
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: (event.currentTarget.value == SelectList.All ? null : event.currentTarget.value) })}>
				</BrokerList>

				<TickerList header={SelectList.All} broker_id={this.state.broker_id}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ ticker_id: event.currentTarget.value })}>
				</TickerList>

			</div>
		</form>

		<div className="body page-layout with-headspace">

			<div className="body" style={{ flexGrow: 0 }}>
				{is_null (this.state.data) ? <div style={{ whiteSpace: "nowrap" }}>There are no transactions</div> : <DataTable id={`${this.props.name.toLowerCase ()}_table`} 
					onclick={(row: IBaseModel) => this.setState ({ selected_row: row })} ref={this.data_table_ref}
					data={this.state.data} parent={this} {...this.props.table_properties}>
				</DataTable>}
			</div>

			<div className="button-bar">

				<button id="add_button" onClick={() => {this.edit_record (); return true}}>Add</button>

				<div style={{display: isset (this.state.selected_row) ? null : "none"}}>
					<button id="edit_button" onClick={() => this.edit_record (this.state.selected_row)}>Edit</button>
					<button id="delete_button" onClick={() => this.delete_record ()}>Delete</button>
				</div>

			</div>

		</div>

	</div>

}// DataPage;

