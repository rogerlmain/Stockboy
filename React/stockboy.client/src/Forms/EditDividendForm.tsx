import NameValueCollection from "Classes/Collections";
import Decimal from "Classes/Decimal";

import InputElement from "Controls/InputElement";
import TickerSelector from "Controls/TickerSelector";

import DividendDataModel from "Models/Dividends";

import { date_format } from "Classes/Globals";
import { FormComponent } from "Controls/Abstract/FormComponent";
import { StockDataModel } from "Models/Abstract/BaseModel";
import { ChangeEvent, RefObject, createRef } from "react";


class EditDividendFormProps extends StockDataModel {
	data?: DividendDataModel = null;
}// EditDividendFormProps;


class EditDividendFormState {
	broker_id: string = null;
	reinvested: boolean = true;
	total_dividend: number = null;
}// EditDividendFormState;


export default class EditDividendForm extends FormComponent<EditDividendFormProps, EditDividendFormState> {

	private static test_values = {
		broker_id: "bf6be2f3-7141-11ef-b1e8-a4f933c45288",
		ticker_id: "a68d31aa-7141-11ef-b1e8-a4f933c45288",
		amount_per_share: 0.15,
		share_quantity: 51.4146,
		issue_date: "2024-01-18T00:00:00",
		reinvested: true,
		transaction_date: "2024-01-19T00:00:00",
		settlement_date: "2024-01-23T00:00:00",
		shares_purchased: 1.542,
	}// test_values;


	private static default_values = {
		broker_id: null,
		ticker_id: null,
		amount_per_share: null,
		share_quantity: null,
		issue_date: null,
		reinvested: true,
		transaction_date: null,
		settlement_date: null,
		share_price: null,
	}// default_values;


	private static defaultValues = this.test_values;


	private per_share_textbox_ref: RefObject<HTMLInputElement> = createRef ();
	private quantity_textbox_ref: RefObject<HTMLInputElement> = createRef ();


	private update_total_dividend = () => {

		let total = Decimal.round (Decimal.multiply (parseFloat (this.per_share_textbox_ref.current.value), parseFloat (this.quantity_textbox_ref.current.value)), 2);

		this.setState ({ total_dividend: total });

	}// update_total_dividend;


	/********/


	public static defaultProps = {
		broker_id: null,
		ticker_id: null,
		data: null,
	}// defaultProps;


	public static rounded_fields: NameValueCollection<number> = { amount_per_share: 2 }
	public state: EditDividendFormState = new EditDividendFormState ();


	public componentDidMount () { 
		return this.setState ({
			broker_id: this.props.broker_id ?? EditDividendForm.defaultValues.broker_id,
			reinvested: EditDividendForm.defaultValues.reinvested
		});
	}// componentDidMount;


	public render () {

		return <div className="column-block">

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="two-column-grid">
				<TickerSelector id="ticker_selector"
					broker_id={this.props.data?.broker_id ?? this.props.broker_id} 
					ticker_id={this.props.data?.ticker_id ?? this.props.ticker_id}>
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

				<InputElement id="issue_date" label="Issue Date">
					<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.issue_date : EditDividendForm.defaultValues.issue_date, date_format.database)} />
				</InputElement>

				<label htmlFor="reinvested">Reinvested</label>
				<input type="checkbox" id="reinvested" name="reinvested" value={this.state.reinvested.toString ()}
					defaultChecked={EditDividendForm.defaultValues.reinvested} 
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						event.target.value = event.target.checked.toString ();
						this.setState ({ reinvested: event.target.checked })
					}}>
				</input>

				<div className={`${is_null (this.state.total_dividend) ? "hidden" : String.Empty} full-width two-column-grid`}>
					<label>Total payout</label>
					<div>${this.state.total_dividend}</div>
				</div>

				<div className={`${this.state.reinvested ? String.Empty : "hidden"} container`}>
				
					<div className="full-width row-divider"></div>

					<InputElement id="transaction_date" label="Transaction Date" required={this.state.reinvested}>
						<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.reinvestment_date : EditDividendForm.defaultValues.transaction_date, date_format.database)} />
					</InputElement>

					<InputElement id="settlement_date" label="Settlement Date" required={this.state.reinvested}>
						<input type="date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.settlement_date : EditDividendForm.defaultValues.settlement_date, date_format.database)} />
					</InputElement>
				
					<div className="full-width row-block column-centered">
						<InputElement id="shares_purchased" label="Number of shares purchased" required={this.state.reinvested}>
							<input type="currency" commas="true" defaultValue={this.props.data?.shares_purchased ?? EditDividendForm.defaultValues.shares_purchased} />
						</InputElement>
					</div>

				</div>

			</div>

		</div>
	}// render;

}// EditDividendForm;