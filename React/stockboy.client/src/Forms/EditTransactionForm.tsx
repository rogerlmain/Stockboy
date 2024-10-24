import InputElement from "Controls/InputElement";
import TransactionTypeList from "Controls/Lists/TransactionTypeList";
import TickerSelector from "Controls/TickerSelector";

import { date_format } from "Classes/Globals";
import { StockDataModel } from "Models/Abstract/BaseModel";
import { FormPage } from "Pages/Abstract/FormPage";
import { TransactionDataModel } from "Models/TransactionModels";



class EditTransactionFormProps extends StockDataModel {
	price: number = null;
	quantity: number = null;
	transaction_date: Date = null;
	settlement_date: Date = null;
	transaction_type_id: string = null;
	data?: TransactionDataModel = null;
}// EditTransactionFormProps;


export class EditTransactionForm extends FormPage<EditTransactionFormProps> {


	private static defaultValues: EditTransactionFormProps = {
		broker_id: "bf6be2f3-7141-11ef-b1e8-a4f933c45288",
		ticker_id: "153d3272-7168-11ef-b1e8-a4f933c45288",
		price: 0,
		quantity: 1,
		transaction_date: new Date ("2023-04-03T00:00:00"),
		settlement_date: new Date ("2023-04-03T00:00:00"),
		transaction_type_id: "f5f589b0-71ce-4fee-af61-7516f11a90e2",
	}// defaultValues;


	/********/


	public static defaultProps: EditTransactionFormProps = new EditTransactionFormProps ();


	public props: EditTransactionFormProps = EditTransactionForm.defaultProps;


	public render () { 
		return <div>

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="two-column-grid">
				<TickerSelector id={this.props.id} data={this.props.data}
					broker_id={this.props.data?.broker_id ?? this.props.broker_id ?? EditTransactionForm.defaultValues.broker_id} 
					ticker_id={this.props.data?.ticker_id ?? this.props.ticker_id ?? EditTransactionForm.defaultValues.ticker_id}>
				</TickerSelector>
			</div>

			<div className="compact four-column-grid with-headspace">

				<InputElement id="price" label="Price per share">
					<input type="currency" commas="true" defaultValue={this.props.data?.price ?? EditTransactionForm.defaultValues.price} />
				</InputElement>

				<InputElement id="quantity" label="Quantity">
					<input type="numeric" decimalPlaces={numeric_decimals} defaultValue={this.props.data?.quantity ?? EditTransactionForm.defaultValues.quantity} />
				</InputElement>

				<InputElement id="transaction_date" label="Transaction Date">
					<input type="date" defaultValue={Date.format (this.props.data?.transaction_date ?? EditTransactionForm.defaultValues.transaction_date, date_format.database)}>
					</input>
				</InputElement>

				<InputElement id="settlement_date" label="Settlement Date">
					<input type="date" defaultValue={Date.format (this.props.data?.settlement_date ?? EditTransactionForm.defaultValues.settlement_date, date_format.database)}>
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
