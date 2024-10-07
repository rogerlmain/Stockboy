import React from "react";

import NameValueCollection, { KeyValuePair } from "Classes/Collections";
import BaseComponent from "Controls/BaseComponent";
import GlyphArrow, { direction_type } from "Controls/GlyphArrow";
import DataTableRow from "Controls/Tables/DataTableRow";

import { IBaseModel } from "Models/Abstract/BaseModel";


class DataTableState {
	sort_field: string = null;
	ascending: boolean = true;
	selected_row: IBaseModel = null;
}// DataTableState;


export class DataTableProperties {
	fields?: Array<string | KeyValuePair<string>> = null;
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


	private initial_styles: React.CSSProperties = null;
	private reference: React.RefObject<HTMLDivElement> = React.createRef ();

	private totals: NameValueCollection<number> = null;


	private get field_count () { return not_set (this.props.keys) ? this.props.fields.length : this.props.fields.length };


	private field_name (field: string | NameValueCollection<string>): string {
		if (String.isString (field)) return field.toString ();
		return Object.keys (field) [0];
	}// field_name;


	private field_title (field: string | NameValueCollection<string>): string {
		if (String.isString (field)) return (field as string).titleCase ();
		return field [this.field_name (field)].titleCase ();
	}// field_title;


	private field_name_list (): Array<string> {

		let result: Array<string> = null;

		this.props.fields.forEach ((field: string | NameValueCollection<string>) => {
			if (is_null (result)) result = new Array<string> ();
			result.push (this.field_name (field));
		});

		return result;

	}// field_name_list


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


	private calculate_totals () {
		this.props.total_fields.forEach ((field: string) => {
			this.props.data.forEach ((item: IBaseModel) => {
				if (is_null (item?.[field])) return;
				if (is_null (this.totals)) this.totals = new NameValueCollection<number> ();
			//	if (Object.keys (this.totals)
			});
		});
	}// calculate_totals;


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
		this.initial_styles = { gridTemplateColumns: `repeat(${this.field_count}, min-content)` }
	}// constructor;


	public componentDidUpdate (old_props: DataTableProps, old_state: DataTableState) {
		this.update_styles ();
	}// componentDidUpdate;


	public componentDidMount = () => this.update_styles ();


	public render () {
		
		if (isset (this.props.total_fields)) this.calculate_totals ();
		if (is_null (this.props.data) || (this.props.data.length == 0)) return <div>No data</div>;
		
		return <div className="data-table" ref={this.reference}

			style={this.initial_styles}>
	
			<div className="table-header">
				{this.props.fields.map ((field: string | NameValueCollection<string>) => {
					
					let name = this.field_name (field);
					let title = this.field_title (field);

					return <div key={this.next_key} onClick={() => this.sort_table (name)}>
						{title}
						{(name == this.state.sort_field) ? <GlyphArrow direction={this.state.ascending? direction_type.forwards : direction_type.backwards} /> : null}
					</div>

				})}
			</div>

			{this.props.data.map (row => <DataTableRow key={this.next_key} row={row} field_names={this.field_name_list ()} onclick={this.props.onclick} data_table={this} />)}

			{isset (this.props.total_fields) ? this.show_totals () : null}

		</div>

	}// render;
	

}// DataTable;