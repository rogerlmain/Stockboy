import { IBaseModel } from "Models/Abstract/BaseModels";
import { ReactElement } from "react";
import { HoldingsStatus } from "Classes/Globals";

export { };


declare global {

	type FormField = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
	type FormFieldList = NodeListOf<FormField>

	type FieldValue = string | number | Date

	type HoldingsFilterList = Array<HoldingsStatus>

	type StringObject = string | Object

	type DataArray = Array<IBaseModel>
	type StringArray = Array<string>
	type StringObjectArray = Array<StringObject>

	type ChildElement = ReactElement | Array<ReactElement>

}// global;

