import DataList from "./DataList";

import { DataControl } from "Controls/Abstract/DataControls";
import { ListProps } from "Controls/Lists/SelectList";


export default class TransactionTypeList extends DataControl<ListProps> {
	public render = () => <DataList name="transaction_type_id" header="Transaction types" table="transaction_types" selected_item={this.props.selected_item} />
}// TransactionTypeList;