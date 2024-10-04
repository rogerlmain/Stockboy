/*
import { ReactElement } from "react";

import { DataControl, DataProps, IDataPage } from "Controls/Abstract/DataControls";

import BaseComponent from "Controls/BaseComponent";
import DataTable from "Controls/DataTable"
import APIClass from "Controls/Abstract/APIClass";
import Eyecandy from "Controls/Eyecandy";
import ErrorWindow from "Controls/ErrorWindow";

import { IBaseModel } from "Models/Abstract/BaseModel";
import { NameValueCollection } from "Classes/Collections";
import { DataState } from "Controls/Abstract/DataControls";
import { DeleteForm } from "Forms/DeleteForm";


class DataTableButtonsProps {
	selected: Boolean = null;
	parent: IDataPage = null;
}// DataTableButtonsProps;


export default class DataTableButtons extends BaseComponent<DataTableButtonsProps> {

	private get data (): Array<any> { return this.props.parent.state.data }
	private get data_table (): DataTable { return this.props.parent.data_table }
	private get selected_row (): any { return this.props.parent.data_table.selected_row }


	private add_new_row (row: IBaseModel) {

		let item: IBaseModel = null;

		let sort_field: string = this.props.parent.data_table.state.sort_field;
		let ascending: boolean = this.props.parent.data_table.state.ascending;

		if (isset (row [sort_field])) {
			for (let index = 0; index < this.data.length; index++) {

				let item = this.data [index];

				switch (ascending) {
					case true: if (row [sort_field] > item [sort_field]) continue; break;
					case false: if (row [sort_field] < item [sort_field]) continue; break;
				}// switch;

				return this.props.parent.setState ({ data: this.data.toSpliced (index, 0, row) });

			}// for;
		}// if;

		return this.props.parent.setState ({ data: this.data.append (row) });

	}// add_new_row;


	private form_buttons (editing: boolean = false): NameValueCollection {

		return new NameValueCollection ({

			Save: () => {

				let data = this.data;

				main_page.popup_window.show (<Eyecandy command={() => APIClass.fetch_data ("SaveTransaction", data).then ((response: IBaseModel) => {

					if (isset (response ["error"])) return main_page.popup_window.show (<ErrorWindow text={response ["error"]} />, null, true);

					this.add_new_row (response);

					if (editing) return main_page.popup_window.show (<div>Transaction saved.</div>, null, true);

					main_page.popup_window.show (
						<div>
							Transaction saved.<br />
							<br />
							Add another transaction?
						</div>, new NameValueCollection ({
							Yes: () => main_page.popup_window.show (this.props.parent.edit_form (), this.form_buttons ()),
							No: () => main_page.popup_window.hide ()
						})
					);

				})} text={"Saving transaction"} />)

			}, Close: () => main_page.popup_window.hide ()
		});

	}// form_buttons;


	private remove_selected_row = () => this.setState ({ data: this.data.toSpliced (this.data.indexOf (this.data.find ((element: IBaseModel) => element.id == this.selected_row.id)), 1) });


	private delete_record = () => main_page.popup_window.show (<DeleteForm record={this.selected_row} />, new NameValueCollection ({

		Yes: () => main_page.popup_window.show (<Eyecandy 
			command={() => APIClass.fetch_data ("DeleteSplit", this.selected_row).then (() => {
				this.remove_selected_row ();
				main_page.popup_window.hide ();
			})}
			text={"Deleting transaction"}>
		</Eyecandy>),

		No: () => main_page.popup_window.hide ()
	}));


	private edit_record = (row?: IBaseModel) => main_page.popup_window.show (this.props.parent.edit_form (row), this.form_buttons (isset (row)));


	/********


	public render = () => <div className="button-bar">
		<button id="add_button" onClick={() => this.edit_record ()}>Add</button>
		<div style={{display: this.props.selected ? null : "none"}}>
			<button id="edit_button" onClick={() => this.edit_record (this.selected_row as IBaseModel)}>Edit</button>
			<button id="delete_split_button" onClick={() => this.delete_record ()}>Delete</button>
		</div>
	</div>

}// DataTableButtons;

*/