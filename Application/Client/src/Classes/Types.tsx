import { HoldingsStatus } from "Classes/Globals";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, ReactElement } from "react";

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

	type InputChangeEvent = ChangeEvent<HTMLInputElement>

}// global;

