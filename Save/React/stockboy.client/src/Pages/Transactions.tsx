import DataPage from "Pages/DataPage";
import BaseComponent from "Controls/BaseComponent";
import TransactionModel from "Models/TransactionModel";

import { EditTransactionForm } from "Forms/EditTransactionForm";

export default class TransactionsPage extends BaseComponent {
	
	public render = () => <DataPage<TransactionModel> edit_form={EditTransactionForm} name="Transaction" />

}// TransactionsPage;

/*

import React from "react";

import APIClass from "Controls/Abstract/APIClass";
import DataTable from "Controls/DataTable";
import DataTableButtons from "Controls/DataTableButtons";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";

import TransactionModel from "Models/TransactionModel";

import { NameValueCollection } from "Classes/Collections";
import { DataControl, DataProps, DataState, IDataPage } from "Controls/Abstract/DataControls";

import { EditTransactionForm } from "Forms/EditTransactionForm";


class TransactionState extends DataState<TransactionModel> {
	selected: boolean = false;
	broker_id: string = null;
	ticker_id: string = null;
}// TransactionState;


export default class TransactionsPage extends DataControl<DataProps, TransactionState> implements IDataPage {


	private data_table_reference: React.RefObject<DataTable> = React.createRef ();


	private get transactions_table (): React.ReactElement {
		return <DataTable id="transations_table" data={this.state.data} ref={this.data_table_reference} parent={this}
			keys={["id"]}
			fields={["broker", "ticker", "company", "price", "quantity", "transaction_date", "settlement_date", "transaction_type"]}
			date_fields={["transaction_date", "settlement_date"]}
			numeric_fields={["quantity"]}
			currency_fields={["price"]}
			onclick={(keys: NameValueCollection) => this.setState ({ selected: true })}>
		</DataTable>
	}// transactions_table;


	/********


	public state: TransactionState = new TransactionState ();


	public get data_table (): DataTable { return this.data_table_reference.current }


	public edit_form = (row: TransactionModel = null): React.ReactElement => <EditTransactionForm data={row} />


	public fetch_data () {

		let parameters = {};

		if (isset (this.state.broker_id)) parameters ["broker_id"] = this.state.broker_id;
		if (isset (this.state.ticker_id)) parameters ["ticker_id"] = this.state.ticker_id;

		APIClass.fetch_data ("GetTransactions", parameters).then ((response: Array<TransactionModel>) => {
			this.setState ({ data: response });
		});

	}// fetch_data;


	public componentDidUpdate (previous_props: DataProps, previous_state: TransactionState) {
		if (previous_state.broker_id != this.state.broker_id) this.fetch_data ();
	}// componentDidUpdate;


	public componentDidMount = () => this.fetch_data ();


	public render = () => is_null (this.state.data) ? this.load_screen : <div className="page-layout">

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

		<DataTableButtons selected={this.state.selected} parent={this} />

	</div>

}// TransactionsPage;

*/