import { HoldingsStatus } from "Classes/Common/Globals";
import { IBaseModel } from "Models/Abstract/BaseModels";
import { ChangeEvent, ReactElement, MouseEvent, KeyboardEvent } from "react";


export {};


namespace arrays {

	export class ReactElementList extends Array<ReactElement> {}

}// arrays;


declare global {

	namespace globalThis {

		export import ReactElementList = arrays.ReactElementList;

	}// globalThis;


	type ReactElementContainer = ReactElement | ReactElementList;

	type FormField = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
	type FormFieldList = NodeListOf<FormField>

	type FieldValue = string | number | Date | boolean;

	type HoldingsFilterList = Array<HoldingsStatus>

	type StringObject = string | Object
	type StringDate = string | Date

	type DataArray = Array<IBaseModel>
	type StringArray = Array<string>
	type StringObjectArray = Array<StringObject>
	type AnyArray = Array<any>

	type StringPair = [string, string];

	type ChildElement = ReactElement | Array<ReactElement>

	type InputChangeEvent = ChangeEvent<HTMLInputElement>
	type ClickEvent = MouseEvent<HTMLElement>
	type ButtonClickEvent = MouseEvent<HTMLButtonElement>
	type KeyEvent = KeyboardEvent<HTMLElement>

	/**** Functions ****/

	type Callback = () => any;

}// global;


Object.assign (globalThis, arrays);