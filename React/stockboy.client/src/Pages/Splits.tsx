import BasePage from "Pages/Abstract/BasePage";
import DataPage from "Controls/DataPage";

import { DataTableProperties } from "Controls/Tables/DataTable";
import { EditSplitForm } from "Forms/EditSplitForm";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "symbol", "company", "previous", "current", "split_date"],
	date_fields: ["split_date"],
	numeric_fields: ["previous", "current"]
}// properties;


export default class SplitsPage extends BasePage {
	public render = () => <DataPage table_properties={properties} edit_form={EditSplitForm} name="Split" />
}// SplitsPage;
