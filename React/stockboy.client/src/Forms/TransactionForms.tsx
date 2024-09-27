import React from "react";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import PopupWindow from "Controls/PopupWindow";
import DataControl from "Controls/DataControl";

import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";

import { NameValueCollection } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";


class TransactionFormProps extends BaseProps {
	transaction?: IBaseModel = null; // Make mandatory after development
	broker_id?: string = null;
	ticker_id?: string = null;
}// TransactionFormProps;


export class DeleteTransactionForm extends BaseComponent<TransactionFormProps> {

	public render = () => <div>
		Delete<br />
		<br />
		<div className="two-column-grid">
		{
			Object.keys (this.props.transaction).map (key => {
				if (key == "id") return null;
				return <div key={this.next_key} style={{ display: "contents" }}>
					<label>{key.titleCase ()}:</label>
					<div>{this.props.transaction [key]}</div>
				</div>
			})
		}
		</div><br />
		Are you sure?
	</div>

}// DeleteTransactionForm;


export class EditTransactionForm extends BaseComponent<TransactionFormProps> {


	public transaction_form: React.RefObject<HTMLFormElement> = React.createRef ();


	public render = () => <form ref={this.transaction_form}>
		<div className="two-column-grid">

			<input type="hidden" id="id" />

			<label htmlFor="broker">Broker</label>
			<BrokerList selected_item={this.props.broker_id} name="broker_id" />

			<label htmlFor="ticker">Company / Ticker</label>
			<TickerList selected_item={this.props.ticker_id} name="ticker_id" />

			<label htmlFor="price">Price per share</label>
			<div className="nested two-column-grid">
				<input type="numeric" id="price" name="price" defaultValue={10} />
				<div className="two-column-grid">

					<label htmlFor="quantity">Quantity</label>
					<input type="numeric" id="quantity" name="quantity" defaultValue={234} />

				</div>
			</div>

			<label htmlFor="transaction_date">Transaction Date</label>
			<div className="two-column-grid">
				<input type="date" id="transaction_date" name="transaction_date" defaultValue={Date.today ()} />
				<div className="three-column-grid">

					<div className="two-column-grid" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
						<label htmlFor="settlement_date">Settlment Date</label>
						<input type="date" id="settlement_date" name="settlement_date" defaultValue={Date.today ()} />
					</div>

					<label htmlFor="transaction_type">Transaction Type</label>
					<TransactionTypeList name="transaction_type_id" />

				</div>
			</div>

		</div>
	</form>

}// EditTransactionForm;