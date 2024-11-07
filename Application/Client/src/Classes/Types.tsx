import { KeyValuePair } from "Classes/Collections";

import { IBaseModel } from "Models/Abstract/BaseModels";
import { ReactElement } from "react";
import { HoldingsStatus } from "Classes/Globals";

export { };

declare global {

	type FormField = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
	type FormFieldList = NodeListOf<FormField>

	type DataKey = string | KeyValuePair

	type FieldValue = string | number | Date

	type HoldingsFilterList = Array<HoldingsStatus>

	type DataArray = Array<IBaseModel>
	type StringArray = Array<string>

	type ChildElement = ReactElement | Array<ReactElement>

}// global;