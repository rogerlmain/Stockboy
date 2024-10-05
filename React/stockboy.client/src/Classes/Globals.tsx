import React, { ReactElement } from "react";
import { NameValueCollection } from "Classes/Collections";


export {}


declare global {

	var comma: string;
	var underscore: string;

	var digits: Array<number>;
	var control_keys: Array<string>;

	var isset: Function;
	var not_set: Function;

	var coalesce: Function;

	var is_null: Function;
	var not_null: Function;

	var inject_element: Function;

}// global;


export enum date_format {
	readable,
	database
}// date_format;


globalThis.comma = ",";
globalThis.underscore = "_";

globalThis.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
globalThis.control_keys = ["Enter", "Tab", "ArrowLeft", "ArrowRight", "Home", "End", "Backspace", "Delete", "Escape"];

globalThis.isset = (value: any): Boolean => not_null (value) && (value != undefined);
globalThis.not_set = (value: any): Boolean => !isset (value);

globalThis.is_null = (value: any): Boolean => (value == null);
globalThis.not_null = (value: any): Boolean => !is_null (value);


// Find the first non-null value in a list
globalThis.coalesce = (...options: Array<any>) => {

	for (let index = 0; index < options.length; index++) {
		if (isset (options [index])) return options [index];
	}// for;

	return null;

}// coalesce;


globalThis.inject_element = (parent: ReactElement, new_element: ReactElement, criteria: NameValueCollection<string>, match_any: boolean = true): ReactElement => {

	let child_list: Array<any> = new Array<any> ();

	let has_criteria = element => {

		for (let criterion of Object.keys (criteria)) {

			let has_key = Object.keys (element.props).contains (criterion);
			let has_value = element.props [criterion] == criteria [criterion];

			if ((match_any) && (has_key) && (has_value)) return true;
			if (!(has_key && has_value)) return false;

		}// for;

		return true;

	}// has_criteria;

	let children = Array.isArray (parent.props.children) ? parent.props.children : [parent.props.children];

	children.forEach ((child: string | ReactElement) => {
		if (String.isString (child)) return child_list.push (child);
		child_list.push (inject_element (child as ReactElement, new_element, criteria, match_any));
	});

	if (has_criteria (parent)) child_list.push (new_element)

	return React.cloneElement (parent, parent.props, ...child_list);

}// insert_element;
