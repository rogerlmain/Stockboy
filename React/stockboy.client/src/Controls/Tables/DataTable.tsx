import Decimal from "Classes/Decimal";
import ScrollBlock from "Controls/ScrollBlock";
import DataTableRow from "Controls/Tables/DataTableRow";
import BaseControl from "Controls/Abstract/BaseControl";

import NameValueCollection, { RoundingRecord } from "Classes/Collections";
import GlyphArrow, { direction_type } from "Controls/GlyphArrow";

import { BaseProps, IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { IBaseModel } from "Models/Abstract/BaseModel";
import { Component, createRef, RefObject } from "react";


class DataTableState implements IBaseState {
	sort_field: string = null;
	ascending: boolean = true;
	selected_row: IBaseModel = null;
}// DataTableState;


export class DataTableProperties extends BaseProps {
	fields?: Array<DataKey> = null;
	date_fields?: Array<string> = null;
	numeric_fields?: Array<string> = null;
	currency_fields?: Array<string> = null;
	total_fields?: Array<string> = null;
	rounded_fields?: Array<RoundingRecord> = null;
	highlighted_fields?: Array<string> = null;
	keys?: Array<string> = null;
	onclick?: Function;
}// DataTableProperties;


export class DataTableProps extends DataTableProperties implements IBaseProps {
	data: Array<IBaseModel> = null;
	parent: Component = null;
}// DataTableProps;


export default class DataTable extends BaseControl<DataTableProps> {


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

		this.props.fields.forEach ((field: DataKey) => {
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

		let blank_field = (name: string, index: number): boolean => {
			if (index == (this.props.fields.length - 1)) return false;
			if (this.props.total_fields.contains (key_name (this.props.fields [index + 1]))) return false;
			if (this.props.total_fields.contains (key_name (this.props.fields [index + 1]))) return false;
			return true;
		}// blank_field;


		return <div style={{ fontWeight: "bold", display: "contents" }}>

			{this.props.fields.map ((field: string | NameValueCollection<string>) => {

				let index: number = this.props.fields.indexOf (field);
				let name: string = key_name (field);
				let total = this.totals?.[name] ?? 0;

				if (index == 0) return <div key="total" style={{ borderRight: "none" }}>Total</div>
				if (!this.props.total_fields.contains (name)) return <div key={name} style={blank_field (name, index) ? { borderRight: "none" } : null}></div>

				return <div key={name} style={{ textAlign: "right", 
					color: this.highlighted_color (name, total),
					borderLeft: "solid 1px var(--table-border) !important" }}>
					{this.format (name, total)}
				</div>

			})}

		</div>

	}// show_totals;


	/********/


	public state = new DataTableState ();


	public format (field_name: string, value: FieldValue): string {

		let number_format = (decimal_places: number) => Decimal.padFractions (Decimal.round ((value as number), decimal_places), decimal_places);
		let rounded_field = this.props.rounded_fields?.find ((item: RoundingRecord) => item.hasKey (field_name));

		if ((field_name == "current_price") && ((value as number) == -1)) return "N/A";

		if (isset (rounded_field)) return number_format (rounded_field [field_name]);
		if (this.props.currency_fields?.contains (field_name)) return number_format (currency_decimals);
		if (this.props.numeric_fields?.contains (field_name)) return number_format (numeric_decimals);
		if (this.props.date_fields?.contains (field_name)) return Date.format (value as Date);

		return (value as string);

	}// format;


	public highlighted_color (field: string, value: number) {
		if (not_set (value)) return null;
		return this.props.highlighted_fields?.contains (field) && (value != 0) ? ((value > 0) ? "#080" : "#A00") : null;
	}// highlighted_color;


	public componentDidMount () {
		if (not_set (this.reference.current)) return;
		this.reference.current.style.gridTemplateColumns = `repeat(${this.field_count}, min-content)`;
	}// componentDidMount;


	public render () {
		
		if (isset (this.props.total_fields)) this.calculate_totals ();
		if (is_null (this.props.data) || (this.props.data.length == 0)) return <div>No data</div>;
		
		return <ScrollBlock>

			<div className="data-table" ref={this.reference}>
	
				<div className="table-header">
					{this.props.fields.map ((field: string | NameValueCollection<string>) => {
					
						let name = this.field_name (field);
						let title = this.field_title (field);

						return <div key={name} onClick={() => this.sort_table (name)}>
							{title}
							{(name == this.state.sort_field) ? <GlyphArrow direction={this.state.ascending? direction_type.forwards : direction_type.backwards} /> : null}
						</div>

					})}
				</div>

				{this.props.data.map (row => <DataTableRow key={this.get_key (row)} row={row} 
					field_names={this.field_name_list ()} 
					onclick={this.props.onclick} data_table={this}>
				</DataTableRow>)}

				{isset (this.props.total_fields) ? this.show_totals () : null}

			</div>
		</ScrollBlock>
	}// render;
	

}// DataTable;