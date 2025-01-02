import PopupWindow from "Controls/Common/Windows/PopupWindow";


export { };


/**** Generic Global Definitions ****/


declare module "react" {

	interface HTMLAttributes<T> extends DOMAttributes<T> {
		name?: String;
	}// HTMLAttributes;

}// globals;


declare global {

	var popup_window: PopupWindow;
	var local_host: Boolean;

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

	var not_empty: Function;
	var is_empty: Function;

	var is_undefined: Function;

	var conditional: Function;

	var get_width: Function;

	var event_handler: EventTarget;

	var clearStorage: Function;

	interface Window {
		debugging: boolean;
	}// Window;

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


globalThis.popup_window = null;
globalThis.local_host = window.location.hostname == "localhost";


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

globalThis.is_undefined = (value: any): boolean => value === undefined;
globalThis.not_undefined = (value: any): boolean => !is_undefined (value);

globalThis.is_null = (value: any): boolean => (value === null);
globalThis.not_null = (value: any): boolean => !is_null (value);

globalThis.isset = (value: any): boolean => not_null (value) && (value != undefined);
globalThis.not_set = (value: any): boolean => !isset (value);

globalThis.is_empty = (value: any): boolean => not_set (value) || (String.isString (value) && (value == String.Empty)) || (Array.isArray (value) && (value.length == 0));
globalThis.not_empty = (value: any): boolean => !is_empty (value);

globalThis.conditional = (condition: boolean, output: any): string => condition ? output : String.Empty;


globalThis.get_width = (candidate: HTMLElement) => {

	let element: HTMLElement = candidate.cloneNode (true) as HTMLElement;
	let result: number = 0;

	element.style.visibility = "hidden";
	element.style.position = "absolute";
	element.style.display = "block";

	candidate.parentNode.appendChild (element);

	result = element.offsetWidth;

	candidate.parentNode.removeChild (element);

	return result;

}// get_width;


globalThis.event_handler = new EventTarget ();


globalThis.clearStorage = function (name: string) { 
	localStorage.removeItem (name);
	sessionStorage.removeItem (name);
}// clearStorage;


Object.defineProperties (window, {
	debugging: { get: () => window.location.hostname == "localhost" }
});