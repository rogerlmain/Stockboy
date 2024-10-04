import APIClass from "Classes/APIClass";
import BaseComponent from "Controls/BaseComponent";
import Eyecandy from "Controls/Eyecandy";
import SelectList, { SelectProps } from "Controls/Lists/SelectList";

import ListModel from "Models/ListModel";

import { NameValueCollection } from "Classes/Collections";


class DataListState {
	loading: boolean = false;
	data?: Array<ListModel> = null;
}// DataListState;


class DataListProps extends SelectProps {
	parameters?: NameValueCollection<string> = null;
}// DataListProps;


export default class DataList extends BaseComponent<DataListProps, DataListState> {


	static defaultProps: DataListProps = { 
		name: null,
		table: null,
		disabled: false,
		selected_item: null,
		parameters: null
	}// defaultProps;


	/********/


	private get title () { return this.props.table.titleCase (true) }

	private get control_name () { return `${this.props.name}_list` }


	private load_data () {

		if (this.props.disabled) {
			this.setState ({ data: null });
			return;
		}// if;

		this.setState ({ loading: true }, () => APIClass.fetch_data (`Get${this.title}`, this.props.parameters).then ((response: Array<ListModel>) => {
			this.setState ({ 
				data: response,
				loading: false
			})
		}));

	}// load_data;


	/********/


	public state: DataListState = new DataListState ();


	public componentDidUpdate (previous_props: DataListProps) {
		if (this.props.parameters != previous_props.parameters) this.load_data ();
	}// componentDidUpdate;


	public componentDidMount = () => this.load_data ();


	public render = () => <div className="row-block" style={{ alignItems: "center" }}>
		<label htmlFor={this.control_name}>{this.title}</label>
		{this.state.loading ? <Eyecandy text="Loading..." small={true} /> : <SelectList id={this.control_name} data={this.state.data} {...this.props} />}
	</div>

}// BrokerList;