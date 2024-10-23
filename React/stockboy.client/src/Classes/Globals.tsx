import { KeyValuePair } from "Classes/Collections";
import PopupWindow from "../Controls/PopupWindow";

export {};


/**** Application Specific Definitions ****/


declare global {

	var popup_window: PopupWindow;

}// global;


globalThis.popup_window = null;


/**** Generic Global Definitions ****/


declare global {

	var form_items: string;

	var currency_decimals: number;
	var numeric_decimals: number;

	var comma: string;
	var underscore: string;

	var digits: Array<number>;
	var action_keys: Array<string>;
	var control_keys: Array<string>;

	var key_name: Function;

	var is_empty: Function;
	var not_empty: Function;

	var isset: Function;
	var not_set: Function;

	var is_null: Function;
	var not_null: Function;

	var is_defined: Function;
	var not_defined: Function;

	var conditional: Function;

}// global;


export enum date_format {
	readable,
	database
}// date_format;

export enum tag_types {
	select = "select",
	text = "text",
	textarea = "textarea",
	date = "date",
}// tag_types;

globalThis.form_items = "input, select, textarea";

globalThis.currency_decimals = 4;
globalThis.numeric_decimals = 6;

globalThis.comma = ",";
globalThis.underscore = "_";

globalThis.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
globalThis.action_keys = ["Enter", "Tab", "ArrowLeft", "ArrowRight", "Home", "End", "Backspace", "Delete", "Escape"];
globalThis.control_keys = ["c", "v", "a"]; // use in conjunction with ctrl key


globalThis.key_name =  (field: DataKey) => String.isString (field) ? (field as string) : Object.keys (field) [0];


globalThis.is_empty = (value: any): boolean => isset (value) && ((String.isString (value) && (value == String.Empty)) || (Array.isArray (value) && (value.length == 0)));
globalThis.not_empty = (value: any): boolean => !is_empty (value);

globalThis.isset = (value: any): boolean => not_null (value) && (value != undefined);
globalThis.not_set = (value: any): boolean => !isset (value);

globalThis.is_null = (value: any): boolean => (value == null);
globalThis.not_null = (value: any): boolean => !is_null (value);

globalThis.is_defined = (value: any): boolean => isset (value) && not_empty (value);
globalThis.not_defined = (value: any): boolean => !is_defined (value);

globalThis.conditional = (condition: boolean, output: any): string => condition ? output : String.Empty;
