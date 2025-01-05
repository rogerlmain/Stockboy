import StockboyAPI from "Classes/StockboyAPI";
import Eyecandy from "Controls/Common/Eyecandy";
import TickerSelector from "Controls/TickerSelector";

import { DateFormats } from "Classes/Common/Globals";
import { IFormProps } from "Controls/Abstract/BaseProperties";
import { PromptResponse } from "Controls/EditFormControl";
import { BaseModel } from "Models/Abstract/BaseModels";
import { DividendDataModel } from "Models/Dividends";
import { Component, RefObject, createRef } from "react";


let debugging: boolean = true;


const test_data: DividendDataModel = {

	id: null,

	broker_id: "80e43ec8-016a-453d-b4ff-80d9d79a2bc7",
	ticker_id: "4676d995-5c5b-4bd9-b1b7-26532e391c42",
	amount_per_share: 0.165,
	share_quantity: 9.7926,
	issue_date: new Date ("2024-11-29T00:00:00"),
	reinvested: false,

	transaction_date: null, //new Date ("2024-12-18T00:00:00"),
	settlement_date: null, //new Date ("2024-12-19T00:00:00"),
	shares_purchased: null, //0.143066,
	purchase_price: null, //27.40,

}// test_data;


class EditDividendFormProps implements IFormProps {
	data?: DividendDataModel;
}// EditDividendFormProps;


class EditDividendFormState {
	broker_id: string = null;
	total_dividend: string = null;
	reinvested: boolean = debugging ? test_data.reinvested : true;
}// EditDividendFormState;


export default class EditDividendForm extends Component<EditDividendFormProps, EditDividendFormState> {

	private api: StockboyAPI = new StockboyAPI ();

	private form: RefObject<HTMLDivElement> = createRef ();

	private get edit_mode (): boolean { return isset (this.props.data.id) };


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


	public static defaultProps: EditDividendFormProps = {
		data: null,
	}// defaultProps;


	public state: EditDividendFormState = new EditDividendFormState ();


	public onSave (): Promise<PromptResponse> {
		return new Promise (resolve => {

			let values = new FormData (this.form.current.closest ("form"));

			this.api.fetch_data ("GetDividendTransaction", values).then ((response: BaseModel) => {
				if (isset (response?.id)) return popup_window.show (<div>

					A stock purchase was found on the same date for the same broker,<br />
					ticker and amount. Would you like to update that transaction<br />
					as a reinvestment?
				
					<div className="button-bar">
						<button onClick={() => {
							popup_window.show (<Eyecandy text="Updating transaction. One moment, please." />);
							this.api.fetch_data ("UpdateTransactionType", { id: response.id, type: "reinvestment" }).then (() => {
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

			<input type="hidden" id="id" name="id" value={this.props.data?.id ?? (debugging ? test_data.id : null)} />

			<TickerSelector  required={true} allow_all={false}
				broker_id={this.props.data?.broker_id ?? (debugging ? test_data.broker_id : null)} 
				ticker_id={this.props.data?.ticker_id ?? (debugging ? test_data.ticker_id : null)}>
			</TickerSelector>

			<div className="compact four-column-grid with-headspace">

				<label htmlFor="amount_per_share">Amount per share</label>
				<input id="amount_per_share" type="currency" commas="true" ref={this.per_share_textbox_ref}
					defaultValue={this.props.data?.amount_per_share ?? (debugging ? test_data.amount_per_share : null)} required={true}
					onChange={this.update_total_dividend}>
				</input>

				<label htmlFor="share_quantity">Share quantity</label>
				<input id="share_quantity" type="numeric" decimalPlaces={6} ref={this.quantity_textbox_ref}
					defaultValue={this.props.data?.share_quantity ?? (debugging ? test_data.share_quantity : null)} required={true}
					onChange={this.update_total_dividend}>
				</input>
				

				<div className={this.edit_mode ? "two-column-grid" : null} style={{ 
					gridColumn: (this.edit_mode ? "1 / -1" : null),
					display: (this.edit_mode ? null : "contents")
				}}>
					<label htmlFor="issue_date">Issue Date</label>
					<input id="issue_date" type="date" required={true}
						defaultValue={Date.format (this.props.data?.issue_date ?? (debugging ? test_data.issue_date : null), DateFormats.database)}>
					</input>
				</div>

				{this.edit_mode ? null : <div className="container">
					<div className="right-aligned row-block" style={{ gridColumn: "3 / span 2" }}>
						<div className="two-column-grid">
							<label htmlFor="reinvested">Reinvested</label>
							<input id="reinvested" type="checkbox" value={this.state.reinvested.toString ()}
								style={{ width: "1rem" }} defaultChecked={this.props.data?.reinvested ?? (debugging ? test_data.reinvested : null)} 
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
							defaultValue={Date.format (this.props.data?.transaction_date ?? (debugging ? test_data.transaction_date : null), DateFormats.database)}>
						</input>

						<label htmlFor="settlement_date">Settlement Date</label>
						<input id="settlement_date" type="date" required={this.state.reinvested} 
							defaultValue={Date.format (this.props.data?.settlement_date ?? (debugging ? test_data.settlement_date : null), DateFormats.database)}>
						</input>
				
						<label htmlFor="purchase_quantity">Number of shares purchased</label>
						<input id="purchase_quantity" type="numeric" commas="true" decimalPlaces={numeric_decimals} required={this.state.reinvested} 
							defaultValue={this.props.data?.shares_purchased ?? (debugging ? test_data.shares_purchased : null)}>
						</input>

						<label htmlFor="price">Purchase price</label>
						<input id="price" type="currency" commas="true" required={this.state.reinvested} 
							defaultValue={this.props.data?.purchase_price ?? (debugging ? test_data.purchase_price : null)}>
						</input>

					</div>
				</div>}

			</div>

		</div>
	}// render;

}// EditDividendForm;