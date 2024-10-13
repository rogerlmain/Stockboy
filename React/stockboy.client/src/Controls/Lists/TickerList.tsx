import NameValueCollection from "Classes/Collections";
import DataList from "Controls/Lists/DataList";

import { ChangeEventHandler } from "react";
import { DataControl } from "Controls/Abstract/DataControls";
import { BaseProps } from "Controls/BaseComponent";



class TickerListProps extends BaseProps {
	title?: string;
	header?: string;
	selected_item?: string;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
	broker_id?: string;
}// TickerListProps;

export default class TickerList extends DataControl<TickerListProps> {

	private parameters: NameValueCollection<string> = null;


	private get_parameters () {
		if (is_null (this.props.broker_id)) return null;
		if (is_null (this.parameters)) return this.parameters = new NameValueCollection ({ broker_id: this.props.broker_id });
		if (this.parameters ["broker_id"] == this.props.broker_id) return this.parameters;
		return new NameValueCollection ({ broker_id: this.props.broker_id });
	}// get_parameters;


	/********/


	public static defaultProps: TickerListProps = {
		title: null,
		header: null,
		selected_item: null,
		onChange: null,
		broker_id: null,
	}// defaultProps;

	
	public render = () => <DataList name="ticker_id" title={this.props.title ?? "Ticker"} header={this.props.header} table="tickers"
		onChange={this.props.onChange} parameters={this.get_parameters ()}
		selected_item={this.props.selected_item} 
		disabled={is_null (this.props.broker_id)}>
	</DataList>

}// BrokerList;

