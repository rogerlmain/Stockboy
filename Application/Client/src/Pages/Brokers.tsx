import Eyecandy from "Controls/Common/Eyecandy";
import EditBrokerForm from "Forms/EditBrokerForm";

import DataPageControl, { ButtonAlignment } from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { BrokersModel } from "Models/Brokers";
import { Component, RefObject, createRef } from "react";
import StockboyAPI from "../Classes/StockboyAPI";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray ([{ name: "broker" }]),
}// properties;


type BrokersList = Array<BrokersModel>


class BrokersPageState {
	data: BrokersList = null;
	selected_item: string = null;
	form_visible: boolean = false;
	loading: boolean = true;
}// BrokersPageState;


export default class BrokersPage extends Component<BaseProps, BrokersPageState> {

	private data_page: RefObject<DataPageControl> = createRef ();

	/********/


	public static defaultProps: BaseProps = { id: null }


	public state: BrokersPageState = new BrokersPageState ();


	public render () {
		return <div className="container">

			<div className="title">Brokers</div>

			{this.state.loading ? <Eyecandy text="Loading brokers" /> : <DataPageControl data={this.state.data} properties={properties} align_buttons={ButtonAlignment.center}
				search_filters={properties.fields} stock_filters={false} table_buttons={true} 
				ref={this.data_page} data_type="Brokers" form={EditBrokerForm}>
			</DataPageControl>}

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		new StockboyAPI ().fetch_user_data ("GetBrokers").then ((response: BrokersList) => {
			if (not_empty (response)) this.setState ({ data: response });
			this.setState ({ loading: false });
		});
	}// constructor;

}// BrokersPage;