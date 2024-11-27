import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import TickerSelector from "Controls/TickerSelector";

import { DateFormats } from "Classes/Common/Globals";
import { IBaseState, IFormProps } from "Controls/Abstract/BaseProperties";
import { TransactionDataModel } from "Models/Transactions";
import { Component } from "react";


class EditTransactionFormProps implements IFormProps {
	data?: TransactionDataModel;
}// EditTransactionFormProps;


export default class EditTransactionForm extends Component<EditTransactionFormProps, IBaseState> {

	public render () { 
		return <div>

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<TickerSelector broker_id={this.props.data?.broker_id} ticker_id={this.props.data?.ticker_id} required={true} allow_all={false} />

			<div className="compact four-column-grid with-headspace">

				<label>Price</label>
				<input id="price" type="currency" commas="true" defaultValue={this.props.data?.price} required={true} />

				<label htmlFor="quantity">Quantity</label>
				<input id="quantity" type="numeric" decimalPlaces={numeric_decimals} defaultValue={this.props.data?.quantity} />

				<label htmlFor="transaction_date">Transaction Date</label>
				<input id="transaction_date" type="date" defaultValue={Date.format (this.props.data?.transaction_date, DateFormats.database)} />

				<label htmlFor="settlement_date">Settlement Date</label>
				<input id="settlement_date" type="date" defaultValue={Date.format (this.props.data?.settlement_date, DateFormats.database)} />

			</div>

			<div className="column-centered row-block with-some-headspace">
				<TransactionTypeList selected_item={this.props.data?.transaction_type_id} />
			</div>

		</div>
	}// render;

}// EditTransactionForm;
