import NameValueCollection from "Classes/Collections";
import DataList from "Controls/Lists/DataList";

import { ChangeEventHandler } from "react";
import { DataControl } from "Controls/Abstract/DataControl";
import { BaseProps } from "Controls/Abstract/BaseProperties";


class TickerListProps extends BaseProps {
	title?: string;
	header?: string;
	selected_item?: string;
	selectable_header?: Boolean;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
}// TickerListProps;


export default class TickerList extends DataControl<TickerListProps> {

	public static defaultProps: TickerListProps = {
		title: null,
		header: null,
		selected_item: null,
		onChange: null,
	}// defaultProps;

	
	public render = () => <DataList name="ticker_id" title={this.props.title ?? "Ticker"} header={this.props.header} table="tickers"
		onChange={this.props.onChange} selectable_header={this.props.selectable_header}
		selected_item={this.props.selected_item}>
	</DataList>

}// BrokerList;

