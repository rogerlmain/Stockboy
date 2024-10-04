import React from "react";

import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import PopupWindow from "Controls/PopupWindow";

import SelectList from "Controls/Lists/SelectList";
import BrokerList from "Controls/Lists/BrokerList";
import TickerList from "Controls/Lists/TickerList";

import SplitModel from "Models/SplitModel";

import { DataControl } from "Controls/Abstract/DataControls";
import { NameValueCollection } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";


class EditSplitFormProps extends BaseProps {
	broker_id?: string = null;
	ticker_id?: string = null;
	data?: SplitModel = null;
}// EditSplitFormProps;


export class EditSplitForm extends BaseComponent<EditSplitFormProps> {


	private form_element: React.RefObject<HTMLDivElement> = React.createRef ();


	public Split_form: React.RefObject<HTMLFormElement> = React.createRef ();


	public render = () => <form ref={this.Split_form}>

		<div className="two-column-grid">

			<input type="hidden" id="id" value={this.props.data?.id} />

			<label htmlFor="broker">Broker</label>
			<BrokerList selected_item={isset (this.props.data) ? this.props.data.broker_id : this.props.broker_id} name="broker_id" />

			<label htmlFor="ticker">Company / Ticker</label>
			<TickerList selected_item={isset (this.props.data) ? this.props.data.ticker_id : this.props.ticker_id} name="ticker_id" />

			<label htmlFor="split_date">Split Date</label>
			<div className="two-column-grid">
				<input type="date" id="split_date" name="split_date" defaultValue={isset (this.props.data) ? Date.format (this.props.data.split_date) : Date.today (false)} />
			</div>

		</div>

	</form>

}// EditSplitForm;