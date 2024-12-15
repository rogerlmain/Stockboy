import DataPageControl from "Controls/DataPageControl";
import Eyecandy from "Controls/Common/Eyecandy";

import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component, ComponentClass, createRef, MouseEvent, RefObject } from "react";
import StockboyAPI from "../Classes/StockboyAPI";


export class EditFormControlProps {
	form?: ComponentClass<any>;
	children?: ChildElement;
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

		const fields: FormFieldList = this.form.current.querySelectorAll (form_fields);
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

		const form_data: FormData = new FormData (this.form.current).get_data ();
		const new_record: boolean = !form_data.has ("id");

		popup_window.show (this.eyecandy);

		if (isset (this.form_body.current.onSave)) {
			const response = await this.form_body.current.onSave ();
			switch (response) {
				case PromptResponse.Cancel: return popup_window.show (<EditFormControl {...this.props} data={Object.fromEntries (form_data)}/>);
				case PromptResponse.Abort: return popup_window.hide ();
				case PromptResponse.Proceed: popup_window.show (this.eyecandy);
			}// switch;
		}// if;

		new StockboyAPI ().fetch_data (this.props.save_command, form_data).then (async response => {

			if (is_null (response)) return;

			let dataset: Array<IBaseModel> = this.props.data_page_control.props.parent.state ["data"].update<IBaseModel> (response);

			this.props.data_page_control.filter_handler.filter_data ();
			await this.props.data_page_control.props.parent.setState ({ data: dataset });

			if (new_record) {
				return popup_window.show (<div>

					Transaction saved. Save another one?

					<div className="button-bar">
						<button onClick={() => popup_window.show (<EditFormControl {...this.props} data={Object.fromEntries (form_data)}/>)}>Yes</button>
						<button onClick={() => popup_window.hide ()}>No</button>
					</div>

				</div>);
			}// if;

			popup_window.hide ();
			
		});

	}// save_record;


	/********/


	public static defaultProps: EditFormControlProps = {
		form: null,
		children: null,
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

					const element = mutation.target as FormField;
					const event_name = element.tagType.matches ("select") ? "change" : "keyup";

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
				{isset (this.props.form) ? <this.props.form data={this.props.data} ref={this.form_body} /> : null}
				{isset (this.props.children) ? this.props.children : null}
			</form>

			<div className="with-headspace">
				<div className="button-bar">
					<button id="save_button" onClick={async (event: MouseEvent<HTMLButtonElement>) => this.save_record (event)}>Save</button>
					{isset (this.props.form) ? popup_window.close_button () : null}
				</div>
			</div>

		</div>
	}// render;


}// EditFormControl;
