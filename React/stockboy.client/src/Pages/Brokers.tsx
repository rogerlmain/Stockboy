import DataTableControl from "Controls/DataTableControl";
import BasePage from "Pages/Abstract/BasePage";
import APIClass from "Classes/APIClass";


import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { ListItemArray } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";
import { MouseEvent, RefObject, createRef } from "react";
import { DeleteForm } from "../Forms/DeleteForm";
import LookupPage from "../Controls/LookupPage";

/*
const data_table_properties: DataTableProperties = {
	keys: ["id"],
	fields: ["name"]
}// data_table_properties;

class BrokersState {
	public brokers: ListItemArray = null;
	public form_visible: boolean = false;
	public selected_item: IBaseModel = null;
}// BrokersState;
*/

export default class BrokersPage extends BasePage {
/*
	private edit_form_ref: RefObject<HTMLFormElement> = createRef ();
	private table_control_ref: RefObject<DataTableControl> = createRef ();

	private get table_control () { return this.table_control_ref.current }
	private get data_table () { return this.table_control.data_table_ref.current }


	private save_form = (event: MouseEvent<HTMLButtonElement>) => {

		let form_data: FormData = new FormData (this.edit_form_ref.current);
		let id_field: HTMLInputElement = this.edit_form_ref.current.childNodes [0] as HTMLInputElement;

		APIClass.fetch_data ("SaveBroker", form_data).then ((result: IBaseModel) => { 

			switch (is_defined (id_field.value)) {
				case true: this.table_control.update_row (result); break;
				default: this.table_control.add_row (result); break;
			}// switch;

			this.setState ({ selected_item: result });

		});

		event.preventDefault ();

	}// save_form;


	*//********//*


	public static default_value = "TDAmeritrade";


	public state: BrokersState = new BrokersState ();
*/

	public render () {
		return <LookupPage name="broker" />
/*
		return <div className="page-layout">
			<DataTableControl id="brokers_list" name="broker" ref={this.table_control_ref}

				procedure_name="GetBrokers"
				table_properties={data_table_properties}
				
				onCreate={() => this.setState ({ 
					form_visible: true,
					selected_item: null
				})}

				onEdit={() => this.setState ({ 
					form_visible: true,
					selected_item: this.data_table.state.selected_row
				})}
				
				onDelete={() => main_page.popup_window.show (<DeleteForm table_name="Broker" record={this.data_table.state.selected_row} 
					additional_text={`All tickers and transactions for ${this.data_table.state.selected_row?.["name"]} will be deleted.`}
					table={this.table_control_ref.current}>
				</DeleteForm>)}>

				<div className="row-block" style={{ display: `${this.state.form_visible ? "flex" : "none"}` }}>
					<form id="broker_form" className="linear" ref={this.edit_form_ref}>
						<input type="hidden" name="id" value={this.state.selected_item?.["id"]} />
						<input type="text" name="name" defaultValue={this.state.selected_item?.["name"]} />
						<button style={{ marginLeft: "0.25rem" }} onClick={this.save_form}>Save</button>
					</form>
				</div>

			</DataTableControl>
		</div>
*/
	}// render;

}// BrokersPage;