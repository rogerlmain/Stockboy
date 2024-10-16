import InputElement from "Controls/InputElement";
import TickerSelector from "Controls/TickerSelector";

import SplitDataModel from "Models/Data/SplitDataModel";

import { date_format } from "Classes/Globals";
import { IStockDataModel, StockModel } from "Models/Abstract/BaseModel";
import { FormPage } from "Pages/Abstract/FormPage";


class EditSplitFormProps extends StockModel implements IStockDataModel {
	data?: SplitDataModel = null;
}// EditSplitFormProps;


class EditSplitFormState {
	broker_id: string = null;
}// EditSplitFormState;


export class EditSplitForm extends FormPage<EditSplitFormProps, EditSplitFormState> {


	public static test_values = {
		broker_id: "bf6be2f3-7141-11ef-b1e8-a4f933c45288",
		ticker_id: "153d4fe6-7168-11ef-b1e8-a4f933c45288",
		previous: 20.00,
		current: 1.00,
		transaction_date: "2023-09-18",
	}// test_values;


	public static default_values = {
		broker_id: null,
		ticker_id: null,
		previous: null,
		current: null,
		transaction_date: null,
	}// default_values;


	public static defaultValues = this.test_values;


	public state: EditSplitFormState = new EditSplitFormState ();


	public componentDidMount = () => this.setState ({ broker_id: this.props.broker_id ?? EditSplitForm.defaultValues.broker_id });


	public render () {
		return <div className="column-block">

			<input type="hidden" id="id" value={this.props.data?.id} />

			<div className="two-column-grid">
				<TickerSelector id={this.props.id} data={this.props.data}
					broker_id={this.props.broker_id} 
					ticker_id={this.props.ticker_id}>
				</TickerSelector>
			</div>

			<div className="compact six-column-grid with-headspace">

				<InputElement id="previous" label="Previous">
					<input type="numeric" id="previous" name="previous" decimal-places={1} defaultValue={this.props.data?.previous ?? EditSplitForm.defaultValues.previous} />
				</InputElement>

				<InputElement id="previous" label="Current">
					<input type="numeric" id="current" name="current" decimal-places={1} defaultValue={this.props.data?.current ?? EditSplitForm.defaultValues.current} />
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
