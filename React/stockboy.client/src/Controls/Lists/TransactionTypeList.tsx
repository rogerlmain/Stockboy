import DataList from "./DataList";

import { DataControl } from "Controls/Abstract/DataControls";
import { BaseProps } from "Controls/BaseComponent";


class TransactionTypeListProps extends BaseProps {
	selected_item: string;
}// TransactionTypeListProps;


export default class TransactionTypeList extends DataControl<TransactionTypeListProps> {

	public static defaultProps: TransactionTypeListProps = {
		selected_item: null,
	}// defaultProps;


	public render () { 
		return <DataList name="transaction_type_id" header="Transaction types" table="transaction_types" selected_item={this.props.selected_item} />
	}// render;

}// TransactionTypeList;