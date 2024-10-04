import DataPage from "Pages/DataPage";
import BaseComponent from "Controls/BaseComponent";
import SplitModel from "Models/SplitModel";

import { EditSplitForm } from "Forms/EditSplitForm";


export default class SplitsPage extends BaseComponent {
	
	public render = () => <DataPage<SplitModel> edit_form={EditSplitForm} name="Split" />

}// SplitsPage;
