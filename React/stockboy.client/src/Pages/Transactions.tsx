import BaseComponent from "Controls/BaseComponent";
import DataPage from "Pages/DataPage";
import TransactionModel from "Models/TransactionModel";

import { DataTableProperties } from "Controls/DataTable";
import { EditTransactionForm } from "Forms/EditTransactionForm";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "ticker", "company", "price", "quantity", "transaction_date", "settlement_date", "transaction_type"],
	date_fields: ["transaction_date", "settlement_date"],
	numeric_fields: ["quantity"],
	currency_fields: ["price"]
}// properties;

export default class TransactionsPage extends BaseComponent {
	public render = () => <DataPage table_properties={properties} edit_form={EditTransactionForm} name="Transaction" />
}// TransactionsPage;
