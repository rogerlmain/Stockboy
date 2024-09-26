import React from "react";
import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import PopupWindow from "Controls/PopupWindow";
import DataPage from "Pages/Abstract/DataPage";

import { NameValueCollection } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";


class TransactionEyecandyProps extends BaseProps {
	command: Function = null;
	text: String = null;
}// TransactionEyecandyProps;


class TransactionFormProps extends BaseProps {
	transaction?: IBaseModel = null; // Make mandatory after development
}// TransactionFormProps;


export class TransactionEyecandy extends DataPage<TransactionEyecandyProps> {


	public componentDidMount = () => this.props.command ();


	public render = () => <div className="row-block">
		<img src="Images/eyecandy.gif" className="eyecandy" />
		Deleting...
	</div>

}// TransactionEyecandy;


export class DeleteTransactionForm extends BaseComponent<TransactionFormProps> {

	public render = () => <div>
		Delete<br />
		<br />
		<div className="two-column-grid">
		{
			Object.keys (this.props.transaction).map (key => {
				if (key == "id") return null;
				return <div key={this.next_key} style={{ display: "contents" }}>
					<label>{key.titleCase ()}:</label>
					<div>{this.props.transaction [key]}</div>
				</div>
			})
		}
		</div><br />
		Are you sure?
	</div>

}// DeleteTransactionForm;


export class EditTransactionForm extends BaseComponent<TransactionFormProps> {

	public render = () => <div>Editing...</div>

}// EditTransactionForm;