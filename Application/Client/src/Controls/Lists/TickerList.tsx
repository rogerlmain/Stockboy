import DataList from "Controls/Lists/DataList";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataControl } from "Controls/Abstract/DataControl";
import { ChangeEventHandler } from "react";


class TickerListProps extends BaseProps {
	title?: string;
	header?: string;
	selected_item?: string;
	allow_all?: Boolean;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
}// TickerListProps;


export default class TickerList extends DataControl<TickerListProps> {

	public static defaultProps: TickerListProps = {
		title: null,
		header: null,
		selected_item: null,
		onChange: null,
	}// defaultProps;

	
	public render () { 
		return <DataList id="ticker_id" title={this.props.title ?? "Ticker"} header={this.props.header} table="UserTickers"
			selected_item={this.props.selected_item} allow_all={this.props.allow_all}
			onChange={this.props.onChange}>
		</DataList>
	}// render;

}// TickerList;