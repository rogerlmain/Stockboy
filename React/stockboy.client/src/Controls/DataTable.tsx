import React from "react";

import BaseComponent from "Controls/BaseComponent";
import GlyphArrow, { direction_type } from "Controls/GlyphArrow";

import { NameValueCollection } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";


class DataRowProps {
	row: IBaseModel = null;
	field_names: Array<string> = null;
	data_table: DataTable = null;
	onclick: Function = null;
}// DataRowProps;


class DataRowState {}


class DataTableRow extends BaseComponent<DataRowProps, DataRowState> {

	private active_row = (element: EventTarget) => (element as HTMLDivElement).parentNode as HTMLDivElement;


	private styles (key: string, value: any): React.CSSProperties {

		let result: React.CSSProperties = {}

		if (this.props.data_table.props.currency_fields?.contains (key) || this.props.data_table.props.numeric_fields?.contains (key)) result ["textAlign"] = "right";
		return result;

	}// styles;


	private format (key: string, value: any) {
		if (this.props.data_table.props.date_fields?.contains (key)) return Date.format (value);
		if (this.props.data_table.props.currency_fields?.contains (key)) return value?.currency_format ();
		return value;
	}// format;


	private get_selected_row (event: React.MouseEvent): IBaseModel {

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

			onMouseOver={(event: React.MouseEvent) => this.active_row (event.target).classList.add ("highlighted")}
			onMouseOut={(event: React.MouseEvent) => this.active_row (event.target).classList.remove ("highlighted")}>

			{isset (this.props.data_table.props.keys) ? <div name="keys" style={{ display: "none" }}>
				{this.props.data_table.props.keys.map (key => <input key={this.next_key} type="hidden" name={key.toString ()} value={this.props.row [key as keyof IBaseModel].toString ()} />)}
			</div> : null}

			{this.props.field_names.map (key => {
				
				let value = this.props.row [key as keyof IBaseModel];
				
				return <div key={this.next_key} style={ this.styles (key, value) }

					onClick={(event: React.MouseEvent) => {

						let row: IBaseModel = this.get_selected_row (event);

						this.props.data_table.setState ({ selected_row: row }, () => {
							if (isset (this.props.onclick)) this.props.onclick (this.props.row.merge ({keys: this.props.data_table.state.selected_row}));
						});

					}}>

					{this.format (key, value)}
				</div>

			})}

		</div>

	}// render;

}// DataTableRow;


/********/


class DataTableState {
	sort_field: string = null;
	ascending: boolean = true;
	selected_row: IBaseModel = null;
}// DataTableState;


export class DataTableProperties {
	fields?: Array<string | NameValueCollection<string>> = null;
	date_fields?: Array<string> = null;
	numeric_fields?: Array<string> = null;
	currency_fields?: Array<string> = null;
	total_fields?: Array<string> = null;
	keys?: Array<string> = null;
	onclick?: Function;
}// DataTableProperties;


export class DataTableProps extends DataTableProperties {
	id: String = null;
	data: Array<IBaseModel> = null;
	parent: React.Component = null;
}// DataTableProps;


export default class DataTable extends BaseComponent<DataTableProps> {


	private field_names: string [] = null;
	private initial_styles: React.CSSProperties = null;
	private reference: React.RefObject<HTMLDivElement> = React.createRef ();


	private get field_count () { return not_set (this.props.keys) ? this.field_names.length : this.field_names.length };


	private sort_table (sort_field: string) {

		let key = sort_field as keyof IBaseModel;

		let ascending = (this.state.sort_field == sort_field) ? !this.state.ascending: true;
		let sort_values: Array<IBaseModel> = this.props.data.toSorted ((first, second) => ascending ? (first [key] > second [key] ? 1 : -1) : (first [key] > second [key] ? -1 : 1));

		this.setState ({ 
			sort_field,
			ascending
		}, () => this.props.parent.setState ({ data: sort_values }));
		
	}// sort_table;


	private update_styles () {

		let data_table: HTMLDivElement = this.reference.current;
		let data_styles: React.CSSProperties = new Object ().copy (this.initial_styles);

		let overflow: boolean = (data_table.scrollHeight > data_table.parentElement.clientHeight);

		data_table.style.copy (data_styles, {
			height: overflow ? "100%" : String.Empty,
			overflowY: overflow ? "scroll" : String.Empty
		});

	}// update_styles;


	private show_totals () {
		return <div style={{ fontWeight: "bold", display: "contents" }}>
			{this.props.fields.map ((field: string | NameValueCollection<string>) => {

				let field_index: number = this.props.fields.indexOf (field);
				let field_name: string = String.isString (field) ? field : field [Object.keys (field) [0]];

				if (field_index == 0) return <div>Total</div>
				if (this.props.total_fields.contains (field_name)) {

					let border_style: React.CSSProperties = { textAlign: "right" };
					let total = 0;

					if ((field_index == (this.props.fields.length - 1)) || (!this.props.total_fields.contains (this.props.fields [field_index + 1]))) border_style.borderRight = "none";
					this.props.data.forEach ((datum: IBaseModel) => total += datum [field_name]);
					// calculate and show the total
					return <div style={border_style}>{total}</div>;
				}// if;

				return <div style={{ borderRight: "none" }}></div>

			})}
		</div>
	}// show_totals;


	/********/


	public state = new DataTableState ();


	public constructor (props: DataTableProps) {

		super (props);

		if (isset (this.props.fields)) {
			this.props.fields.forEach ((field: string | NameValueCollection<string>) => {
				if (not_set (this.field_names)) this.field_names = new Array<string> ();
				if (String.isString (field)) return this.field_names.push (field as string);
				this.field_names.push (field [Object.keys (field) [0]]);
			});
		} else {
			this.field_names = Object.keys (this.props.data [0]);
		}// if;

		this.initial_styles = { gridTemplateColumns: `repeat(${this.field_count}, min-content)` }

	}// constructor;


	public componentDidUpdate (old_props: DataTableProps, old_state: DataTableState) {
		this.update_styles ();
	}// componentDidUpdate;


	public componentDidMount = () => this.update_styles ();


	public render = () => (is_null (this.props.data) || (this.props.data.length == 0)) ? <div>No data</div> : <div className="data-table" ref={this.reference}

			style={this.initial_styles}>
	
			<div className="table-header">
				{this.field_names.map (key => <div key={this.next_key} onClick={() => this.sort_table (key)}>
					{key.titleCase ()}
					{(key == this.state.sort_field) ? <GlyphArrow direction={this.state.ascending? direction_type.forwards : direction_type.backwards} /> : null}
				</div>)}
			</div>

			{this.props.data.map (row => <DataTableRow key={this.next_key} row={row} field_names={this.field_names} onclick={this.props.onclick} data_table={this} />)}

			{isset (this.props.total_fields) ? this.show_totals () : null}

		</div>
	

}// DataTable;