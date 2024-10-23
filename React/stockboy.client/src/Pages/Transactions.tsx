import DataPage from "Controls/DataPage";
import BasePage from "Pages/Abstract/BasePage";

import { DataTableProperties } from "Controls/Tables/DataTable";
import { EditTransactionForm } from "Forms/EditTransactionForm";
import { TransactionListModel } from "Models/TransactionModels";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "company", "ticker", "transaction_date", "settlement_date", "quantity", "price", "cost", "transaction_type"],
	date_fields: ["transaction_date", "settlement_date"],
	numeric_fields: ["quantity"],
	currency_fields: ["price", "cost"],
	rounded_fields: [{ cost: 2 }]
}// properties;


export default class TransactionsPage extends BasePage {

	public render () {
		return <div className="page-layout">

			<div className="title">Transactions</div>
		
			<DataPage name="transaction" table_properties={properties} 
				invisible_fields = {new TransactionListModel ().constructor.prototype.invisible_fields}
				edit_form={EditTransactionForm}>
			</DataPage>

		</div>
	}// render;

}// TransactionsPage;

