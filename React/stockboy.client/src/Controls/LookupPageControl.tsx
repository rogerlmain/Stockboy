import APIClass from "Classes/APIClass";
import DataTableControl from "Controls/DataTableControl";
import BasePage from "Pages/Abstract/BasePage";


import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { ListItemArray } from "Classes/Collections";
import { DeleteForm } from "Forms/DeleteForm";
import { IBaseModel } from "Models/Abstract/BaseModel";
import { MouseEvent, ReactElement, RefObject, createRef } from "react";
import { tag_types } from "../Classes/Globals";


class LookupProps extends BaseProps { 
	public name: string = null;
	public fields?: Array<string> = null;
	public children?: ReactElement = null;
}// LookupProps;


class LookupState {
	public items: ListItemArray = null;
	public form_visible: boolean = false;
	public selected_item: IBaseModel = null;
}// LookupState;


export default class LookupPageControl extends BasePage<LookupProps, LookupState> {

	private data_table_properties: DataTableProperties = {
		keys: ["id"],
		fields: ["name"].concat (isset (this.props.fields) ? this.props.fields : [])
	}// data_table_properties;


	private edit_form_ref: RefObject<HTMLFormElement> = createRef ();
	private table_control_ref: RefObject<DataTableControl> = createRef ();

	private get table_control () { return this.table_control_ref.current }
	private get data_table () { return this.table_control.data_table_ref.current }


	private save_form = (event: MouseEvent<HTMLButtonElement>) => {

		let form_data: FormData = new FormData (this.edit_form_ref.current);
		let id_field: HTMLInputElement = this.edit_form_ref.current.querySelector ("[name='id']") as HTMLInputElement;

		APIClass.fetch_data (`Save${this.props.name.titleCase ()}`, form_data).then ((result: IBaseModel) => { 
				
			switch (is_defined (id_field.value)) {
				case true: this.table_control.update_row (result); break;
				default: this.table_control.add_row (result); break;
			}// switch;

			this.setState ({ selected_item: result }, () => {
				popup_window.show (<div>

					{key_name (this.state.selected_item ["name"]).titleCase ()} saved.<br />

					<div className="row-centered with-some-headspace">
						<button onClick={() => popup_window.hide ()}>Close</button>
					</div>

				</div>)
			});
			
		});

		event.preventDefault ();

	}// save_form;


	/********/


	public static default_value = "TDAmeritrade";


	public state: LookupState = new LookupState ();


	public render () {
		return <DataTableControl id={`${this.props.name}_list`} name={this.props.name} ref={this.table_control_ref}

			procedure_name={`Get${this.props.name.titleCase ()}s`}
			table_properties={this.data_table_properties}
				
			onCreate={() => this.setState ({ 
				form_visible: true,
				selected_item: null
			})}

			onEdit={() => this.setState ({ 
				form_visible: true,
				selected_item: this.data_table.state.selected_row
			}, () => Object.keys (this.state.selected_item).forEach (key => {

				let edit_field: FormItem = this.edit_form_ref.current.querySelector (`[name=${key}]`);

				if (isset (edit_field)) {

					let item = this.state.selected_item [key];

					switch  (edit_field.tagType) {
						case tag_types.date: return edit_field.value = item.substring (0, item.indexOf ("T"));
						default: edit_field.value = item;
					}// switch;

				}// if;

			}))}
				
			onDelete={() => popup_window.show (<DeleteForm table_name={this.props.name.titleCase ()} 
				record={this.data_table.state.selected_row} table={this.table_control_ref.current}
				additional_text={`All tickers and transactions for ${this.data_table.state.selected_row?.["name"]} will be deleted.`}>
			</DeleteForm>)}>

			<form id={`${this.props.name}_form`} ref={this.edit_form_ref}>
				<div style={{ display: `${this.state.form_visible ? "flex" : "none"}` }}>
					<input type="hidden" name="id" value={this.state.selected_item?.["id"]} />
					{this.props?.children}
					<div className="linear-form button-bar">
						<button onClick={this.save_form}>Save</button>
					</div>
				</div>
			</form>

		</DataTableControl>
	}// render;

}// LookupPageControl;