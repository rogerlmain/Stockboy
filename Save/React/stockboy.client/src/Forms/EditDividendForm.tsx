import React, { ChangeEvent, RefObject, createRef } from "react";

import Decimal from "Classes/Decimal";

import BaseComponent from "Controls/BaseComponent";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import InputElement from "Controls/InputElement";

import DividendListModel from "Models/Dividends";

import { date_format } from "Classes/Globals";

import { IEditFormProps } from "Forms/EditForm";
import { EditTransactionForm } from "Forms/EditTransactionForm";


class EditDividendFormProps implements IEditFormProps {
	broker_id?: string;
	ticker_id?: string;
	data?: DividendListModel;
}// EditDividendFormProps;


class EditDividendFormState {
	broker_id: string = null;
	reinvested: boolean = true;
	total_dividend: string = null;
}// EditDividendFormState;


export default class EditDividendForm extends BaseComponent<EditDividendFormProps, EditDividendFormState> {

	private static defaultValues = {
		broker_id: null,
		ticker_id: null,
		amount_per_share: null,
		share_quantity: null,
		issue_date: null,
		transaction_date: null,
		settlement_date: null,
		reinvested: true,
		share_price: null,
	}// defaultValues;


	private per_share_textbox_ref: RefObject<HTMLInputElement> = createRef ();
	private quantity_textbox_ref: RefObject<HTMLInputElement> = createRef ();


	private update_total_dividend = () => {

		let total = Decimal.round (Decimal.multiply (this.per_share_textbox_ref.current.value, this.quantity_textbox_ref.current.value), 2);

		this.setState ({ total_dividend: total });

	}// update_total_dividend;


	/********/


	public static defaultProps = {
		broker_id: null,
		ticker_id: null,
		data: null,
	}// defaultProps;


	public state: EditDividendFormState = new EditDividendFormState ();


	public componentDidMount = () => this.setState ({ broker_id: this.props.broker_id ?? EditDividendForm.defaultValues.broker_id });


	public render () {

		return <div className="column-block">

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="two-column-grid">

				<InputElement>
					<BrokerList selected_item={this.props.data?.broker_id ?? this.props.broker_id ?? EditDividendForm.defaultValues.broker_id}
						onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: event.target.value})}>
					</BrokerList>
				</InputElement>

				<InputElement>
					<TickerList selected_item={this.props.data?.ticker_id ?? this.props.ticker_id ?? EditDividendForm.defaultValues.ticker_id} 
						broker_id={this.state.broker_id}>
					</TickerList>
				</InputElement>

			</div>

			<div className="compact four-column-grid with-headspace">

				<InputElement id="amount_per_share" label="Amount per share">
					<input type="currency" commas="true" decimalPlaces={2} ref={this.per_share_textbox_ref}
						defaultValue={this.props.data?.amount_per_share ?? EditDividendForm.defaultValues.amount_per_share}
						onChange={this.update_total_dividend}>
					</input>
				</InputElement>

				<InputElement id="quantity" label="Share quantity">
					<input type="numeric" decimalPlaces={6} ref={this.quantity_textbox_ref}
						defaultValue={this.props.data?.share_quantity ?? EditDividendForm.defaultValues.share_quantity}
						onChange={this.update_total_dividend}>
					</input>
				</InputElement>

				<InputElement id="transaction_date" label="Transaction Date">
					<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.issue_date : EditDividendForm.defaultValues.issue_date, date_format.database)} />
				</InputElement>

				<label htmlFor="reinvested">Reinvested</label>
				<input type="checkbox" id="reinvested" name="reinvested" defaultChecked={EditDividendForm.defaultValues.reinvested} onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState ({ reinvested: event.target.checked })} />

				<div className={`${is_null (this.state.total_dividend) ? "hidden" : String.Empty} full-width two-column-grid`}>
					<label>Total payment</label>
					<div>${this.state.total_dividend}</div>
				</div>

				<div className={`${this.state.reinvested ? String.Empty : "hidden"} container`}>
				
					<div className="full-width row-divider"></div>

					<InputElement id="transaction_date" label="Transaction Date" required={this.state.reinvested}>
						<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.reinvestment_date : EditDividendForm.defaultValues.transaction_date, date_format.database)} />
					</InputElement>

					<InputElement id="settlement_date" label="Settlment Date" required={this.state.reinvested}>
						<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.settlement_date : EditDividendForm.defaultValues.settlement_date, date_format.database)} />
					</InputElement>
				
					<div className="full-width row-block column-centered">
						<InputElement id="price" label="Share price" required={this.state.reinvested}>
							<input type="currency" commas="true" defaultValue={this.props.data?.amount_per_share ?? EditDividendForm.defaultValues.share_price} />
						</InputElement>
					</div>

				</div>

			</div>

		</div>
	}// render;

}// EditDividendForm;