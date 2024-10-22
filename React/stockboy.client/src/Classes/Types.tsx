import { KeyValuePair } from "Classes/Collections";

export {}

declare global {

	type FormInputItem = (HTMLInputElement | HTMLTextAreaElement);
	type FormItem = (FormInputItem | HTMLSelectElement);

	type FormItemList = NodeListOf<FormItem>;

	type DataKey = string | KeyValuePair<string>

	type FieldValue = string | number | Date;

}// global;