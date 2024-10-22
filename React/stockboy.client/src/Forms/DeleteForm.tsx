import APIClass from "Classes/APIClass";
import DataTableControl from "Controls/DataTableControl";
import Eyecandy from "Controls/Eyecandy";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { IBaseModel } from "Models/Abstract/BaseModel";
import { ListPage } from "Pages/Abstract/ListPage";


const key_names: Array<string> = ["id", "broker_id", "ticker_id", "deleted"];


class DeleteFormProps extends BaseProps {
	table_name: string = null;
	invisible_fields?: Array<string> = null;
	record: IBaseModel = null;
	additional_text?: string = null;
	table: DataTableControl = null;
}// DeleteFormProps;


export class DeleteForm extends ListPage<DeleteFormProps> {

	public delete_record () {
		main_page.popup_window.show (<Eyecandy text={`Deleting ${this.props.table_name}...`}
			command={() => APIClass.fetch_data (`Delete${this.props.table_name}`, this.props.record).then (() => {

				this.props.table.remove_row ();

				main_page.popup_window.show (<div>

					{this.props.table_name} deleted.

					<div className="row-centered with-some-headspace">
						<button onClick={() => main_page.popup_window.hide ()}>Close</button>
					</div>

				</div>);

			})}>
		</Eyecandy>);
	}// delete_record;


	public render () {
		return <div>

			Delete<br />

			<br />

			<div className="two-column-grid"> {
				Object.keys (this.props.record).map (key => {

					if (key_names?.contains (key)) return;
					if (this.props.invisible_fields?.contains (key)) return;

					return <div key={key} style={{ display: "contents" }}>
						<label>{key.titleCase ()}:</label>
						<div>{this.props.record [key]}</div>
					</div>

				})
			} </div><br />

			{this.props.additional_text}{conditional (isset (this.props.additional_text), <br />)}

			Are you sure?

			<div className="button-bar">
				<button onClick={() => this.delete_record ()}>Yes</button>
				<button onClick={() => main_page.popup_window.hide ()}>No</button>
			</div>

		</div>
	}// render;

}// DeleteForm;