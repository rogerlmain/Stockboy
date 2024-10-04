import DataList from "Controls/Lists/DataList";

import { DataControl } from "Controls/Abstract/DataControls";
import { ListProps } from "Controls/Lists/SelectList";


export default class BrokerList extends DataControl<ListProps> {
	public render = () => <DataList name="broker_id" table="brokers" header={this.props.header} selected_item={this.props.selected_item} onChange={this.props.onChange} />
}// BrokerList;