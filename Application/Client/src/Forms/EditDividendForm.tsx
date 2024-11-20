import APIClass from "Classes/APIClass";
import Eyecandy from "Controls/Eyecandy";
import TickerSelector from "Controls/TickerSelector";

import { DateFormats } from "Classes/Globals";
import { IFormProps } from "Controls/Abstract/BaseProperties";
import { PromptResponse } from "Controls/EditFormControl";
import { BaseModel } from "Models/Abstract/BaseModels";
import { DividendDataModel } from "Models/Dividends";
import { Component, RefObject, createRef } from "react";



class EditDividendFormProps implements IFormProps {
	data?: DividendDataModel;
}// EditDividendFormProps;


class EditDividendFormState {
	broker_id: string = null;
	total_dividend: string = null;
	reinvested: boolean = true;
}// EditDividendFormState;


export default class EditDividendForm extends Component<EditDividendFormProps, EditDividendFormState> {

	private form: RefObject<HTMLDivElement> = createRef ();

	private get edit_mode (): boolean { return isset (this.props.data.id) };


	private static test_data: DividendDataModel = {
		broker_id: "80e43ec8-016a-453d-b4ff-80d9d79a2bc7",
		ticker_id: "4676d995-5c5b-4bd9-b1b7-26532e391c42",
		amount_per_share: 0.165,
		share_quantity: 0.054,
		issue_date: new Date ("2024-07-31T00:00:00"),
		reinvested: false,

		transaction_date: new Date ("2024-07-31T00:00:00"),
		settlement_date: new Date ("2024-08-01T00:00:00"),
		shares_purchased: 0.000418,
		purchase_price: 23.92,
	}// test_data;


	private per_share_textbox_ref: RefObject<HTMLInputElement> = createRef ();
	private quantity_textbox_ref: RefObject<HTMLInputElement> = createRef ();


	private update_total_dividend = () => {

		let total = (parseFloat (this.per_share_textbox_ref.current.value) * parseFloat (this.quantity_textbox_ref.current.value)).round_to (2);
		let parts = total.toString ().parts (".", 1, 2);

		if (parts.length == 1) parts.push ("0");
		parts [1] = parts [1].padEnd (2, "0");

		this.setState ({ total_dividend: `${parts [0]}.${parts [1]}` });

	}// update_total_dividend;


	/********/


	public static defaultProps = {
		broker_id: null,
		ticker_id: null,
		data: this.test_data,
	}// defaultProps;


	public state: EditDividendFormState = new EditDividendFormState ();


	public onSave (): Promise<PromptResponse> {
		return new Promise (resolve => {

			let values = new FormData (this.form.current.closest ("form"));

			APIClass.fetch_data ("GetDividendTransaction", values).then ((response: BaseModel) => {
				if (isset (response.id)) return popup_window.show (<div>

					A stock purchase was found on the same date for the same broker,<br />
					ticker and amount. Would you like to update that transaction<br />
					as a reinvestment?
				
					<div className="button-bar">
						<button onClick={() => {
							popup_window.show (<Eyecandy text="Updating transaction. One moment, please." />);
							APIClass.fetch_data ("UpdateTransactionType", { id: response.id, type: "reinvestment" }).then (() => {
								resolve (PromptResponse.Proceed);
							});
						}}>Yes</button>
						<button onClick={() => resolve (PromptResponse.Proceed)}>No</button>
						<button onClick={() => resolve (PromptResponse.Cancel)}>Cancel</button>
					</div>

				</div>);

				resolve (PromptResponse.Proceed);
			});
		});
	}// onSave;


	public render () {
		return <div ref={this.form}>

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<TickerSelector broker_id={this.props.data?.broker_id} ticker_id={this.props.data?.ticker_id} required={true} allow_all={false} />

			<div className="compact four-column-grid with-headspace">

				<label htmlFor="amount_per_share">Amount per share</label>
				<input id="amount_per_share" type="currency" commas="true" ref={this.per_share_textbox_ref}
					defaultValue={this.props.data?.amount_per_share} required={true}
					onChange={this.update_total_dividend}>
				</input>

				<label htmlFor="share_quantity">Share quantity</label>
				<input id="share_quantity" type="numeric" decimalPlaces={6} ref={this.quantity_textbox_ref}
					defaultValue={this.props.data?.share_quantity} required={true}
					onChange={this.update_total_dividend}>
				</input>
				

				<div className={this.edit_mode ? "two-column-grid" : null} style={{ 
					gridColumn: (this.edit_mode ? "1 / -1" : null),
					display: (this.edit_mode ? null : "contents")
				}}>
					<label htmlFor="issue_date">Issue Date</label>
					<input id="issue_date" type="date" required={true}
						defaultValue={Date.format (this.props.data?.issue_date, DateFormats.database)}>
					</input>
				</div>

				{this.edit_mode ? null : <div className="container">
					<div className="right-aligned row-block" style={{ gridColumn: "3 / span 2" }}>
						<div className="two-column-grid">
							<label htmlFor="reinvested">Reinvested</label>
							<input id="reinvested" type="checkbox" value={this.state.reinvested.toString ()}
								style={{ width: "1rem" }} defaultChecked={true} 
								onChange={(event: InputChangeEvent) => this.setState ({ reinvested: event.target.checked })}>
							</input>
						</div>
					</div>

					<div className={`${is_null (this.state.total_dividend) && "hidden"} full-width two-column-grid`}>
						<label>Total payout</label>
						<div>${this.state.total_dividend}</div>
					</div>

					<div className={`${!this.state.reinvested && "hidden"} container`}>
				
						<div className="full-width row-divider"></div>

						<label htmlFor="transaction_date">Transaction Date</label>
						<input id="transaction_date" type="date" required={this.state.reinvested} 
							defaultValue={Date.format (this.props.data?.transaction_date, DateFormats.database)}>
						</input>

						<label htmlFor="settlement_date">Settlement Date</label>
						<input id="settlement_date" type="date" required={this.state.reinvested} 
							defaultValue={Date.format (this.props.data?.settlement_date, DateFormats.database)}>
						</input>
				
						<label htmlFor="quantity">Number of shares purchased</label>
						<input id="quantity" type="numeric" commas="true" decimalPlaces={numeric_decimals} required={this.state.reinvested} 
							defaultValue={this.props.data?.shares_purchased}>
						</input>

						<label htmlFor="price">Purchase price</label>
						<input id="price" type="currency" commas="true" required={this.state.reinvested} 
							defaultValue={this.props.data?.purchase_price}>
						</input>

					</div>
				</div>}

			</div>

		</div>
	}// render;

}// EditDividendForm;