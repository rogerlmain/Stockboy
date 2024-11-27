import PopupWindow from "Controls/Common/Windows/PopupWindow";
import { DOMAttributes } from "react";


export {};


/**** Application Specific Definitions ****/


declare global {
	var popup_window: PopupWindow;
	var local_host: Boolean;
}// global;


globalThis.popup_window = null;
globalThis.local_host = window.location.hostname == "localhost";


/**** Generic Global Definitions ****/


declare module "react" {
	interface HTMLAttributes<T> extends DOMAttributes<T> {
		name?: String;
	}// HTMLAttributes;
}// globals;


declare global {

	var form_fields: string;
	var form_items: string;

	var currency_decimals: number;
	var numeric_decimals: number;

	var comma: string;
	var underscore: string;

	var digits: Array<number>;
	var action_keys: StringArray;
	var control_keys: StringArray;

	var no_data: string;

	var key_name: Function;

	var is_empty: Function;
	var not_empty: Function;

	var isset: Function;
	var not_set: Function;

	var is_null: Function;
	var not_null: Function;

	var is_defined: Function;
	var not_defined: Function;

	var is_undefined: Function;

	var conditional: Function;

	var event_handler: EventTarget;

}// global;


export enum DateFormats {
	readable,
	database
}// DateFormats;


export enum HoldingsStatus {
	live = "Live",
	dead = "Dead",
	defunct = "Defunct",
}// HoldingsStatus;


globalThis.form_items = "input, select, textarea";
globalThis.form_fields = "input:not([type='hidden']), select, textarea";

globalThis.currency_decimals = 4;
globalThis.numeric_decimals = 6;

globalThis.comma = ",";
globalThis.underscore = "_";

globalThis.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
globalThis.action_keys = ["Enter", "Tab", "ArrowLeft", "ArrowRight", "Home", "End", "Backspace", "Delete", "Escape"];
globalThis.control_keys = ["c", "v", "a"]; // use in conjunction with ctrl key

globalThis.no_data = "No data available";

globalThis.is_empty = (value: any): boolean => (String.isString (value) && (value == String.Empty)) || (Array.isArray (value) && (value.length == 0));
globalThis.not_empty = (value: any): boolean => !is_empty (value);

globalThis.isset = (value: any): boolean => not_null (value) && (value != undefined);
globalThis.not_set = (value: any): boolean => !isset (value);

globalThis.is_null = (value: any): boolean => (value === null);
globalThis.not_null = (value: any): boolean => !is_null (value);

globalThis.is_defined = (value: any): boolean => isset (value) && not_empty (value);
globalThis.not_defined = (value: any): boolean => !is_defined (value);

globalThis.is_undefined = (value: any): boolean => value == undefined;

globalThis.conditional = (condition: boolean, output: any): string => condition ? output : String.Empty;


globalThis.event_handler = new EventTarget ();


