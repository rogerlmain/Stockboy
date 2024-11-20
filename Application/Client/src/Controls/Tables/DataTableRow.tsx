import DataTable, { DataTableProps } from "Controls/Tables/DataTable";

import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component, CSSProperties, MouseEvent } from "react";


class DataRowProps {
	row: IBaseModel = null;
	field_ids: StringArray = null;
	data_table: DataTable = null;
	onclick: Function = null;
}// DataRowProps;


class DataRowState {}


export default class DataTableRow extends Component<DataRowProps, DataRowState> {

	private active_row = (element: EventTarget) => (element as HTMLDivElement).parentNode as HTMLDivElement;
	private table_props: DataTableProps = null;


	public highlighted_color (field: string, value: number) {
		if (not_set (value)) return null;
		return this.table_props.properties.highlighted_fields?.contains (field) && (value != 0) ? ((value > 0) ? "#080" : "#A00") : null;
	}// highlighted_color;


	private styles (key: string, value: any): CSSProperties {

		let result: CSSProperties = {}

		if (this.table_props.properties.currency_fields?.contains (key) || this.props.data_table.props.properties.numeric_fields?.contains (key) || this.props.data_table.props.properties.date_fields?.contains (key)) result ["textAlign"] = "right";
		result ["color"] = this.highlighted_color (key, value);
		return result;

	}// styles;


	private get_selected_row (event: MouseEvent): IBaseModel {

		let key_rows: NodeListOf<HTMLInputElement> = event.currentTarget.parentNode.querySelectorAll ("div.keys input[type=hidden]");

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


	public constructor (props: DataRowProps) {
		super (props);
		this.table_props = props.data_table.props;
	}// constructor;


	public state: DataRowState = new DataRowState ();


	public get selected_class (): string { return (this.props.row == this.props.data_table.state.selected_row) ? "selected" : String.Empty}

	public render () {
		return <div className={`table-row ${this.selected_class}`}

			onMouseOver={(event: MouseEvent) => this.active_row (event.target).classList.add ("highlighted")}
			onMouseOut={(event: MouseEvent) => this.active_row (event.target).classList.remove ("highlighted")}>

			{isset (this.props.data_table.props.properties.keys) ? <div className="keys">
				{this.props.data_table.props.properties.keys.map (key => <input key={key} type="hidden" name={key.toString ()} value={this.props.row [key as keyof IBaseModel].toString ()} />)}
			</div> : null}

			{this.props.field_ids.map (field_id => {
				
				let value: FieldValue = this.props.row [field_id as keyof IBaseModel];

				return <div key={field_id} style={ this.styles (field_id, value) }

					onClick={(event: MouseEvent) => {
						let row: IBaseModel = this.get_selected_row (event);
						this.props.data_table.setState ({ selected_row: row }, () => event_handler.dispatchEvent (new CustomEvent ("row-selected", { detail: row })));
					}}>

					{isset (value) ? this.props.data_table.format (field_id, value) : "N/A"}
				</div>

			})}

		</div>
	}// render;

}// DataTableRow;