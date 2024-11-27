/* eslint-disable no-unused-vars */

import { HoldingsStatus } from "Classes/Common/Globals";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, ReactElement, MouseEvent, KeyboardEvent } from "react";

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

	type StringPair = [string, string];

	type ChildElement = ReactElement | Array<ReactElement>

	type InputChangeEvent = ChangeEvent<HTMLInputElement>
	type ClickEvent = MouseEvent<HTMLElement>
	type ButtonClickEvent = MouseEvent<HTMLButtonElement>
	type KeyEvent = KeyboardEvent<HTMLElement>

}// global;

