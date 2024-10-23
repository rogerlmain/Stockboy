import BasePage from "Pages/Abstract/BasePage";
import DataPage from "Controls/DataPage";

import { DataTableProperties } from "Controls/Tables/DataTable";
import { EditSplitForm } from "Forms/EditSplitForm";
import { SplitListModel } from "Models/SplitModels";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "company", "ticker", "previous", "current", "split_date"],
	date_fields: ["split_date"],
	numeric_fields: ["previous", "current"]
}// properties;


export default class SplitsPage extends BasePage {
	public render () {
		return <div className="page-layout">

			<div className="title">Splits</div>

			<DataPage name="split" table_properties={properties}
				invisible_fields={new SplitListModel ().constructor.prototype.invisible_fields}
				edit_form={EditSplitForm}>
			</DataPage>

		</div>
	}// render;
}// SplitsPage;
