import Decimal from "Classes/Decimal";
import DataTableRow from "Controls/Tables/DataTableRow";

import NameValueCollection, { KeyValuePair } from "Classes/Collections";
import GlyphArrow, { direction_type } from "Controls/GlyphArrow";

import { BaseProps, IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { ListControl } from "Controls/Abstract/ListControl";
import { IBaseModel } from "Models/Abstract/BaseModel";
import { Component, createRef, CSSProperties, RefObject } from "react";


class DataTableState implements IBaseState {
	sort_field: string = null;
	ascending: boolean = true;
	selected_row: IBaseModel = null;
}// DataTableState;


export class DataTableProperties extends BaseProps {
	fields?: Array<string | KeyValuePair<string>> = null;
	date_fields?: Array<string> = null;
	numeric_fields?: Array<string> = null;
	currency_fields?: Array<string> = null;
	total_fields?: Array<string> = null;
	keys?: Array<string> = null;
	onclick?: Function;
}// DataTableProperties;


export class DataTableProps extends DataTableProperties implements IBaseProps {
	data: Array<IBaseModel> = null;
	parent: Component = null;
}// DataTableProps;


export default class DataTable extends ListControl<DataTableProps> {


	private initial_styles: CSSProperties = null;
	private reference: RefObject<HTMLDivElement> = createRef ();

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
		let data_styles: CSSProperties = new Object ().copy (this.initial_styles);

		let overflow: boolean = (data_table.scrollHeight > data_table.parentElement.clientHeight);

		data_table.style.copy (data_styles, {
			height: overflow && "100%",
			overflowY: overflow && "scroll"
		});

	}// update_styles;


	private calculate_totals () {

		this.totals = null;

		this.props.total_fields.forEach ((field: string) => {
			this.props.data.forEach ((item: IBaseModel) => {
				if (is_null (item?.[field])) return;
				if (is_null (this.totals)) this.totals = new NameValueCollection<number> ();
				this.totals [field] = Decimal.add (this.totals [field], item [field]);
			});
		});

	}// calculate_totals;


	private show_totals () {

		let field_name = (field: string | KeyValuePair<string>) => String.isString (field) ? (field as string) : Object.keys (field) [0];

		let blank_field = (name: string, index: number): boolean => {
			if (index == (this.props.fields.length - 1)) return false;
			if (this.props.total_fields.contains (field_name (this.props.fields [index + 1]))) return false;
			if (this.props.total_fields.contains (field_name (this.props.fields [index + 1]))) return false;
			return true;
		}// blank_field;

		return <div style={{ fontWeight: "bold", display: "contents" }}>
			{this.props.fields.map ((field: string | NameValueCollection<string>) => {

				let index: number = this.props.fields.indexOf (field);
				let name: string = field_name (field);
				let total = this.totals?.[name] ?? 0;

				if (index == 0) return <div style={{ borderRight: "none" }}>Total</div>
				if (!this.props.total_fields.contains (name)) return <div style={blank_field (name, index) ? { borderRight: "none" } : null}></div>

				if (this.props.currency_fields?.contains (name)) total = Decimal.padFractions (Decimal.round (total, currency_decimals), currency_decimals);
				if (this.props.numeric_fields?.contains (name)) total = Decimal.padFractions (Decimal.round (total, numeric_decimals), numeric_decimals);

				return <div style={{ textAlign: "right", borderLeft: "solid 1px var(--table-border) !important" }}>{total}</div>

			})}
		</div>
	}// show_totals;


	/********/


	public state = new DataTableState ();


	public constructor (props: DataTableProps) {
		super (props);
		this.initial_styles = { gridTemplateColumns: `repeat(${this.field_count}, min-content)` }
	}// constructor;


	public componentDidUpdate (previous_props: DataTableProps, previous_state: DataTableState) {
		if (isset (this.reference.current)) this.update_styles ();
	}// componentDidUpdate;


	public componentDidMount () {
		if (isset (this.reference.current)) this.update_styles ();
	}// componentDidMount;


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