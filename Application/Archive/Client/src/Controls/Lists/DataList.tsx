import APIClass from "Classes/APIClass";
import Eyecandy from "Controls/Eyecandy";

import SelectList, { BaseSelectListProps } from "Controls/Lists/SelectList";

import { Component, createRef, RefObject } from "react";
import { DataKeyArray } from "Classes/DataKeys";


class DataListProps extends BaseSelectListProps {
	public title?: string;
	public table: string;
	public parameters?: any;
}// DataListProps;


class DataListState {
	public loading: boolean = false;
	public data?: DataKeyArray = null;
}// DataListState;


export default class DataList extends Component<DataListProps, DataListState> {


	private select_list: RefObject<SelectList> = createRef ();

	private get title () { return this.props.title ?? this.props.table.titleCase (true) ?? "Select one" }


	private load_data () {

		if (this.props.disabled) {
			this.setState ({ data: null });
			return;
		}// if;

		this.setState ({ loading: true }, () => APIClass.fetch_data (`Get${this.props.table.titleCase (true)}`, this.props.parameters).then ((response: DataKeyArray) => {
			this.setState ({ 
				data: response,
				loading: false
			});
		}));

	}// load_data;


	/********/


	public static defaultProps: DataListProps = { 
		id: null,
		header: null,
		selected_item: null,
		allow_all: false,
		disabled: null,
		title: null,
		table: null,
		parameters: null,
		required: false,
		onChange: null,
	}// defaultProps;


	public state: DataListState = new DataListState ();


	public componentDidUpdate (previous_props: DataListProps) {
		if (this.props.parameters != previous_props.parameters) this.load_data ();
	}// componentDidUpdate;


	public componentDidMount () {
		this.load_data ();
	}// componentDidMount;


	public render () { 
		return <div className="row-centered row-block">
			<label htmlFor={this.props.id}>{this.title}</label>
			{this.state.loading ? <Eyecandy text="Loading..." small={true} /> : <SelectList id={this.props.id} data={this.state.data} {...this.props} ref={this.select_list} />}
		</div>
	}// render;

}// DataList;