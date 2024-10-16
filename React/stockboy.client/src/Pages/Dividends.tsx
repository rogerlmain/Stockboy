import BasePage from "Pages/Abstract/BasePage";
import DataPage from "Controls/DataPage";
import EditDividendForm from "Forms/EditDividendForm";

import { DataTableProperties } from "Controls/Tables/DataTable";
import { EditTransactionForm } from "Forms/EditTransactionForm";
import { DividendListModel } from "Models/DividendModels";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "company", "ticker", "issue_date", "amount_per_share", "share_quantity", {payout: "Total Payout"}],
	date_fields: ["issue_date"],
	numeric_fields: ["share_quantity"],
	currency_fields: ["amount_per_share", "payout"],
	total_fields: ["payout"]
}// properties;

export default class DividendsPage extends BasePage {
	public render = () => <DataPage name="Dividend" table_properties={properties} 
		invisible_fields={new DividendListModel ().constructor.prototype.invisible_fields}
		edit_form={EditDividendForm}  />
}// DividendsPage;