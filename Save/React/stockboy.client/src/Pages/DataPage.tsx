/*
import React from "react";

import APIClass from "Controls/Abstract/APIClass";
import DataTable from "Controls/DataTable";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";
import Eyecandy from "Controls/Eyecandy";

import { EditTransactionForm } from "Forms/EditTransactionForm";
import { DeleteForm } from "Forms/DeleteForm";
*/
import { EditForm/*, EditFormProps, IEditFormProps */} from "Forms/EditForm";
import BaseComponent from "Controls/BaseComponent";
/*
import { NameValueCollection } from "Classes/Collections";
import { DataControl, DataProps, DataState, IDataPage } from "Controls/Abstract/DataControls";
import { IBaseModel } from "Models/Abstract/BaseModel";

*/
class DataPageProps /*extends DataProps*/ {
	edit_form: React.ComponentType/*<IEditFormProps>*/ = null;
	/*name: string = null;*/
}// DataPageProps;

/*
class DataPageState extends DataState<IDataPageModel> {
	selected_row: IDataPageModel = null;
}// TransactionState;

export interface IDataPageModel extends IBaseModel {
	name: string;
	broker_id: string;
	ticker_id: string;
	edit_form: React.ComponentType;
}// IDataPageModel;
*/


export default class DataPage/*<TModel extends IDataPageModel>*/ extends BaseComponent /*extends DataControl*/<DataPageProps>/*, DataPageState> implements IDataPage*/ {

/*
	private data_table_reference: React.RefObject<DataTable> = React.createRef ();


	private get transactions_table (): React.ReactElement {
		return <DataTable id="transations_table" data={this.state.data} ref={this.data_table_reference} parent={this}
			keys={["id"]}
			fields={["broker", "ticker", "company", "price", "quantity", "transaction_date", "settlement_date", "transaction_type"]}
			date_fields={["transaction_date", "settlement_date"]}
			numeric_fields={["quantity"]}
			currency_fields={["price"]}
			onclick={(row: IDataPageModel) => this.setState ({ selected_row: row })}>
		</DataTable>
	}// transactions_table;


	private show_delete_form = () => main_page.popup_window.show (<DeleteForm 

		key_names={["broker_id", "ticker_id"]}
		record={this.state.selected_row} />, new NameValueCollection ({

		Yes: () => main_page.popup_window.show (<Eyecandy 
			command={() => APIClass.fetch_data ("DeleteSplit", this.state.selected_row).then (() => {
				this.remove_selected_row ();
				main_page.popup_window.hide ();
			})}
			text={"Deleting transaction"}>
		</Eyecandy>),

		No: () => main_page.popup_window.hide ()
	}));


	private get form_buttons (): React.ReactElement {
		return <div className="button-bar">
			<button id="add_button" onClick={() => this.edit_record ()}>Add</button>
			<div style={{display: isset (this.state.selected_row) ? null : "none"}}>
				<button id="edit_button" onClick={() => this.edit_record (this.state.selected_row as IBaseModel)}>Edit</button>
				<button id="delete_split_button" onClick={() => this.show_delete_form ()}>Delete</button>
			</div>
		</div>
	}// form_buttons;


	private delete_record = () => main_page.popup_window.show (<DeleteForm key_names={["broker_id", "ticker_id"]} record={this.state.selected_row} />, new NameValueCollection ({

		Yes: () => main_page.popup_window.show (<Eyecandy 
			command={() => APIClass.fetch_data ("DeleteSplit", this.state.selected_row).then (() => {
				this.remove_selected_row ();
				main_page.popup_window.hide ();
			})}
			text={"Deleting transaction"}>
		</Eyecandy>),

		No: () => main_page.popup_window.hide ()
	}));

	private edit_record = (row?: IBaseModel) => main_page.popup_window.show (this.edit_form (), this.form_buttons);
	private remove_selected_row = () => this.setState ({ data: this.state.data.toSpliced (this.state.data.indexOf (this.state.data.find ((element: IBaseModel) => element.id == this.state.selected_row.id)), 1) });


	*//********//*


	public state: DataPageState = new DataPageState ();


	*/
	public edit_form = (/*row: TModel = null*/): React.ReactElement => <EditForm /*data={row} keys={["broker_id", "ticker_id"]}*/ body={this.props.edit_form} />
	/*

	public get data_table (): DataTable { return this.data_table_reference.current }


	public fetch_data () {

		let parameters = {};

		if (isset (this.state.broker_id)) parameters ["broker_id"] = this.state.broker_id;
		if (isset (this.state.ticker_id)) parameters ["ticker_id"] = this.state.ticker_id;

		APIClass.fetch_data (`Get${this.props.name}s`, parameters).then ((response: Array<TModel>) => {
			this.setState ({ data: response });
		});

	}// fetch_data;


	public componentDidUpdate (previous_props: DataPageProps, previous_state: DataPageState) {
		if (previous_state.broker_id != this.state.broker_id) this.fetch_data ();
	}// componentDidUpdate;


	public componentDidMount = () => this.fetch_data ();
*/

	public render = () => /*is_null (this.state.data) ? this.load_screen : <div className="page-layout">*/
this.edit_form ();
/*
		<form>
			<div className="row-block">
				<div>
					<label htmlFor="broker_list">Broker</label>
					<BrokerList name="brokers" header="All" selected_item={this.state.broker_id} 
						onChange={async (event: React.ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: event.currentTarget.value })}>
					</BrokerList>
				</div>

				<div style={{ marginLeft: "2rem" }}>
					<label htmlFor="ticker_list">Ticker</label>
					<TickerList name="tickers" header="All" broker_id={this.state.broker_id} />
				</div>

			</div>
		</form>

		<div className="body with-headspace">
			{this.state.data.empty ? <div>There are no transactions</div> : this.transactions_table}
		</div>

		<button id="add_button" onClick={() => this.edit_record ()}>Add</button>
		<div style={{display: isset (this.state.selected_row) ? null : "none"}}>
			<button id="edit_button" onClick={() => this.edit_record (this.state.selected_row as IBaseModel)}>Edit</button>
			<button id="delete_split_button" onClick={() => this.delete_record ()}>Delete</button>
		</div>

	</div>*/


}// DataPage;