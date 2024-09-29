import React from "react";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import DataPage, { DataProps, DataState } from "Controls/DataControl";
import DataTable from "Controls/DataTable";
import Eyecandy from "Controls/Eyecandy";
import PopupWindow from "Controls/PopupWindow";
import ErrorWindow from "Controls/ErrorWindow";

import TransactionModel from "Models/TransactionsModel";

import { NameValueCollection } from "Classes/Collections";
import { DeleteTransactionForm, EditTransactionForm } from "Forms/TransactionForms";


class TransactionState extends DataState<TransactionModel> {
	selected: boolean = false;
}// TransactionState;


export default class TransactionsPage extends DataPage<DataProps, TransactionState> {


	private data_table_reference: React.RefObject<DataTable> = React.createRef ();
	private transaction_form_reference: React.RefObject<EditTransactionForm> = React.createRef ();

	private active_transaction_form: React.ReactElement = null;
	private active_transaction_form_buttons: NameValueCollection = null;

	private get transactions_table (): React.ReactElement {
		return <DataTable id="transations_table" data={this.state.data} ref={this.data_table_reference} parent={this}
			keys={["id"]}
			fields={["broker", "ticker", "company", "price", "quantity", "transaction_date", "settlement_date", "transaction_type"]}
			onclick={(keys: NameValueCollection) => this.setState ({ selected: true })}>
		</DataTable>
	}// transactions_table;


	private get data_table (): DataTable { return this.data_table_reference.current }
	private get form_data (): FormData { return new FormData (this.transaction_form_reference.current.transaction_form.current) }


	private transaction_form (row: TransactionModel = null): React.ReactElement {

		if (is_null (this.active_transaction_form)) this.active_transaction_form = <EditTransactionForm ref={this.transaction_form_reference} 
			broker_id={this.props.keys?.["broker_id"]} 
			ticker_id={this.props.keys?.["ticker_id"]}
			data={row}>
		</EditTransactionForm>;

		return this.active_transaction_form;

	}// transaction_form;


	private transaction_form_buttons (editing: boolean = false): NameValueCollection {

		if (is_null (this.active_transaction_form_buttons)) this.active_transaction_form_buttons = new NameValueCollection ({

			Save: () => {

				let data: FormData = this.form_data;

				main_page.popup_window.show (<Eyecandy command={() => this.fetch ("SaveTransaction", data).then ((response: TransactionModel) => {

					if (isset (response ["error"])) return main_page.popup_window.show (<ErrorWindow text={response ["error"]} />, null, true);

					this.add_new_row (response); // NEED CODE TO CATER FOR UPDATED ROWS

					if (editing) return main_page.popup_window.show (<div>Transaction saved.</div>, null, true);

					main_page.popup_window.show (
						<div>
							Transaction saved.<br />
							<br />
							Add another transaction?
						</div>, new NameValueCollection ({
							Yes: () => main_page.popup_window.show (this.transaction_form (), this.transaction_form_buttons ()),
							No: () => main_page.popup_window.hide ()
						})
					);

				})} text={"Saving transaction"} />)

			}, Close: () => main_page.popup_window.hide ()
		});

		return this.active_transaction_form_buttons;

	}// transaction_form_buttons;


	private add_new_row (row: TransactionModel) {

		let item: TransactionModel = null;

		let sort_field: string = this.data_table.state.sort_field;
		let ascending: boolean = this.data_table.state.ascending;

		if (isset (row [sort_field])) {
			for (let index = 0; index < this.state.data.length; index++) {

				let item = this.state.data [index];

				switch (ascending) {
					case true: if (row [sort_field] > item [sort_field]) continue; break;
					case false: if (row [sort_field] < item [sort_field]) continue; break;
				}// switch;

				return this.setState ({ data: this.state.data.toSpliced (index, 0, row) });

			}// for;
		}// if;

		return this.setState ({ data: this.state.data.append (row) });

	}// add_new_row;


	private update_selected_row (row: TransactionModel) {

		// ... DO SHIT HERE

	}// update_selected_row;


	private remove_selected_row = () => this.setState ({ data: this.state.data.toSpliced (this.state.data.indexOf (this.state.data.find ((element: TransactionModel) => element.id == this.data_table.selected_row.id)), 1) });


	private delete_transaction = () => main_page.popup_window.show (<DeleteTransactionForm transaction={this.data_table.selected_row} />, new NameValueCollection ({

		Yes: () => main_page.popup_window.show (<Eyecandy 
			command={() => this.fetch ("DeleteTransaction", this.data_table.selected_row).then (() => {
				this.remove_selected_row ();
				main_page.popup_window.hide ();
			})}
			text={"Deleting transaction"}>
		</Eyecandy>),

		No: () => main_page.popup_window.hide ()
	}));


	private edit_transaction = (row?: TransactionModel) => main_page.popup_window.show (this.transaction_form (row), this.transaction_form_buttons (isset (row)));


	/********/


	public state: TransactionState = new TransactionState ();


	public componentDidMount () {
		this.fetch ("GetTransactions", this.props.keys).then ((response: Array<TransactionModel>) => {
			this.setState ({ data: response })
		});
	}// componentDidMount;


	public render = () => is_null (this.state.data) ? this.load_screen : <div>

		{this.state.data.empty ? <div>There are no transactions</div> : this.transactions_table}

		<div className="button-bar">
			<button id="add_transaction_button" onClick={() => this.edit_transaction ()}>Add</button>
			<div style={{display: this.state.selected ? null : "none"}}>
				<button id="edit_transaction_button" onClick={() => this.edit_transaction (this.data_table.selected_row as TransactionModel)}>Edit</button>
				<button id="delete_transaction_button" onClick={() => this.delete_transaction ()}>Delete</button>
			</div>
		</div>

	</div>

}// TransactionsPage;