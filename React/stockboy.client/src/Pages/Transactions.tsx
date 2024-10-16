import DataPage from "Controls/DataPage";
import BasePage from "Pages/Abstract/BasePage";

import { DataTableProperties } from "Controls/Tables/DataTable";
import { EditTransactionForm } from "Forms/EditTransactionForm";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "ticker", "company", "transaction_date", "settlement_date", "quantity", "price", "cost", "transaction_type"],
	date_fields: ["transaction_date", "settlement_date"],
	numeric_fields: ["quantity"],
	currency_fields: ["price", "cost"]
}// properties;

export default class TransactionsPage extends BasePage {
	public render = () => <DataPage table_properties={properties} edit_form={EditTransactionForm} name="Transaction" />
}// TransactionsPage;

