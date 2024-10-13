import DataList from "Controls/Lists/DataList";

import { ChangeEventHandler } from "react";
import { DataControl } from "Controls/Abstract/DataControls";
import { BaseProps } from "Controls/BaseComponent";


class BrokerListProps extends BaseProps {
	title?: string;
	header?: string;
	selected_item?: string;
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
			selected_item={this.props.selected_item}
			onChange={this.props.onChange}>
		</DataList>
	}// render;

}// BrokerList;