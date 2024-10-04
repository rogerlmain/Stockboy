/*
import React from "react";
*/
import BaseComponent from "Controls/BaseComponent";
/*
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import APIClass from "Controls/Abstract/APIClass";
import Eyecandy from "Controls/Eyecandy";

import { IBaseModel } from "Models/Abstract/BaseModel";


class EditFormState {
	command: Function = null;
	saving: boolean = false;
}// EditFormState;


export interface IEditFormProps {
	data?: IBaseModel;
}// IEditFormProps

*/
export class EditFormProps {
	//name: string = null;
	//keys: Array<string> = null;
	//data?: IBaseModel = null;
	body: React.ComponentType/*<IEditFormProps>*/ = null;
}// IEditFormProps;


export class EditForm extends BaseComponent<EditFormProps>/*, EditFormState>*/ {

/*
	private form_element: React.RefObject<HTMLDivElement> = React.createRef ();

/*
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


	/********


	private save_record () {
		let form_data = new FormData (this.form.current);
		this.setState ({ 
			command: () => APIClass.fetch_data ("SaveTransaction", form_data),
			saving: true
		});
	}// save_record;


	/********


	public form: React.RefObject<HTMLFormElement> = React.createRef ();
	*/

	public render = () => /*this.state.saving ? <Eyecandy command={this.state.command} text="Saving..." /> : <div>

		<form ref={this.form}>
			{*//*keys={this.props.keys} body={this.props.body}*//*}
			<this.props.body data={this.props.data} />
		</form>

		<div className="button-bar">
			<button id="save_button" onClick={this.save_record}>Save</button>
			<button id="close_button" onClick={main_page.popup_window.hide}>Close</button>
		</div>

	</div>*/

}// EditForm;