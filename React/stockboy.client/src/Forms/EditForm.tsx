import React, { ReactElement } from "react";
import BaseComponent from "Controls/BaseComponent";
/*
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import APIClass from "Controls/Abstract/APIClass";
import Eyecandy from "Controls/Eyecandy";
*/
import { IBaseModel } from "Models/Abstract/BaseModel";
import APIClass from "../Classes/APIClass";
import DataPage from "../Pages/DataPage";


export interface IEditFormProps {
	broker_id?: string;
	ticker_id?: string;
	data?: IBaseModel;
}// IEditFormProps


export class EditFormProps {
	broker_id?: string;
	ticker_id?: string;
	data?: IBaseModel;
	body: React.ComponentType<IEditFormProps>;
	parent: DataPage;
}// IEditFormProps;


class EditFormState {
	contents: ReactElement = null;
}// EditFormState;


export class EditForm extends BaseComponent<EditFormProps, EditFormState> {

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
*/


	private form_reference: React.RefObject<HTMLFormElement> = React.createRef ();


	private save_record () {
		let form_data = new FormData (this.form_reference.current);

		main_page.popup_window.show (<div className="column-centered column-spaced row-block">
			<img src="Images/eyecandy.gif" />
			Saving transaction<br />
			One moment, please.
		</div>);

		APIClass.fetch_data ("SaveTransaction", form_data).then (response => {
			this.props.parent.add_new_row (response);
			main_page.popup_window.show (<div>
				Transaction saved.<br />
				Save another one?
				<div className="button-bar">
					<button onClick={() => main_page.popup_window.show (<EditForm {...this.props} />)}>Yes</button>
					<button onClick={() => main_page.popup_window.hide ()}>No</button>
				</div>
			</div>)
			
		});

	}// save_record;


	/********/


	public state: EditFormState = new EditFormState ();


	public static defaultProps: EditFormProps = {
		broker_id: null,
		ticker_id: null,
		data: null,
		body: null,
		parent: null
	}// defaultProps;


	public render = () => <div>

		<form ref={this.form_reference}><this.props.body data={this.props.data} broker_id={this.props.broker_id} ticker_id={this.props.ticker_id} /></form>

		<div className="button-bar">
			<button id="save_button" onClick={() => this.save_record ()}>Save</button>
			{main_page.popup_window.close_button}
		</div>

	</div>

}// EditForm;