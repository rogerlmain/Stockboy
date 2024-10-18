import APIClass from "Classes/APIClass";
import BasePage from "Pages/Abstract/BasePage";
import DataPage from "Controls/DataPage";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { ListItemArray } from "Classes/Collections";
import { RefObject, createRef } from "react";


const data_table_properties: DataTableProperties = {
	keys: ["id"],
	fields: ["name"]
}// data_table_properties;

class BrokersState {
	public brokers: ListItemArray = null;
	public form_visible: boolean = false;
}// BrokersState;


export default class BrokersPage extends BasePage<BaseProps, BrokersState> {

	private edit_form_ref: RefObject<HTMLFormElement> = createRef ();


	private save_form () {
		let form_data = new FormData (this.edit_form_ref.current);
		alert (Object.fromEntries (form_data));
	}// save_form;


	/********/


	public state: BrokersState = new BrokersState ();


	public render () {
		return <div className="two-column-grid">
			<DataPage id="brokers_list" name="broker" table_properties={data_table_properties} 
				onCreate={() => this.setState ({ form_visible: true })}>
			</DataPage>
		</div>
	}// render;

}// BrokersPage;