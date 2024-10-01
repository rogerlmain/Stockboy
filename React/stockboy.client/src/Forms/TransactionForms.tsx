import React from "react";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import PopupWindow from "Controls/PopupWindow";
import DataControl from "Controls/Abstract/DataControl";

import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";

import TransactionModel from "Models/TransactionsModel";

import { NameValueCollection } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";
import SelectList from "../Controls/Lists/SelectList";


class TransactionFormProps extends BaseProps {
	transaction?: IBaseModel = null; // Make mandatory after development
	broker_id?: string = null;
	ticker_id?: string = null;
	data?: TransactionModel = null;
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


	private form_element: React.RefObject<HTMLDivElement> = React.createRef ();


	public transaction_form: React.RefObject<HTMLFormElement> = React.createRef ();


	public render = () => <form ref={this.transaction_form}>

		<div className="two-column-grid">

			<input type="hidden" id="id" value={this.props.data?.id} />

			<label htmlFor="broker">Broker</label>
			<BrokerList selected_item={isset (this.props.data) ? this.props.data.broker_id : this.props.broker_id} name="broker_id" />

			<label htmlFor="ticker">Company / Ticker</label>
			<TickerList selected_item={isset (this.props.data) ? this.props.data.ticker_id : this.props.ticker_id} name="ticker_id" />

			<label htmlFor="price">Price per share</label>
			<div className="nested two-column-grid">
				<input type="numeric" id="price" name="price" value={isset (this.props.data) ? this.props.data.price : String.Empty} />
				<div className="two-column-grid">

					<label htmlFor="quantity">Quantity</label>
					<input type="numeric" id="quantity" name="quantity" value={isset (this.props.data) ? this.props.data.quantity : String.Empty} />

				</div>
			</div>

			<label htmlFor="transaction_date">Transaction Date</label>
			<div className="two-column-grid">
				<input type="date" id="transaction_date" name="transaction_date" value={isset (this.props.data) ? Date.format (this.props.data.transaction_date) : Date.today (false)} />
				<div className="three-column-grid">

					<div className="two-column-grid" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
						<label htmlFor="settlement_date">Settlment Date</label>
						<input type="date" id="settlement_date" name="settlement_date" value={isset (this.props.data) ? Date.format (this.props.data.settlement_date) : Date.today (false)} />
					</div>

					<label htmlFor="transaction_type">Transaction Type</label>
					<TransactionTypeList name="transaction_type_id" selected_item={isset (this.props.data) ? this.props.data.transaction_type : String.Empty} />

				</div>
			</div>

		</div>

	</form>

}// EditTransactionForm;