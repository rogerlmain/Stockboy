import InputElement from "Controls/InputElement";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import TickerSelector from "Controls/TickerSelector";

import TransactionDataModel from "Models/Data/TransactionDataModel";

import { date_format } from "Classes/Globals";
import { BaseComponent } from "Controls/BaseComponent";
import { StockDataModel } from "Models/Abstract/BaseModel";


class EditTransactionFormProps extends StockDataModel {
	price: number = null;
	quantity: number = null;
	transaction_date: Date = null;
	settlement_date: Date = null;
	transaction_type_id: string = null;
	data?: TransactionDataModel = null;
}// EditTransactionFormProps;


export class EditTransactionForm extends BaseComponent<EditTransactionFormProps> {


	private static defaultValues = {
		broker_id: "bf6be2f3-7141-11ef-b1e8-a4f933c45288",
		ticker_id: "153d3272-7168-11ef-b1e8-a4f933c45288",
		price: 0.2622,
		quantity: 50,
		transaction_date: "2023-05-30T00:00:00",
		settlement_date: "2023-05-30T00:00:00",
		transaction_type_id: "f5f589b0-71ce-4fee-af61-7516f11a90e2",
	}// defaultValues;


	/********/


	public static defaultProps = new EditTransactionFormProps ();


	public render () { 
		return <div className="column-block">

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="two-column-grid">
				<TickerSelector id={this.props.id} data={this.props.data}
					broker_id={this.props.broker_id ?? EditTransactionForm.defaultValues.broker_id} 
					ticker_id={this.props.ticker_id ?? EditTransactionForm.defaultValues.ticker_id}>
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
						defaultValue={Date.format (this.props.data?.transaction_date ?? EditTransactionForm.defaultValues.transaction_date, date_format.database)}>
					</input>
				</InputElement>

				<InputElement id="settlement_date" label="Settlement Date">
					<input type="date" id="settlement_date" name="settlement_date" 
						defaultValue={Date.format (this.props.data?.settlement_date ?? EditTransactionForm.defaultValues.settlement_date, date_format.database)}>
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
