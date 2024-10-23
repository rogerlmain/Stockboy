import DataPage from "Controls/DataPage";
import EditDividendForm from "Forms/EditDividendForm";
import BasePage from "Pages/Abstract/BasePage";

import { DataTableProperties } from "Controls/Tables/DataTable";
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

	public render () {
		return <div className="page-layout">

			<div className="title">Dividends</div>

			<DataPage name="dividend" table_properties={properties} 
				invisible_fields={new DividendListModel ().constructor.prototype.invisible_fields}
				edit_form={EditDividendForm}>
			</DataPage>

		</div>
	}// render;

}// DividendsPage;