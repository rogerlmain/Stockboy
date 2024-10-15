import InputElement from "Controls/InputElement";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import TickerSelector from "Controls/TickerSelector";

import TransactionDataModel from "Models/Transactions";

import { date_format } from "Classes/Globals";
import { BaseComponent } from "Controls/BaseComponent";
import { StockDataModel } from "Models/Abstract/BaseModel";


class EditTransactionFormProps extends StockDataModel {
	data?: TransactionDataModel = null;
}// EditTransactionFormProps;


class EditTransactionFormState {
	broker_id: string = null;
}// EditTransactionFormState;


export class EditTransactionForm extends BaseComponent<EditTransactionFormProps, EditTransactionFormState> {


	private static defaultValues = {
		broker_id: null,
		ticker_id: null,
		price: null,
		quantity: null,
		transaction_date: null,
		settlement_date: null,
		transaction_type_id: null,
	}// defaultProps;


	/********/


	public static defaultProps = {
		broker_id: null,
		ticker_id: null,
		data: null,
	}// defaultProps;


	public state: EditTransactionFormState = new EditTransactionFormState ();


	public componentDidMount = () => this.setState ({ broker_id: this.props.broker_id ?? EditTransactionForm.defaultValues.broker_id });


	public render () { 
		return <div className="column-block">

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="two-column-grid">
				<TickerSelector id={this.props.id} data={this.props.data}
					broker_id={this.props.broker_id} 
					ticker_id={this.props.ticker_id}>
				</TickerSelector>
			</div>

			<div className="compact four-column-grid with-headspace">

				<InputElement id="price" label="Price per share">
					<input type="currency" id="price" name="price" commas="true" defaultValue={this.props.data?.price ?? EditTransactionForm.defaultValues.price} />
				</InputElement>

				<InputElement id="quantity" label="Quantity">
					<input type="numeric" id="quantity" name="quantity" decimalPlaces={6} defaultValue={this.props.data?.quantity ?? EditTransactionForm.defaultValues.quantity} />
				</InputElement>

				<InputElement id="transaction_date" label="Transaction Date">
					<input type="date" id="transaction_date" name="transaction_date" 
						defaultValue={Date.format (isset (this.props.data) ? this.props.data.transaction_date : EditTransactionForm.defaultValues.transaction_date, date_format.database)}>
					</input>
				</InputElement>

				<InputElement id="settlement_date" label="Settlement Date">
					<input type="date" id="settlement_date" name="settlement_date" 
						defaultValue={Date.format (isset (this.props.data) ? this.props.data.settlement_date : EditTransactionForm.defaultValues.settlement_date, date_format.database)}>
					</input>
				</InputElement>
			</div>

			<div className="row-centered with-some-headspace">
				<InputElement>
					<TransactionTypeList selected_item={this.props.data?.transaction_type_id ?? EditTransactionForm.defaultValues.transaction_type_id} />
				</InputElement>
			</div>

		</div>
	}// render;


}// EditTransactionForm;
