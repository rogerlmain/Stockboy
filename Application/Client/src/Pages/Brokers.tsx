import StockboyAPI from "Classes/StockboyAPI";
import Eyecandy from "Controls/Common/Eyecandy";
import EditBrokerForm from "Forms/EditBrokerForm";

import DataPageControl, { ButtonAlignment } from "Controls/DataPageControl";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { BrokersModel } from "Models/Brokers";
import { Component } from "react";


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

	public static defaultProps: BaseProps = { id: null }


	public state: BrokersPageState = new BrokersPageState ();


	public update_data (): Promise<Boolean> {
		return new Promise<Boolean> ((resolve: Function) => {
			new StockboyAPI ().fetch_user_data ("GetUserBrokers").then ((response: BrokersList) => {
				if (not_empty (response)) this.setState ({ data: response }, () => resolve (true));
				this.setState ({ loading: false });
			});
		});
	}// update_data;


	public render () {
		return <div className="container">

			<div className="title">Brokers</div>

			{this.state.loading ? <Eyecandy text="Loading brokers" /> : <DataPageControl data={this.state.data} 
				properties={properties} align_buttons={ButtonAlignment.center} parent={this}
				search_filters={properties.fields} stock_filters={false} table_buttons={true} 
				data_type="Brokers" form={EditBrokerForm} save_command="SaveBroker">
			</DataPageControl>}

		</div>
	}// render;


	public constructor () {
		super (null);
		this.update_data ();
	}// constructor;

}// BrokersPage;