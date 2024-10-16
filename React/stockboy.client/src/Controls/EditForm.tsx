import APIClass from "Classes/APIClass";
import DataPage from "Controls/DataPage";

import { StockDataModel } from "Models/Abstract/BaseModel";
import { FormPage } from "Pages/Abstract/FormPage";
import { ComponentClass, Context, MouseEvent, ReactElement, RefObject, createContext, createRef } from "react";


export class EditFormProps extends StockDataModel {
	body: ComponentClass<any>;
	parent: DataPage;
}// IEditFormProps;


class EditFormState {
	contents: ReactElement = null;
	complete: boolean = true;
}// EditFormState;


export const EditFormContext: Context<EditForm> = createContext (null);


export default class EditForm extends FormPage<EditFormProps, EditFormState> {

	private form_ref: RefObject<HTMLFormElement> = createRef ();
	private editor_ref: RefObject<any> = createRef ();


	private get_edit_form (form_data: FormData) {
		let editor_data = Object.create (this.props.body.defaultProps.constructor.prototype);

		for (let entry of form_data.entries ()) {
			editor_data [entry [0]] = entry [1];
		}// for;

		return <EditForm {...this.props} data={editor_data}/>;
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
				return field.style.border = "solid 1px red";
			}// if;
			
		});

		this.setState ({ complete });

		return complete;

	}// required_fields_completed;


	private save_record (event: MouseEvent<HTMLButtonElement>) {

		if (!this.required_fields_completed ()) return event.preventDefault ();

		let form_data = new FormData (this.form_ref.current).remove_empties ();
		let new_record = !form_data.has ("id");

		main_page.popup_window.show (<div className="column-centered column-spaced row-block">
			<img src="Images/eyecandy.gif" />
			Saving {this.props.parent.props.name}. One moment, please.
		</div>);

		APIClass.fetch_data (`Save${this.props.parent.props.name.titleCase ()}`, form_data).then (response => {

			if (new_record) {

				this.props.parent.add_row (response);

				return main_page.popup_window.show (<div>

					Transaction saved. Save another one?

					<div className="button-bar">
						<button onClick={() => main_page.popup_window.show (this.get_edit_form (form_data))}>Yes</button>
						<button onClick={() => main_page.popup_window.hide ()}>No</button>
					</div>

				</div>);

			}// if;

			this.props.parent.update_row (response);
			main_page.popup_window.hide ();
			
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

				<div className={`${this.state.complete ? "hidden" : String.Empty} row-centered warning`}>The highlighted fields are required.</div>

				<form ref={this.form_ref}><this.props.body id={this.props.id} data={this.props.data} broker_id={this.props.broker_id} ticker_id={this.props.ticker_id} ref={this.editor_ref} /></form>

				<div className="button-bar">
					<button id="save_button" onClick={(event: MouseEvent<HTMLButtonElement>) => this.save_record (event)}>Save</button>
					{main_page.popup_window.close_button}
				</div>

			</div>
		</EditFormContext.Provider>
	}// render;

}// EditForm;