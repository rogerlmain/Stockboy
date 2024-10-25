import Decimal from "Classes/Decimal";

import InputElement from "Controls/InputElement";
import TickerSelector from "Controls/TickerSelector";

import { date_format } from "Classes/Globals";
import { BaseModel, IStockDataModel, StockDataModel } from "Models/Abstract/BaseModel";
import { ChangeEvent, RefObject, createRef } from "react";
import { FormPage } from "Pages/Abstract/FormPage";
import { DividendDataModel } from "Models/DividendModels";
import { PromptResponse } from "../Controls/EditFormControl";
import APIClass from "../Classes/APIClass";
import Eyecandy from "../Controls/Eyecandy";



class EditDividendFormProps extends StockDataModel implements IStockDataModel {
	data?: DividendDataModel = null;
}// EditDividendFormProps;


class EditDividendFormState {
	broker_id: string = null;
	total_dividend: string = null;
	reinvested: boolean = true;
}// EditDividendFormState;


export default class EditDividendForm extends FormPage<EditDividendFormProps, EditDividendFormState> {

	private form: RefObject<HTMLDivElement> = createRef ();


	private static test_values: DividendDataModel = {
		broker_id: "80e43ec8-016a-453d-b4ff-80d9d79a2bc7",
		ticker_id: "4676d995-5c5b-4bd9-b1b7-26532e391c42",
		amount_per_share: 0.0825,
		share_quantity: 6.0919,
		issue_date: new Date ("2023-10-31T00:00:00"),
		reinvested: false,

		transaction_date: new Date ("2023-10-31T00:00:00"),
		settlement_date: new Date ("2023-11-01T00:00:00"),
		shares_purchased: 0.05144,
		purchase_price: 9.72,

	}// test_values;


	private static default_values = {
		broker_id: null,
		ticker_id: null,
		amount_per_share: null,
		share_quantity: null,
		issue_date: null,
		reinvested: false,
		transaction_date: null,
		settlement_date: null,
		shares_purchased: null,
		purchase_price: null,
	}// default_values;


	private static defaultValues = this.test_values;


	private per_share_textbox_ref: RefObject<HTMLInputElement> = createRef ();
	private quantity_textbox_ref: RefObject<HTMLInputElement> = createRef ();


	private update_total_dividend = () => {

		let total = Decimal.round (parseFloat (this.per_share_textbox_ref.current.value) * parseFloat (this.quantity_textbox_ref.current.value), 2);
		let parts = total.toString ().parts (".", 1, 2);

		if (parts.length == 1) parts.push ("0");
		parts [1] = parts [1].padEnd (2, "0");

		this.setState ({ total_dividend: `${parts [0]}.${parts [1]}` });

	}// update_total_dividend;


	/********/


	public static defaultProps = {
		broker_id: null,
		ticker_id: null,
		data: null,
	}// defaultProps;


	public state: EditDividendFormState = new EditDividendFormState ();


	public onSave (): Promise<PromptResponse> {
		return new Promise (resolve => {

			let values = {
				broker_id: (this.form.current.querySelector ("select#broker_id_list") as HTMLSelectElement).value,
				ticker_id: (this.form.current.querySelector ("select#ticker_id_list") as HTMLSelectElement).value,
				amount_per_share: (this.form.current.querySelector ("input#amount_per_share") as HTMLInputElement).value,
				share_quantity: (this.form.current.querySelector ("input#share_quantity") as HTMLInputElement).value,
				issue_date: (this.form.current.querySelector ("input#issue_date") as HTMLInputElement).value,
			}// values;

			APIClass.fetch_data ("GetDividendTransaction", values).then ((response: BaseModel) => {
				if (isset (response.id)) return popup_window.show (<div>

					A stock purchase was found on the same date for the same broker,<br />
					ticker and amount. Would you like to update that transaction<br />
					as a reinvestment?
				
					<div className="button-bar">
						<button onClick={() => {
							popup_window.show (<Eyecandy text="Updating transaction. One moment, please." />);
							APIClass.fetch_data ("UpdateTransactionType", { id: response.id, type: "reinvestment" }).then (response => {
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


	public componentDidMount () { 
		return this.setState ({
			broker_id: this.props.broker_id ?? EditDividendForm.defaultValues.broker_id,
			reinvested: EditDividendForm.defaultValues.reinvested
		});
	}// componentDidMount;


	public render () {

		return <div ref={this.form}>

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="two-column-grid">
				<TickerSelector id="ticker_selector"
					broker_id={this.props.data?.broker_id ?? this.props.broker_id ?? EditDividendForm.defaultValues.broker_id} 
					ticker_id={this.props.data?.ticker_id ?? this.props.ticker_id ?? EditDividendForm.defaultValues.ticker_id}>
				</TickerSelector>
			</div>

			<div className="compact four-column-grid with-headspace">

				<InputElement id="amount_per_share" label="Amount per share">
					<input type="currency" commas="true" ref={this.per_share_textbox_ref}
						defaultValue={this.props.data?.amount_per_share ?? EditDividendForm.defaultValues.amount_per_share}
						onChange={this.update_total_dividend}>
					</input>
				</InputElement>

				<InputElement id="share_quantity" label="Share quantity">
					<input type="numeric" decimalPlaces={6} ref={this.quantity_textbox_ref}
						defaultValue={this.props.data?.share_quantity ?? EditDividendForm.defaultValues.share_quantity}
						onChange={this.update_total_dividend}>
					</input>
				</InputElement>

				<div className={this.edit_mode ? "two-column-grid" : null} style={{ 
					gridColumn: (this.edit_mode ? "1 / -1" : null),
					display: (this.edit_mode ? null : "contents")
				}}>
					<InputElement id="issue_date" label="Issue Date">
						<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.issue_date : EditDividendForm.defaultValues.issue_date, date_format.database)} />
					</InputElement>
				</div>

				{this.edit_mode ? null : <div className="container">
					<div className="right-aligned" style={{ gridColumn: "3 / span 2" }}>
						<div className="two-column-grid">
							<InputElement id="reinvested" label="Reinvested">
								<input type="checkbox" value={this.state.reinvested.toString ()}
									style={{ width: "1rem" }}
									defaultChecked={EditDividendForm.defaultValues.reinvested} 
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										event.target.value = event.target.checked.toString ();
										this.setState ({ reinvested: event.target.checked })
									}}>
								</input>
							</InputElement>
						</div>
					</div>

					<div className={`${is_null (this.state.total_dividend) && "hidden"} full-width two-column-grid`}>
						<label>Total payout</label>
						<div>${this.state.total_dividend}</div>
					</div>

					<div className={`${!this.state.reinvested && "hidden"} container`}>
				
						<div className="full-width row-divider"></div>

						<InputElement id="transaction_date" label="Transaction Date" required={this.state.reinvested}>
							<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.transaction_date : EditDividendForm.defaultValues.transaction_date, date_format.database)} />
						</InputElement>

						<InputElement id="settlement_date" label="Settlement Date" required={this.state.reinvested}>
							<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.settlement_date : EditDividendForm.defaultValues.settlement_date, date_format.database)} />
						</InputElement>
				
						<InputElement id="quantity" label="Number of shares purchased" required={this.state.reinvested}>
							<input type="numeric" commas="true" decimalPlaces={numeric_decimals} defaultValue={this.props.data?.shares_purchased ?? EditDividendForm.defaultValues.shares_purchased} />
						</InputElement>

						<InputElement id="price" label="Purchase price" required={this.state.reinvested}>
							<input type="currency" commas="true" defaultValue={this.props.data?.purchase_price ?? EditDividendForm.defaultValues.purchase_price} />
						</InputElement>

					</div>
				</div>}

			</div>

		</div>
	}// render;

}// EditDividendForm;