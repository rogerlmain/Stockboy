import BaseComponent, { BaseProps } from "Controls/BaseComponent";

import { IBaseModel } from "Models/Abstract/BaseModel";
import { NameValueCollection } from "Classes/Collections";


class DeleteFormProps extends BaseProps {
	key_names: Array<string> = null;
	record: IBaseModel = null;
}// DeleteFormProps;


export class DeleteForm extends BaseComponent<DeleteFormProps> {

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
	</div>

}// DeleteForm;