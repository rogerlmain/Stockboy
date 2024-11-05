import TickerSelector from "Controls/TickerSelector";

import { date_format } from "Classes/Globals";
import { IBaseState, IFormProps } from "Controls/Abstract/BaseProperties";
import { SplitDataModel } from "Models/Splits";
import { Component } from "react";


class EditSplitFormProps implements IFormProps {
	data?: SplitDataModel = null;
}// EditSplitFormProps;


export class EditSplitForm extends Component<EditSplitFormProps, IBaseState> {


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


	public render () {
		return <div>

			<input type="hidden" id="id" name="id" value={this.props.data?.id} />

			<div className="row-centered">
				<TickerSelector broker_id={this.props.data?.broker_id} ticker_id={this.props.data?.ticker_id} required={true} allow_all={false} />
			</div>

			<div className="compact six-column-grid with-headspace">

				<label htmlFor="previous">Previous</label>
				<input id="previous" type="numeric" decimal-places={1} defaultValue={this.props.data?.previous} />

				<label htmlFor="current">Current</label>
				<input id="current" type="numeric" decimal-places={1} defaultValue={this.props.data?.current} />

				<div className="full-width row-centered">
					<div className="two-column-grid">
						<label htmlFor="split_date">Split Date</label>
						<input id="split_date" type="date" defaultValue={Date.format (this.props.data.split_date, date_format.database)} />
					</div>
				</div>

			</div>
		</div>
	}// render;

}// EditSplitForm;
