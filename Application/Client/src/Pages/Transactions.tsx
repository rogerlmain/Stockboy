import APIClass from "Classes/APIClass";
import DataPageControl from "Controls/DataPageControl";

import EditTransactionForm from "Forms/EditTransactionForm";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { TransactionListModel } from "Models/Transactions";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray ("broker", "company", "ticker", "transaction_date", "settlement_date", "quantity", "price", "cost", "transaction_type"),
	date_fields: ["transaction_date", "settlement_date"],
	numeric_fields: ["quantity"],
	currency_fields: ["price", "cost"],
	rounded_fields: [{ cost: 2 }]
}// properties;


type TransactionList = Array<TransactionListModel>


class TransactionsPageState {
	data: TransactionList = null;
}// TransactionsPageState;


export default class TransactionsPage extends Component<BaseProps, TransactionsPageState> {

	public state: TransactionsPageState = new TransactionsPageState ();


	public render () {
		return <div className="container">

			<div className="title">Transactions</div>

			<DataPageControl data={this.state.data} properties={properties} form={EditTransactionForm}
				search_filters={properties.fields} stock_filters={true} table_buttons={true} 
				save_command="SaveTransaction" delete_command="DeleteTransaction" data_type="Transactions">
			</DataPageControl>

		</div>
	}// render;


	constructor (props: BaseProps) {
		super (props);
		APIClass.fetch_data ("GetTransactions").then ((result: TransactionList) => {
			this.setState ({ data: new Array<TransactionListModel> ().assign (result, TransactionListModel) });
		});
	}// constructor;

}// TransactionsPage;

