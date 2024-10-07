import DataList from "Controls/Lists/DataList";
import NameValueCollection from "Classes/Collections";

import { DataControl } from "Controls/Abstract/DataControls";
import { ListProps } from "Controls/Lists/SelectList";



class TickerListProps extends ListProps {
	broker_id?: string = null;
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


	public render = () => <DataList name="ticker_id" header={this.props.header} table="tickers"
		onChange={this.props.onChange} parameters={this.get_parameters ()}
		selected_item={this.props.selected_item} 
		disabled={is_null (this.props.broker_id)}>
	</DataList>

}// BrokerList;

