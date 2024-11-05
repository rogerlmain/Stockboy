import DataList from "Controls/Lists/DataList";

import { BaseProps } from "Controls/Abstract/BaseProperties";
import { DataControl } from "Controls/Abstract/DataControl";


class TransactionTypeListProps extends BaseProps {
	selected_item: string;
}// TransactionTypeListProps;


export default class TransactionTypeList extends DataControl<TransactionTypeListProps> {

	public static defaultProps: TransactionTypeListProps = {
		selected_item: null,
	}// defaultProps;


	public render () { 
		return <div className="container">
			<DataList id="transaction_type" header="Transaction types" table="transaction_types" selected_item={this.props.selected_item} />
		</div>
	}// render;

}// TransactionTypeList;