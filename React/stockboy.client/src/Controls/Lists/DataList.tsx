import APIClass from "Classes/APIClass";

import BaseComponent, { IBaseProps } from "Controls/BaseComponent";
import SelectList, { BaseSelectListProps } from "Controls/Lists/SelectList";

import { createRef, RefObject } from "react";

import Eyecandy from "Controls/Eyecandy";
import ListModel from "Models/ListModel";


class DataListProps extends BaseSelectListProps implements IBaseProps {
	title?: string;
	table: string;
	parameters?: any;
}// DataListProps;


class DataListState {
	loading: boolean = false;
	data?: Array<ListModel> = null;
}// DataListState;


export default class DataList extends BaseComponent<DataListProps, DataListState> {


	private select_list_ref: RefObject<SelectList> = createRef ();

	private get title () { return this.props.title ?? this.props.table.titleCase (true) ?? "Select one" }

	private get control_name () { return `${this.props.name}_list` }


	private load_data () {

		if (this.props.disabled) {
			this.setState ({ data: null });
			return;
		}// if;

		this.setState ({ loading: true }, () => APIClass.fetch_data (`Get${this.props.table.titleCase ()}`, this.props.parameters).then ((response: Array<ListModel>) => {
			this.setState ({ 
				data: response,
				loading: false
			}, () => this.select_list_ref.current.forceUpdate ());
		}));

	}// load_data;


	/********/


	public static defaultProps: DataListProps = { 
		name: null,
		header: null,
		selected_item: null,
		onChange: null,
		disabled: null,
		title: null,
		table: null,
		parameters: null,
	}// defaultProps;


	public state: DataListState = new DataListState ();


	public componentDidUpdate (previous_props: DataListProps) {
		if (this.props.parameters != previous_props.parameters) this.load_data ();
	}// componentDidUpdate;


	public componentDidMount = () => this.load_data ();


	public render () { 
		return <div className="row-block" style={{ alignItems: "center" }}>
			<label htmlFor={this.control_name}>{this.title}</label>
			{this.state.loading ? <Eyecandy text="Loading..." small={true} /> : <SelectList id={this.control_name} data={this.state.data} {...this.props} ref={this.select_list_ref} />}
		</div>
	}// render;

}// DataList;