import APIClass from "Classes/APIClass";

import DataPageControl from "Controls/DataPageControl";
import Eyecandy from "Controls/Eyecandy";

import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component, ComponentClass, createRef, MouseEvent, RefObject } from "react";


export class EditFormControlProps {
	form: ComponentClass<any>;
	data: IBaseModel;
	data_page_control: DataPageControl;
	save_command: string;
}// EditFormControlProps;


export enum PromptResponse { Proceed, Cancel, Abort }


export default class EditFormControl extends Component<EditFormControlProps> {

	private form: RefObject<HTMLFormElement> = createRef ();
	private form_body: RefObject<any> = createRef ();


	private get eyecandy () { return <Eyecandy text={`Saving record. One moment, please.`} /> }


	private required_fields_completed (): boolean {

		let fields: FormFieldList = this.form.current.querySelectorAll (form_fields);
		let result: boolean = true;

		fields.forEach ((field: FormField) => {
			if (field.hasAttribute ("required") && (not_defined (field.value))) {
				field.setAttribute ("enforced", "true");
				result = false;
			}// if;
		});

		return result;

	}// required_fields_completed;


	private async save_record (event: MouseEvent<HTMLButtonElement>) {

		if (!this.required_fields_completed ()) return event.preventDefault ();

		let form_data: FormData = new FormData (this.form.current).get_data ();
		let new_record: boolean = !form_data.has ("id");

		popup_window.show (this.eyecandy);

		if (isset (this.form_body.current.onSave)) {
			let response = await this.form_body.current.onSave ();
			switch (response) {
				case PromptResponse.Cancel: return popup_window.show (<EditFormControl {...this.props} data={Object.fromEntries (form_data)}/>);
				case PromptResponse.Abort: return popup_window.hide ();
				case PromptResponse.Proceed: popup_window.show (this.eyecandy);
			}// switch;
		}// if;

		APIClass.fetch_data (this.props.save_command, form_data).then (response => {

			if (new_record) {

				this.props.data_page_control.add_row (response);

				return popup_window.show (<div>

					Transaction saved. Save another one?

					<div className="button-bar">
						<button onClick={() => popup_window.show (<EditFormControl {...this.props} data={Object.fromEntries (form_data)}/>)}>Yes</button>
						<button onClick={() => popup_window.hide ()}>No</button>
					</div>

				</div>);

			}// if;

			this.props.data_page_control.update_row (response);
			popup_window.hide ();
			
		});

	}// save_record;


	/********/


	public static defaultProps: EditFormControlProps = {
		form: null,
		data: null,
		data_page_control: null,
		save_command: null,
	}// defaultProps;


	public componentDidMount () {
		new MutationObserver ((mutations: Array<MutationRecord>) => {

			function set_required (element: FormField) {
				element.style.backgroundColor = "var(--required-field-color)";
				element.style.border = "solid 1px red";
			}// set_required;

			function clear_required (element: FormField) {
				element.style.removeProperty ("border");
				element.style.removeProperty ("background-color");
			}// clear_required;


			mutations.forEach ((mutation: MutationRecord) => {

				if (mutation.attributeName == "enforced") {

					let element = mutation.target as FormField;
					let event_name = element.tagType.matches ("select") ? "change" : "keyup";

					set_required (element);
					element.addEventListener (event_name, () => {
						if (is_defined (element.value)) return clear_required (element);
						set_required (element);
					});
				}// if;
		
			});

		}).observe (this.form.current, { childList: true, subtree: true, attributes: true });
	}// componentDidMount;


	public render () {
		return <div>

			<form ref={this.form}>
				<this.props.form data={this.props.data} ref={this.form_body} />
			</form>

			<div className="with-headspace">
				<div className="button-bar">
					<button id="save_button" onClick={async (event: MouseEvent<HTMLButtonElement>) => this.save_record (event)}>Save</button>
					{popup_window.close_button}
				</div>
			</div>

		</div>
	}// render;


}// EditFormControl;
