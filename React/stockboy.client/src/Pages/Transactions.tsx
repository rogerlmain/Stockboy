import React, { ReactElement } from "react";
import BaseComponent, { BaseProps } from "Controls/BaseComponent";

import DataPage, { DataProps, DataState } from "Controls/DataControl";
import DataTable from "Controls/DataTable";
import Eyecandy from "Controls/Eyecandy";

import TransactionModel from "Models/TransactionsModel";
import PopupWindow from "../Controls/PopupWindow";

import { NameValueCollection } from "Classes/Collections";
import { DeleteTransactionForm, EditTransactionForm } from "Forms/TransactionForms";


class TransactionState extends DataState<TransactionModel> {
	selected: boolean = false;
}// TransactionState;


export default class Transactions extends DataPage<DataProps, TransactionState> {


	private data_table_reference: React.RefObject<DataTable> = React.createRef ();
	private popup_reference: React.RefObject<PopupWindow> = React.createRef ();
	private transaction_form_reference: React.RefObject<EditTransactionForm> = React.createRef ();


	private get transactions_popup (): ReactElement {
		return <PopupWindow id="transactions_popup" ref={this.popup_reference}>{"Default Value"}</PopupWindow>
	}// transactions_popup;


	private get transactions_table (): ReactElement {
		return <DataTable id="transations_table" data={this.state.data} ref={this.data_table_reference}
			keys={["id"]}
			fields={["broker", "ticker", "company", "price", "quantity", "transaction_date", "settlement_date", "transaction_type"]}
			onclick={(keys: NameValueCollection) => this.setState ({ selected: true })}>
		</DataTable>
	}// transactions_table;


	private get popup_window (): PopupWindow { return this.popup_reference.current }
	private get data_table (): DataTable { return this.data_table_reference.current }


	private remove_selected_row = () => this.setState ({ data: this.state.data.toSpliced (this.state.data.indexOf (this.state.data.find ((element: TransactionModel) => element.id == this.data_table.selected_row.id)), 1) });


	private delete_transaction = () => this.popup_window.show (<DeleteTransactionForm transaction={this.data_table.selected_row} />, new NameValueCollection ({

		Yes: () => this.popup_window.show (<Eyecandy 
			command={() => this.fetch ("DeleteTransaction", this.data_table.selected_row).then (() => {
				this.remove_selected_row ();
				this.popup_window.hide ();
			})}
			text={"Deleting transaction"}>
		</Eyecandy>),

		No: () => this.popup_window.hide ()
	}));


	private edit_transaction = () => this.popup_window.show (<EditTransactionForm  ref={this.transaction_form_reference} broker_id={this.props.keys ["broker_id"]} ticker_id={this.props.keys ["ticker_id"]}/>, new NameValueCollection ({

		Save: () => /*this.popup_window.show (<Eyecandy 
			command={() =>*/ this.fetch ("SaveTransaction", Object.fromEntries (new FormData (this.transaction_form_reference.current.transaction_form.current))).then (() => {

alert ("Saved");

})

/*
				this.popup_window.hide ();
			})}
			text={"Saving transaction"}>
		</Eyecandy>),

		Close: () => this.popup_window.hide ()
*/
	}));


	/********/


	public state: TransactionState = new TransactionState ();


	public componentDidMount () {
		this.fetch ("GetTransactions", this.props.keys).then ((response: Array<TransactionModel>) => this.setState ({ data: response }/*, () => this.setState ({ data_table: this.transactions_table })*/));
	}// componentDidMount;


	public render = () => is_null (this.state.data) ? this.load_screen : <div>

		{this.transactions_popup}

		{this.transactions_table}

		<div className="button-bar">
			<button id="add_transaction_button" onClick={() => this.edit_transaction ()}>Add</button>
			<div style={{display: this.state.selected ? null : "none"}}>
				<button id="edit_transaction_button" onClick={() => this.popup_window.show (<EditTransactionForm />)}>Edit</button>
				<button id="delete_transaction_button" onClick={() => this.delete_transaction ()}>Delete</button>
			</div>
		</div>

	</div>

}// Transactions;