import ScrollBlock from "Controls/ScrollBlock";
import DataTableRow from "Controls/Tables/DataTableRow";

import NameValueCollection from "Classes/Common/Collections";
import GlyphArrow, { direction_type } from "Controls/GlyphArrow";

import { DataKey, DataKeyArray } from "Classes/DataKeys";
import { BaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component, createRef, RefObject } from "react";


class DataTableState implements IBaseState {
	sort_field: string = null;
	ascending: boolean = true;
	selected_row: IBaseModel = null;
}// DataTableState;


export class DataTableProperties extends BaseProps {
	fields?: DataKeyArray = null;
	date_fields?: StringArray = null;
	numeric_fields?: StringArray = null;
	currency_fields?: StringArray = null;
	total_fields?: StringArray = null;
	rounded_fields?: Array<NameValueCollection<number>> = null;
	highlighted_fields?: StringArray = null;
	keys?: StringArray = null;
	onclick?: Function;
}// DataTableProperties;


export class DataTableProps extends BaseProps {
	data: Array<IBaseModel>;
	properties: DataTableProperties;
	parent: Component;
}// DataTableProps;


export default class DataTable extends Component<DataTableProps> {


	private data_block: RefObject<HTMLDivElement> = createRef ();
	private totals: NameValueCollection<number> = null;


	private get field_count () { return not_set (this.props.properties.keys) ? this.props.properties.fields.length : this.props.properties.fields.length };


	private get_key = (value: any):string => Object.values (value).join ().replace (/\W/g, String.Empty);


	private sort_table (sort_field: string, ascending: boolean) {

		let key = sort_field as keyof IBaseModel;
		let sort_values: Array<IBaseModel> = this.props.data.toSorted ((first, second) => ascending ? (first [key] >= second [key] ? 1 : -1) : (first [key] <= second [key] ? 1 : -1));

		this.setState ({ 
			sort_field,
			ascending
		}, () => this.props.parent.setState ({ data: sort_values }));
		
	}// sort_table;


	private calculate_totals () {

		this.totals = null;

		this.props.properties.total_fields.forEach ((field: string) => {
			this.props.data.forEach ((item: IBaseModel) => {
				if (is_null (item?.[field])) return;
				if (is_null (this.totals)) this.totals = new NameValueCollection<number> ();
				this.totals [field] = (this.totals [field] ?? 0) + (item [field] ?? 0);
			});
		});

	}// calculate_totals;


	private show_totals () {
/*
		let blank_field = (index: number): boolean => {
			if (index == (this.props.properties.fields.length - 1)) return false;
			if (this.props.properties.total_fields.contains (this.props.properties.fields.names [index + 1])) return false;
			return true;
		}// blank_field;
*/
		let field_names = this.props.properties.fields.ids;

		return <div className="table-footer">

			{field_names.map ((name: string) => {

				let index: number = field_names.indexOf (name);
				let total = this.totals?.[name] ?? 0;

				if (index == 0) return <div key="total" className="data-cell">Total</div>
				if (!this.props.properties.total_fields.contains (name)) return <div key={name}></div>

				return <div key={name} className="right-aligned row-block data-cell">
					{this.format (name, total)}
				</div>

			})}

		</div>

	}// show_totals;


	/********/


	public state = new DataTableState ();


	public format (field_name: string, value: FieldValue): string {

		let number_format = (decimal_places: number) => (value as number).round_to (decimal_places).padFractions (decimal_places);
		let rounded_field = this.props.properties.rounded_fields?.find ((item: NameValueCollection<number>) => item.hasKey (field_name));

		if ((field_name == "current_price") && ((value as number) == -1)) return "N/A";

		if (isset (rounded_field)) return number_format (rounded_field [field_name]);
		if (this.props.properties.currency_fields?.contains (field_name)) return number_format (currency_decimals);
		if (this.props.properties.numeric_fields?.contains (field_name)) return number_format (numeric_decimals);
		if (this.props.properties.date_fields?.contains (field_name)) return Date.format (value as Date);

		return (value as string);

	}// format;


	public componentDidUpdate (props: DataTableProps) {
		if (props?.data?.matches (this.props.data)) return;
		if (isset (this.data_block.current)) this.data_block.current.style.gridTemplateColumns = `repeat(${this.field_count}, min-content)`;
		if (isset (this.state.sort_field)) this.sort_table (this.state.sort_field, this.state.ascending);
	}// componentDidUpdate;


	public componentDidMount = () => this.componentDidUpdate (null);


	public render () {

		if (is_null (this.props.data) || (this.props.data.length == 0)) return <div className="row-centered with-headspace">{no_data}</div>;
		if (isset (this.props.properties.total_fields)) this.calculate_totals ();
		
		return <div className="scrollable right-aligned column-block">

			<ScrollBlock>
				<div className="data-table" ref={this.data_block}>

					<div className="table-header">
						{this.props.properties.fields.map ((field: DataKey) => <div key={field.id} onClick={() => {
							this.sort_table (field.id, (this.state.sort_field == field.id) ? !this.state.ascending : true)
						}}>
							{field.name.titleCase ()}
							{(field.id == this.state.sort_field) ? <GlyphArrow direction={this.state.ascending? direction_type.forwards : direction_type.backwards} /> : null}
						</div>)}
					</div>

					{this.props.data.map (row => <DataTableRow key={this.get_key (row)} row={row} data_table={this} 
						field_ids={this.props.properties.fields.ids} 
						onclick={this.props.properties.onclick}>
					</DataTableRow>)}

					{isset (this.props.properties.total_fields) ? this.show_totals () : null}

				</div>
			</ScrollBlock>

			<div className="full-width right-aligned bold-text row-block with-some-headspace">Total: {this.props.data.length} {"record".plural (this.props.data.length)}</div>

		</div>

	}// render;

}// DataTable;