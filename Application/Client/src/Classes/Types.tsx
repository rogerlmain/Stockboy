import { KeyValuePair } from "Classes/Collections";
import { HoldingsFilter } from "Classes/HoldingsData";

import { IBaseModel } from "Models/Abstract/BaseModels";
import { ReactElement } from "react";

export { };

declare global {

	type FormField = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
	type FormFieldList = NodeListOf<FormField>

	type DataKey = string | KeyValuePair

	type FieldValue = string | number | Date

	type HoldingsFilterList = Array<HoldingsFilter>

	type DataArray = Array<IBaseModel>
	type StringArray = Array<string>

	type ReactElementList = ReactElement | Array<ReactElement>

}// global;