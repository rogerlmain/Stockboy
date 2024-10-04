import BaseComponent from "Controls/BaseComponent";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";

import TransactionModel from "Models/TransactionModel";

import { IEditFormProps } from "Forms/EditForm";


class EditTransactionFormProps implements IEditFormProps {
	broker_id?: string = null;
	ticker_id?: string = null;
	data?: TransactionModel = null;
}// EditTransactionFormProps;


class EditTransactionFormState {
	broker_id: string = null;
}// EditTransactionFormState;


export class EditTransactionForm extends BaseComponent<EditTransactionFormProps, EditTransactionFormState> {


	public static defaultValues = {
		broker_id: "bf6be2f3-7141-11ef-b1e8-a4f933c45288",
		ticker_id: "153d4ae0-7168-11ef-b1e8-a4f933c45288",
		price: 2.81,
		quantity: 0.968005,
		transaction_date: "2024-09-30",
		settlement_date: "2024-10-01",
		transaction_type: "D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0"
	}// defaultProps;


	public state: EditTransactionFormState = new EditTransactionFormState ();


	public componentDidMount = () => this.setState ({ broker_id: this.props.broker_id ?? EditTransactionForm.defaultValues.broker_id });


	public render = () => <div className="column-block">

		<input type="hidden" id="id" value={this.props.data?.id} />

		<div className="two-column-grid">

			<BrokerList selected_item={this.props.data?.broker_id ?? this.props.broker_id ?? EditTransactionForm.defaultValues.broker_id} 
				onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: event.target.value})}>
			</BrokerList>

			<TickerList selected_item={this.props.data?.ticker_id ?? this.props.ticker_id ?? EditTransactionForm.defaultValues.ticker_id} 
				broker_id={this.state.broker_id}>
			</TickerList>
		</div>

		<br />

		<div className="four-column-grid compact">

			<label htmlFor="price">Price per share</label>
			<input type="currency" id="price" name="price" commas="true" defaultValue={this.props.data?.price ?? EditTransactionForm.defaultValues.price} />

			<label htmlFor="quantity">Quantity</label>
			<input type="numeric" id="quantity" name="quantity" defaultValue={this.props.data?.quantity ?? EditTransactionForm.defaultValues.quantity} />

			<label htmlFor="transaction_date">Transaction Date</label>
			<input type="date" id="transaction_date" name="transaction_date" defaultValue={isset (this.props.data) ? Date.format (this.props.data.transaction_date) : EditTransactionForm.defaultValues.transaction_date} />

			<label htmlFor="settlement_date">Settlment Date</label>
			<input type="date" id="settlement_date" name="settlement_date" defaultValue={isset (this.props.data) ? Date.format (this.props.data.settlement_date) : EditTransactionForm.defaultValues.settlement_date} />
		</div>

		<div className="row-centered with-some-headspace">
			<TransactionTypeList selected_item={this.props.data?.transaction_type ?? EditTransactionForm.defaultValues.transaction_type} />
		</div>

	</div>


}// EditTransactionForm;
