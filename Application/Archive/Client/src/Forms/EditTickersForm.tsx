import { Component } from "react";
import { TickersDataModel } from "../Models/Tickers";


class TickersFormProps {
	data?: TickersDataModel;
}// TickersFormProps;


export default class EditTickersForm extends Component<TickersFormProps> {

	public render () {
		return <div className="two-column-grid">
			<input type="text" name="name" placeholder="Name" />
			<input type="text" name="symbol" placeholder="Symbol" style={{ width: "4rem" }} />
			<select name="dividend_frequency">
				<option value={String.Empty}>Dividend Frequency</option>
				<option value="1">Monthly</option>
				<option value="3">Quarterly</option>
				<option value="12">Annually</option>
			</select>
			<input type="date" name="last_paid" placeholder="Last paid" />
		</div>
	}// render;

}// EditTickersForm;

