import DataList from "Controls/Lists/DataList";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataControl } from "Controls/Abstract/DataControl";


class BrokerListProps extends BaseProps {
	title?: string;
	header?: string;
	selected_item?: string;
	allow_all?: boolean;
	required?: boolean;
	onChange?: Function;
}// BrokerListProps;


export default class BrokerList extends DataControl<BrokerListProps> {

	public static defaultProps: BrokerListProps = {
		title: null,
		header: null,
		selected_item: null,
		allow_all: false,
		required: false,
		onChange: null,
	}// defaultProps;


	public render () {
		return <DataList id="broker_id" title={this.props.title ?? "Broker"} header={this.props.header} table="brokers"
			selected_item={this.props.selected_item} allow_all={this.props.allow_all} required={this.props.required}
			onChange={this.props.onChange}>
		</DataList>
	}// render;

}// BrokerList;