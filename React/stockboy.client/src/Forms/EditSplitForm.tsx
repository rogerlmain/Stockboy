import InputElement from "Controls/InputElement";
import TickerSelector from "Controls/TickerSelector";

import { date_format } from "Classes/Globals";
import { IStockDataModel, StockModel } from "Models/Abstract/BaseModel";
import { FormPage } from "Pages/Abstract/FormPage";
import { SplitDataModel } from "Models/SplitModels";


class EditSplitFormProps extends StockModel implements IStockDataModel {
	data?: SplitDataModel = null;
}// EditSplitFormProps;


class EditSplitFormState {
	broker_id: string = null;
}// EditSplitFormState;


export class EditSplitForm extends FormPage<EditSplitFormProps, EditSplitFormState> {


	public static test_values = {
		broker_id: "80e43ec8-016a-453d-b4ff-80d9d79a2bc7",
		ticker_id: "4676d995-5c5b-4bd9-b1b7-26532e391c42",
		previous: 2.00,
		current: 1.00,
		transaction_date: "2024-04-04",
	}// test_values;


	public static default_values = {
		broker_id: null,
		ticker_id: null,
		previous: null,
		current: null,
		transaction_date: null,
	}// default_values;


	public static defaultValues = this.default_values;


	public state: EditSplitFormState = new EditSplitFormState ();


	public componentDidMount = () => this.setState ({ broker_id: this.props.broker_id ?? EditSplitForm.defaultValues.broker_id });


	public render () {
		return <div>

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="two-column-grid">
				<TickerSelector id={this.props.id} data={this.props.data}
					broker_id={this.props.data?.broker_id ?? this.props.broker_id ?? EditSplitForm.defaultValues.broker_id} 
					ticker_id={this.props.data?.ticker_id ?? this.props.ticker_id ?? EditSplitForm.defaultValues.ticker_id}>
				</TickerSelector>
			</div>

			<div className="compact six-column-grid with-headspace">

				<InputElement id="previous" label="Previous">
					<input type="numeric" decimal-places={1} defaultValue={this.props.data?.previous ?? EditSplitForm.defaultValues.previous} />
				</InputElement>

				<InputElement id="current" label="Current">
					<input type="numeric" decimal-places={1} defaultValue={this.props.data?.current ?? EditSplitForm.defaultValues.current} />
				</InputElement>

				<div className="full-width row-centered">
					<div className="two-column-grid">
						<InputElement id="split_date" label="Split Date">
							<input type="date" id="split_date" name="split_date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.split_date : EditSplitForm.defaultValues.transaction_date, date_format.database)} />
						</InputElement>
					</div>
				</div>

			</div>
		</div>
	}// render;

}// EditSplitForm;
