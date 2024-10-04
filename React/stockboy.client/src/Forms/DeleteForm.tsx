import BaseComponent, { BaseProps } from "Controls/BaseComponent";

import { IBaseModel } from "Models/Abstract/BaseModel";
import { NameValueCollection } from "Classes/Collections";


class DeleteFormProps extends BaseProps {
	key_names: Array<string> = null;
	record: IBaseModel = null;
}// DeleteFormProps;


export class DeleteForm extends BaseComponent<DeleteFormProps> {


	private delete_row () {
/*
		main_page.popup_window.show (<Eyecandy text={"Deleting transaction"}
			command={() => APIClass.fetch_data ("DeleteSplit", this.state.selected_row).then (() => {
				this.remove_selected_row ();
				main_page.popup_window.hide ();
			})}>
		</Eyecandy>),
*/

		main_page.popup_window.hide ();
	}// delete_row;


	public render = () => <div>

		Delete<br />

		<br />

		<div className="two-column-grid"> {
			Object.keys (this.props.record).map (key => {
				if (key == "id") return null;
				return <div key={this.next_key} style={{ display: "contents" }}>
					<label>{key.titleCase ()}:</label>
					<div>{this.props.record [key]}</div>
				</div>
			})
		} </div><br />

		Are you sure?

		<div className="button-bar">
			<button onClick={() => this.delete_row ()}>Yes</button>
			<button onClick={() => main_page.popup_window.hide ()}>No</button>
		</div>

	</div>

}// DeleteForm;