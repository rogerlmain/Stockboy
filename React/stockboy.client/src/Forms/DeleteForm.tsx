import APIClass from "Classes/APIClass";
import DataPage from "Controls/DataPage";
import Eyecandy from "Controls/Eyecandy";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { IBaseModel } from "Models/Abstract/BaseModel";
import { FormPage } from "Pages/Abstract/FormPage";
import { ListPage } from "Pages/Abstract/ListPage";


class DeleteFormProps extends BaseProps {
	key_names: Array<string> = null;
	record: IBaseModel = null;
	parent: DataPage = null;
}// DeleteFormProps;


export class DeleteForm extends ListPage<DeleteFormProps> {

	public delete_record () {

		main_page.popup_window.show (<Eyecandy text={"Deleting transaction"}
			command={() => APIClass.fetch_data (`Delete${this.props.parent.props.name.titleCase ()}`, this.props.parent.state.selected_row).then (() => {
				this.props.parent.remove_row ();
				main_page.popup_window.hide ();
			})}>
		</Eyecandy>);

		main_page.popup_window.hide ();

	}// delete_record;


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
			<button onClick={() => this.delete_record ()}>Yes</button>
			<button onClick={() => main_page.popup_window.hide ()}>No</button>
		</div>

	</div>

}// DeleteForm;