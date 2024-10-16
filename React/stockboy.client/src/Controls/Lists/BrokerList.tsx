import DataList from "Controls/Lists/DataList";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataControl } from "Controls/Abstract/DataControl";
import { ChangeEventHandler } from "react";


class BrokerListProps extends BaseProps {
	title?: string;
	header?: string;
	selected_item?: string;
	selectable_header?: Boolean;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
}// BrokerListProps;


export default class BrokerList extends DataControl<BrokerListProps> {

	public static defaultProps: BrokerListProps = {
		title: null,
		header: null,
		selected_item: null,
		onChange: null,
	}// defaultProps;


	public render () {
		return <DataList name="broker_id" title={this.props.title ?? "Broker"} header={this.props.header} table="brokers"
			selected_item={this.props.selected_item} selectable_header={this.props.selectable_header}
			onChange={this.props.onChange}>
		</DataList>
	}// render;

}// BrokerList;