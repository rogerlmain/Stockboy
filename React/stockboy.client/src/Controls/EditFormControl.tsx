import APIClass from "Classes/APIClass";

import DataPage from "Controls/DataPage";
import Eyecandy from "Controls/Eyecandy";

import { EditFormContext } from "Classes/Contexts";
import { StockDataModel } from "Models/Abstract/BaseModel";
import { FormPage } from "Pages/Abstract/FormPage";
import { ComponentClass, MouseEvent, ReactElement, RefObject, createRef } from "react";


export class EditFormProps extends StockDataModel {
	body: ComponentClass<any>;
	parent: DataPage;
}// IEditFormProps;


class EditFormState {
	contents: ReactElement = null;
	complete: boolean = true;
}// EditFormState;


export enum PromptResponse { Proceed, Cancel, Abort }


export default class EditFormControl extends FormPage<EditFormProps, EditFormState> {

	private form_ref: RefObject<HTMLFormElement> = createRef ();
	private editor_ref: RefObject<any> = createRef ();

	private get data_table () { return this.props.parent.data_table_control.current }
	private get eyecandy () { return <Eyecandy text={`Saving ${this.props.parent.props.name}. One moment, please.`} /> }


	private get_edit_form (form_data: FormData) {
		let editor_data = Object.create (this.props.body.defaultProps.constructor.prototype);

		for (let entry of form_data.entries ()) {
			editor_data [entry [0]] = entry [1];
		}// for;

		return <EditFormControl {...this.props} data={editor_data}/>;
	}// get_edit_form;


	private required_fields_completed (): boolean {

		let fields: FormItemList = this.form_ref.current.querySelectorAll ("input:not([type='hidden']), select, textarea");
		let complete: boolean = true;

		fields.forEach ((field: FormItem) => {

			let container = field.closest ("[name='input_element'");

			if (is_null (container)) return;
			if (is_defined (field.value)) return container.classList.add ("hidden");;

			if (container.hasClass ("required")) {
				complete = false;
				return field.style.merge ({
					backgroundColor: "var(--required-field-color)",
					border: "solid 1px red"
				});
			}// if;
			
		});

		this.setState ({ complete });

		return complete;

	}// required_fields_completed;


	private async save_record (event: MouseEvent<HTMLButtonElement>) {

		if (!this.required_fields_completed ()) return event.preventDefault ();

		let form_data: FormData = new FormData (this.form_ref.current).remove_empties ();
		let new_record: boolean = !form_data.has ("id");

		popup_window.show (this.eyecandy);

		if (isset (this.editor_ref.current.onSave)) {
			let response = await this.editor_ref.current.onSave ();
			switch (response) {
				case PromptResponse.Cancel: return popup_window.show (this.get_edit_form (form_data));
				case PromptResponse.Abort: return popup_window.hide ();
				case PromptResponse.Proceed: popup_window.show (this.eyecandy);
			}// switch;
		}// if;

		APIClass.fetch_data (`Save${this.props.parent.props.name.titleCase ()}`, form_data).then (response => {

			if (new_record) {

				this.data_table.add_row (response);

				return popup_window.show (<div>

					Transaction saved. Save another one?

					<div className="button-bar">
						<button onClick={() => popup_window.show (this.get_edit_form (form_data))}>Yes</button>
						<button onClick={() => popup_window.hide ()}>No</button>
					</div>

				</div>);

			}// if;

			this.data_table.update_row (response);
			popup_window.hide ();
			
		});

	}// save_record;


	/********/


	public static defaultProps: EditFormProps = {
		id: null,
		broker_id: null,
		ticker_id: null,
		data: null,
		body: null,
		parent: null
	}// defaultProps;


	public state: EditFormState = new EditFormState ();


	public render () {
		return <EditFormContext.Provider value={this}>
			<div>

				<div className={`${this.state.complete && "hidden"} row-centered warning`}>The highlighted fields are required.</div>

				<form ref={this.form_ref}><this.props.body id={this.props.id} data={this.props.data} broker_id={this.props.broker_id} ticker_id={this.props.ticker_id} ref={this.editor_ref} /></form>

				<div className="button-bar">
					<button id="save_button" onClick={async (event: MouseEvent<HTMLButtonElement>) => this.save_record (event)}>Save</button>
					{popup_window.close_button}
				</div>

			</div>
		</EditFormContext.Provider>
	}// render;


}// EditFormControl;