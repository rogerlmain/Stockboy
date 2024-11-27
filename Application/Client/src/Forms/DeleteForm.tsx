import StockboyAPI from "Classes/StockboyAPI";
import Eyecandy from "Controls/Common/Eyecandy";
import DataPageControl from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component } from "react";


const key_names: StringArray = ["id", "broker_id", "ticker_id", "deleted"];


interface InvisibleFieldsFunction extends Function {
	invisible_fields: StringArray;
}// Function;


class DeleteFormProps extends BaseProps {
	data: IBaseModel;
	data_page_control: DataPageControl;
	invisible_fields?: StringArray;
	additional_text?: string;
	delete_command: string;
}// DeleteFormProps;


export class DeleteForm extends Component<DeleteFormProps> {

	public delete_record () {
		popup_window.show (<Eyecandy text={`Deleting record...`}
			command={() => new StockboyAPI ().fetch_data (this.props.delete_command, this.props.data).then (() => {

				this.props.data_page_control.remove_row ();

				popup_window.show (<div>

					Record deleted.

					<div className="row-centered with-some-headspace">
						<button onClick={() => popup_window.hide ()}>Close</button>
					</div>

				</div>);

			})}>
		</Eyecandy>);
	}// delete_record;


	public render () {

		let invisible_fields = (this.props.data.constructor as InvisibleFieldsFunction).invisible_fields;

		return <div>

			Delete<br />

			<br />

			<div className="two-column-grid"> {
				Object.keys (this.props.data).map (key => {

					if (key_names?.contains (key)) return;
					if (invisible_fields?.contains (key)) return;

					return <div key={key} style={{ display: "contents" }}>
						<label>{key.titleCase ()}:</label>
						<div>{this.props.data [key]}</div>
					</div>

				})
			} </div><br />

			{this.props.additional_text}{conditional (isset (this.props.additional_text), <br />)}

			Are you sure?

			<div className="button-bar">
				<button onClick={() => this.delete_record ()}>Yes</button>
				<button onClick={() => popup_window.hide ()}>No</button>
			</div>

		</div>
	}// render;

}// DeleteForm;