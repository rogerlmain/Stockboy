import React from "react";

import BaseComponent from "Controls/BaseComponent";
import GlyphArrow, { direction_type } from "./GlyphArrow";

import { NameValueCollection } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";


class DataRowProps {
	row: IBaseModel;
	keys: Array<string> = null;
	field_names: Array<string> = null;
	data_table: DataTable = null;
	onclick: Function = null;
}// DataRowProps;


class DataTableProps {
	id : String = null;
	data : Array<IBaseModel> = null;
	totals? : Array<string> = null;
	fields? : Array<string> = null;
	keys? : Array<string> = null;
	onclick ? : Function;
	parent: React.Component = null;
}// DataTableProps;


class DataTableState {
	sort_field: string = null;
	ascending: boolean = true;
	selected_row: NameValueCollection = null;
}// DataTableState;


class DataRowState {}


class DataTableRow extends BaseComponent<DataRowProps, DataRowState> {

	private get key_values (): NameValueCollection {

		let result: NameValueCollection = null;

		this.props.keys.forEach ((key: String) => {
			if (is_null (result)) result = new NameValueCollection ();
			result [key.toString ()] = this.props.row [key as keyof IBaseModel];
		});

		return result;

	}// key_values;


	private active_row = (element: EventTarget) => (element as HTMLDivElement).parentNode as HTMLDivElement;


	/********/


	public state: DataRowState = new DataRowState ();


	public get selected_class (): string { 

		let selected_row: NameValueCollection = this.props.data_table.state.selected_row;
		let selected: boolean = true;

		if (is_null (selected_row)) return String.Empty;

		Object.keys (selected_row).forEach (key => {
			if (selected_row [key] != this.key_values [key]) selected = false;
		})// for;

		return selected ? " selected" : String.Empty;

	}// selected_class;


	public render () {

		let keys: NameValueCollection = this.key_values;

		return <div key={this.next_key} className={`table-row ${this.selected_class}`}

			onMouseOver={(event: React.MouseEvent) => this.active_row (event.target).classList.add ("highlighted")}
			onMouseOut={(event: React.MouseEvent) => this.active_row (event.target).classList.remove ("highlighted")}>

			{isset (this.props.keys) ? <div name="keys" style={{ display: "none" }}>
				{this.props.keys.map (key => <input key={this.next_key} type="hidden" name={key.toString ()} value={this.props.row [key as keyof IBaseModel].toString ()} />)}
			</div> : null}

			{this.props.field_names.map (key => <div key={this.next_key}

				onClick={(event: React.MouseEvent) => {
					this.props.data_table.setState ({ selected_row: this.key_values });
					if (isset (this.props.onclick)) this.props.onclick (this.key_values)}
				
				}>

				{this.props.row [key as keyof IBaseModel]}
			</div>)}


		</div>

	}// render;

}// DataTableRow;


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
		let data_styles: React.CSSProperties = new Object ().merge (this.initial_styles);

		let overflow: boolean = (data_table.scrollHeight > data_table.parentElement.clientHeight);

		Object.assign (data_table.style, data_styles.merge ({
			height: overflow ? "100%" : String.Empty,
			overflowY: overflow ? "scroll" : String.Empty
		}));

	}// callback_reference;


	/********/


	public state = new DataTableState ();


	public constructor (props: DataTableProps) {
		super (props);
		this.field_names = isset (this.props.fields) ? this.props.fields : Object.keys (this.props.data [0]);
		this.initial_styles = { gridTemplateColumns: `repeat(${this.field_count}, min-content)` }
	}// constructor;


	public get selected_row (): IBaseModel { return this.props.data.find ((element: IBaseModel) => element.id == this.state.selected_row.id) }


	public componentDidUpdate (old_props: DataTableProps, old_state: DataTableState) {
		if (old_props.data != this.props.data) this.setState ({data: this.props.data});
		this.update_styles ();
	}// componentDidUpdate;


	public componentDidMount = () => this.update_styles ();


	public render = () => (is_null (this.props.data) || (this.props.data.length == 0)) ? <div>No data</div> : <div className="data-table" ref={this.reference}

		style={this.initial_styles}>
	
		<div className="table-header">
			{this.field_names.map (key => <div key={this.next_key} onClick={() => this.sort_table (key)}>
				{key.titleCase ()}
				{key == isset (this.state.sort_field) ? <GlyphArrow direction={this.state.ascending? direction_type.forwards : direction_type.backwards} /> : null}
			</div>)}
		</div>

		{this.props.data.map (row => <DataTableRow key={this.next_key} row={row} keys={this.props.keys} field_names={this.field_names} onclick={this.props.onclick} data_table={this} />)}

	</div>


}// DataTable;