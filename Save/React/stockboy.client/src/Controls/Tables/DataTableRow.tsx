import BaseComponent from "Controls/BaseComponent";
import DataTable from "Controls/Tables/DataTable";

import { CSSProperties, MouseEvent } from "react";
import { IBaseModel } from "Models/Abstract/BaseModel";


class DataRowProps {
	row: IBaseModel = null;
	field_names: Array<string> = null;
	data_table: DataTable = null;
	onclick: Function = null;
}// DataRowProps;


class DataRowState {}


export default class DataTableRow extends BaseComponent<DataRowProps, DataRowState> {

	private active_row = (element: EventTarget) => (element as HTMLDivElement).parentNode as HTMLDivElement;


	private styles (key: string, value: any): CSSProperties {

		let result: CSSProperties = {}

		if (this.props.data_table.props.currency_fields?.contains (key) || this.props.data_table.props.numeric_fields?.contains (key)) result ["textAlign"] = "right";
		return result;

	}// styles;


	private format (field_name: string, value: string | number): string | number {

		if ((field_name == "current_price") && ((value as unknown as number) == -1)) return "N/A";

		if (this.props.data_table.props.date_fields?.contains (field_name)) return Date.format (value as string);
		if (this.props.data_table.props.currency_fields?.contains (field_name)) return (value as number)?.number_format (currency_decimals);
		if (this.props.data_table.props.numeric_fields?.contains (field_name)) return (value as number)?.number_format (numeric_decimals);

		return value;
	}// format;


	private get_selected_row (event: MouseEvent): IBaseModel {

		let key_rows: NodeListOf<HTMLInputElement> = event.currentTarget.parentNode.querySelectorAll ("[name=keys] input[type=hidden]");

		for (let row of this.props.data_table.props.data) {

			let matches = true;

			key_rows.forEach ((key_row: HTMLInputElement) => {
				if (row [key_row.name] != key_row.value) matches = false;
			});

			if (matches) return row;

		}// for;

		return null;

	}// get_selected_row;


	/********/


	public state: DataRowState = new DataRowState ();


	public get selected_class (): string { return (this.props.row == this.props.data_table.state.selected_row) ? " selected" : String.Empty; }


	public render () {

		return <div key={this.next_key} className={`table-row ${this.selected_class}`}

			onMouseOver={(event: MouseEvent) => this.active_row (event.target).classList.add ("highlighted")}
			onMouseOut={(event: MouseEvent) => this.active_row (event.target).classList.remove ("highlighted")}>

			{isset (this.props.data_table.props.keys) ? <div name="keys" style={{ display: "none" }}>
				{this.props.data_table.props.keys.map (key => <input key={this.next_key} type="hidden" name={key.toString ()} value={this.props.row [key as keyof IBaseModel].toString ()} />)}
			</div> : null}

			{this.props.field_names.map (field_name => {
				
				let value: (string | number) = this.props.row [field_name as keyof IBaseModel];

				return <div key={this.next_key} style={ this.styles (field_name, value) }

					onClick={(event: MouseEvent) => {

						let row: IBaseModel = this.get_selected_row (event);

						this.props.data_table.setState ({ selected_row: row }, () => {
							if (isset (this.props.onclick)) this.props.onclick (this.props.row.merge ({keys: this.props.data_table.state.selected_row}));
						});

					}}>

					{this.format (field_name, value)}
				</div>

			})}

		</div>

	}// render;

}// DataTableRow;