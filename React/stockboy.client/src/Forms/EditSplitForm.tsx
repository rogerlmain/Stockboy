import { ChangeEvent } from "react";
import { IEditFormProps } from "Forms/EditForm";
import { date_format } from "Classes/Globals";

import BaseComponent from "Controls/BaseComponent";
import InputElement from "Controls/InputElement";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";

import SplitModel from "Models/Splits";


class EditSplitFormProps implements IEditFormProps {
	broker_id?: string = null;
	ticker_id?: string = null;
	data?: SplitModel = null;
}// EditSplitFormProps;


class EditSplitFormState {
	broker_id: string = null;
}// EditSplitFormState;


export class EditSplitForm extends BaseComponent<EditSplitFormProps, EditSplitFormState> {


	public static defaultValues = {
		broker_id: null,
		ticker_id: null,
		previous: null,
		current: null,
		transaction_date: null,
	}// defaultValues;


	public state: EditSplitFormState = new EditSplitFormState ();


	public componentDidMount = () => this.setState ({ broker_id: this.props.broker_id ?? EditSplitForm.defaultValues.broker_id });


	public render () {
		return <div className="column-block">

			<input type="hidden" id="id" value={this.props.data?.id} />

			<div className="two-column-grid">

				<InputElement>
					<BrokerList selected_item={this.props.data?.broker_id ?? this.props.broker_id ?? EditSplitForm.defaultValues.broker_id} 
						onChange={(event: ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: event.target.value})}>
					</BrokerList>
				</InputElement>

				<InputElement>
					<TickerList selected_item={this.props.data?.ticker_id ?? this.props.ticker_id ?? EditSplitForm.defaultValues.ticker_id} 
						broker_id={this.state.broker_id}>
					</TickerList>
				</InputElement>

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
