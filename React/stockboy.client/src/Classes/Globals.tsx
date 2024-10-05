import React, { ReactElement } from "react";
import { NameValueCollection } from "Classes/Collections";


export {}


declare global {

	var comma: string;
	var underscore: string;

	var digits: Array<number>;
	var control_keys: Array<string>;

	var is_empty: Function;
	var not_empty: Function;

	var isset: Function;
	var not_set: Function;

	var is_null: Function;
	var not_null: Function;

	var is_defined: Function;
	var not_defined: Function;

}// global;


export enum date_format {
	readable,
	database
}// date_format;


globalThis.comma = ",";
globalThis.underscore = "_";

globalThis.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
globalThis.control_keys = ["Enter", "Tab", "ArrowLeft", "ArrowRight", "Home", "End", "Backspace", "Delete", "Escape"];

globalThis.is_empty = (value: any): Boolean => isset (value) && ((String.isString (value) && (value == String.Empty)) || (Array.isArray (value) && (value.length == 0)));
globalThis.not_empty = (value: any): Boolean => !is_empty (value);

globalThis.isset = (value: any): Boolean => not_null (value) && (value != undefined);
globalThis.not_set = (value: any): Boolean => !isset (value);

globalThis.is_null = (value: any): Boolean => (value == null);
globalThis.not_null = (value: any): Boolean => !is_null (value);

globalThis.is_defined = (value: any): Boolean => isset (value) && not_empty (value);
globalThis.not_defined = (value: any): Boolean => !is_defined (value);


