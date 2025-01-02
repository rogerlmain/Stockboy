import StockboyAPI from "Classes/StockboyAPI";
import DataPageControl from "Controls/DataPageControl";
import EditTransactionForm from "Forms/EditTransactionForm";

import Eyecandy from "Controls/Common/Eyecandy";
import ActivityFilters from "Controls/Filters/ActivityFilters";
import StockStatusFilters from "Controls/Filters/StockStatusFilters";

import { BaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { DataTableProperties } from "Controls/Tables/DataTable";

import { DataKeyArray } from "Classes/DataKeys";
import { TransactionListModel } from "Models/Transactions";
import { Component } from "react";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: new DataKeyArray (["broker", "company", "ticker", "transaction_date", "settlement_date", "quantity", "price", "cost", "status", "transaction_type"]),
	date_fields: ["transaction_date", "settlement_date"],
	numeric_fields: ["quantity"],
	currency_fields: ["price", "cost"],
	rounded_fields: [{ cost: 2 }]
}// properties;


type TransactionList = Array<TransactionListModel>


class TransactionsPageState implements IBaseState {
	data: TransactionList = null;
	loading: boolean = false;
}// TransactionsPageState;


export default class TransactionsPage extends Component<BaseProps, TransactionsPageState> {

	public state: TransactionsPageState = new TransactionsPageState ();


	public render () {
		return <div className="container">

			<div className="title">Transactions</div>

			{this.state.loading ? <Eyecandy text="Loading transactions..." /> : <DataPageControl data={this.state.data} properties={properties} 
				form={EditTransactionForm} search_filters={properties.fields} date_filter_field="transaction_date" stock_filters={true} 
				table_buttons={true} parent={this} save_command="SaveTransaction" delete_command="DeleteTransaction" data_type="Transactions">

				{isset (this.state.data) ? <div>
					<ActivityFilters />
					<div className="with-headspace">
						<StockStatusFilters />
					</div>
				</div> : null}

			</DataPageControl>}

		</div>
	}// render;


	constructor (props: BaseProps) {

		super (props);
		this.state.loading = true;

		new StockboyAPI ().fetch_data ("GetTransactions").then ((result: TransactionList) => {
			this.setState ({ loading: false }, () => {
				if (not_set (result)) return;
				this.setState ({ data: new Array<TransactionListModel> ().assign (result, TransactionListModel) });
			});
		});

	}// constructor;

}// TransactionsPage;

