import APIClass from "Classes/APIClass";
import EditBrokerForm from "Forms/EditBrokerForm";

import DataPageControl, { ButtonAlignment } from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { BrokersModel } from "Models/Brokers";
import { Component, RefObject, createRef } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: [{ name: "broker" }]
}// properties;


type BrokersList = Array<BrokersModel>


class BrokersPageState {
	data: BrokersList = null;
	selected_item: string = null;
	form_visible: boolean = false;
}// BrokersPageState;


export default class BrokersPage extends Component<BaseProps, BrokersPageState> {

	private data_page: RefObject<DataPageControl> = createRef ();


	private save_form () {
	//	let form_data: FormData = new FormData (this.edit_form_ref.current);
	//	let id_field: HTMLInputElement = this.edit_form_ref.current.querySelector ("[name='id']") as HTMLInputElement;

	//	APIClass.fetch_data (`Save${this.props.name.titleCase ()}`, form_data).then ((result: IBaseModel) => { 
				
	//		//switch (is_defined (id_field.value)) {
	//		//	case true: this.table_control.update_row (result); break;
	//		//	default: this.table_control.add_row (result); break;
	//		//}// switch;

	//		this.setState ({ selected_item: result }, () => {
	//			popup_window.show (<div>

	//				{key_name (this.state.selected_item ["name"])} saved.<br />

	//				<div className="row-centered with-some-headspace">
	//					<button onClick={() => popup_window.hide ()}>Close</button>
	//				</div>

	//			</div>)
	//		});
			
	//	});

	//	event.preventDefault ();
	}// save_form;


	/********/


	public static defaultProps: BaseProps = { id: null }


	public state: BrokersPageState = new BrokersPageState ();


	public render () {
		return <div className="container">

			<div className="title">Brokers</div>

			<DataPageControl data={this.state.data} properties={properties} align_buttons={ButtonAlignment.center}
				search_filter={true} stock_filters={false} table_buttons={true} 
				ref={this.data_page} data_type="Brokers" form={EditBrokerForm}>
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetBrokers").then ((response: BrokersList) => this.setState ({ data: response }));
	}// constructor;

}// BrokersPage;