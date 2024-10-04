import DataPage from "Pages/DataPage";
import BaseComponent from "Controls/BaseComponent";
import SplitModel from "Models/SplitModel";

import { EditSplitForm } from "Forms/EditSplitForm";
import { DataTableProperties } from "Controls/DataTable";


const properties: DataTableProperties = {
	keys: ["id"],
	fields: ["broker", "symbol", "company", "previous", "current", "split_date"],
	date_fields: ["split_date"],
	numeric_fields: ["previous", "current"]
}// properties;


export default class SplitsPage extends BaseComponent {
	public render = () => <DataPage table_properties={properties} edit_form={EditSplitForm} name="Splits" />
}// SplitsPage;
