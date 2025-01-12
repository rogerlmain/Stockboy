import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import TickerSelector from "Controls/TickerSelector";

import { DateFormats } from "Classes/Common/Globals";
import { IBaseState, IFormProps } from "Controls/Abstract/BaseProperties";
import { TransactionDataModel } from "Models/Transactions";
import { Component } from "react";


let debugging: boolean = true;


const test_data: TransactionDataModel = {

	id: null,

	broker_id: "80e43ec8-016a-453d-b4ff-80d9d79a2bc7",
	ticker_id: "0953e82c-1178-4576-8438-2fdb28e79ea6",
	price: 5.38,
	quantity: 10.133828,
	transaction_date: new Date ("2024-12-23T00:00:00"),
	settlement_date: new Date ("2024-12-23T00:00:00"),
	transaction_type_id: "f5f589b0-71ce-4fee-af61-7516f11a90e2"

}// test_data;


class EditTransactionFormProps implements IFormProps {
	data?: TransactionDataModel;
}// EditTransactionFormProps;


export default class EditTransactionForm extends Component<EditTransactionFormProps, IBaseState> {

	public render () { 
		return <div>

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<TickerSelector  required={true} allow_all={false}
				broker_id={this.props.data?.broker_id ?? (debugging ? test_data.broker_id : null)} 
				ticker_id={this.props.data?.ticker_id ?? (debugging ? test_data.ticker_id : null)}>
			</TickerSelector>

			<div className="compact four-column-grid with-headspace">

				<label>Price</label>
				<input id="price" type="currency" commas="true" defaultValue={this.props.data?.price ?? (debugging ? test_data.price : null)} required={true} />

				<label htmlFor="quantity">Quantity</label>
				<input id="quantity" type="numeric" decimalPlaces={numeric_decimals} defaultValue={this.props.data?.quantity ?? (debugging ? test_data.quantity : null)} />

				<label htmlFor="transaction_date">Transaction Date</label>
				<input id="transaction_date" type="date" defaultValue={Date.format (this.props.data?.transaction_date ?? (debugging ? test_data.transaction_date : null), DateFormats.database)} />

				<label htmlFor="settlement_date">Settlement Date</label>
				<input id="settlement_date" type="date" defaultValue={Date.format (this.props.data?.settlement_date ?? (debugging ? test_data.settlement_date : null), DateFormats.database)} />

			</div>

			<div className="column-centered row-block with-some-headspace">
				<TransactionTypeList selected_item={this.props.data?.transaction_type_id ?? (debugging ? test_data.transaction_type_id : null)} />
			</div>

		</div>
	}// render;

}// EditTransactionForm;
