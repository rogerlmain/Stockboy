import BaseComponent from "Controls/BaseComponent";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";

import SplitModel from "Models/SplitModel";

import { IEditFormProps } from "Forms/EditForm";
import { date_format } from "../Classes/Globals";


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
		broker_id: "bf6be2f3-7141-11ef-b1e8-a4f933c45288", //null,
		ticker_id: "153d44ac-7168-11ef-b1e8-a4f933c45288", //null,
		previous: 10, //null,
		current: 1, //null,
		transaction_date: "2023-09-19", //null,
	}// defaultValues;


	public state: EditSplitFormState = new EditSplitFormState ();


	public componentDidMount = () => this.setState ({ broker_id: this.props.broker_id ?? EditSplitForm.defaultValues.broker_id });


	public render () {
		return <div className="column-block">

			<input type="hidden" id="id" value={this.props.data?.id} />

			<div className="two-column-grid">

				<BrokerList selected_item={this.props.data?.broker_id ?? this.props.broker_id ?? EditSplitForm.defaultValues.broker_id} 
					onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.setState ({ broker_id: event.target.value})}>
				</BrokerList>

				<TickerList selected_item={this.props.data?.ticker_id ?? this.props.ticker_id ?? EditSplitForm.defaultValues.ticker_id} 
					broker_id={this.state.broker_id}>
				</TickerList>

			</div>

			<div className="compact six-column-grid with-headspace">

				<label htmlFor="previous">Previous</label>
				<input type="numeric" id="previous" name="previous" decimal-places={1} defaultValue={this.props.data?.previous ?? EditSplitForm.defaultValues.previous} />

				<label htmlFor="previous">Current</label>
				<input type="numeric" id="current" name="current" decimal-places={1} defaultValue={this.props.data?.current ?? EditSplitForm.defaultValues.current} />

				<label htmlFor="split_date">Split Date</label>
				<div className="two-column-grid">
					<input type="date" id="split_date" name="split_date" defaultValue={Date.format (isset (this.props.data) ? this.props.data.split_date : EditSplitForm.defaultValues.transaction_date, date_format.database)} />
				</div>

			</div>
		</div>
	}// render;

}// EditSplitForm;
