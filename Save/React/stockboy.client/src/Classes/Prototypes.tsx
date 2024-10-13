import React, { Component, DOMAttributes } from "react";
import { date_format } from "Classes/Globals";


export {}


declare global {

	interface Array<T> {
		add (value: T): Array<T>;
		append (value: T): Array<T>;
		contains (value: any): boolean;
		empty (): boolean;
		getIntegers (allow_non_numeric?: boolean): Array<number>;
	}// Array<T>;


	interface DateConstructor {
		format (date_value: string | Date, format?: date_format): string;
		today (format?: date_format): string;
		current_date (): Date;
	}// DateConstructor;


	interface Date {
		timestamp (): number;
	}// Date;


	interface Element{
		hasClass (class_name: string): boolean;
	}// Element;


	interface FormData {
		remove_empties ();
	}// FormData;


	interface HTMLElement {
		hasClass (class_name: string): boolean;
		numericInput (): boolean;
		setClass (value: String, condition: Boolean);
	}// HTMLElement;


	interface HTMLDivElement {
		form_data ();
	}// HTMLDivElement;


	interface HTMLInputElement {
		pad_decimals (quantity: number);
		set_commas ();
		clear_commas ();
		valid_keystroke (event: KeyboardEvent);
	}// HTMLInputElement;


	interface NumberConstructor {
		isNumber (candidate: any): boolean;
	}// NumberConstructor;


	interface Number {
		length: number;
		number_format (decimal_places: number): string;
		round_to (decimal_places: number): number;
		truncate_to (decimal_places: number): number;
	}// Number;


	interface Object {
		copy (...candidates: Object []): Object;
		isCurrency (): boolean;
		isNumeric (): boolean;
		matches (candidate: Object): boolean;
		merge (...candidates: Object []): Object;
	}// Object;


	interface StringConstructor {
		isString (candidate: any): boolean;
	}// StringConstructor;


	interface StringConstructor {
		Empty: string;
		Space: string;
	}// StringConstructor;


	interface String {
		contains (substring: string): boolean;
		integerValue (): number;
		isInteger (): boolean;
		leadingCharacters (char: string)
		matches (candidate: string): boolean;
		parseNumeric (): string;
		parts (delimiter: string, minimum: number, maximum: number): Array<string>;
		strip_non_numeric ();
		titleCase (strip_spaces?: boolean): string;
		trimmedEnd (value: string): string;
	}// String;

}// declare global;


declare module "react" {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		commas?: string;
		decimalPlaces?: number;
		leadingZeros?: boolean;
		negativeNumbers?: string;
	}// HTMLAttributes;

}// react;


/**** Array Prototype Functions ****/


Object.defineProperty (Array.prototype, "empty", {
	get: function () { return this.length == 0 }
});


Array.prototype.add = function<T> (value: T): Array<T> {
	return (this.contains (value)) ? this : this.append (value);
}// add;


Array.prototype.append = function<T> (value: T): Array<T> {
	this.push (value);
	return this;
}// append;


Array.prototype.contains = function (value: any) { return this.indexOf (value) > -1 };


Array.prototype.getIntegers = function (allow_non_numeric: boolean = false): Array<number> {

	let result: Array<number> = null;

	this.forEach ((value: string) => {

		if (value == String.Empty) value = "0";
		if (!value.isInteger () && !allow_non_numeric) throw `Invalid value in Array.prototype.getNumbers: ${value}`;
		if (is_null (result)) result = new Array<number> ();

		result.push (parseInt (value));

	});

	return result;

}// getIntegers;


/**** React Component Prototype Functions ****/


let nativeSetState = Component.prototype.setState;

Component.prototype.setState = function (state: any, callback?: () => void): boolean | Promise<boolean> {
	nativeSetState.call (this, state, callback);
	return true;
}// setState;


/**** Date Prototype Functions ****/


Date.format = function (date_value: string | Date, format: date_format = date_format.readable): string {

	if (is_null (date_value)) return null;

	let date: Date = (date_value instanceof Date) ? date_value : new Date (date_value);

	if (format == date_format.readable) return `${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}-${date.getFullYear ()}`;
	if (format == date_format.database) return `${date.getFullYear ()}-${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}`;

	return date.toDateString ();

}// Date.format;


Date.today = function (format: date_format = date_format.readable): string { return Date.format (new Date (), format); }


Date.current_date = function (): Date { return new Date () }


Date.prototype.timestamp = function (): number { return this.valueOf () }


/**** Element Prototype Functions ****/


Element.prototype.hasClass = function (class_name: string): boolean { return this.classList.contains (class_name); }


/**** FormData Prototype Functions ****/


FormData.prototype.remove_empties = function () {

	let form_data = null;

	this.forEach ((value: FormDataEntryValue, key: string) => {
		if (is_defined (value)) {
			if (is_null (form_data)) form_data = new FormData ();
			form_data.append (key, value);
		}// if;
	});

	return form_data;

}// remove_empties;


/**** HTMLElement Prototype Functions ****/


HTMLElement.prototype.numericInput = function () {
	return (this.tagName.toLowerCase () == "input") && (["numeric", "currency"].contains (this.getAttribute ("type")));
}// numericInput;


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;


/**** HTMLDivElement Prototype Functions ****/


HTMLDivElement.prototype.form_data = function (): FormData {

	let elements = this.querySelectorAll ("select");
	let result: FormData = new FormData ();

	elements.forEach (element => {
		result.append (element.id, element.value);
	});

	return result;

}// form_data;


/**** HTMLInputElement Prototype Functions ****/


HTMLInputElement.prototype.pad_decimals = function (quantity: number) {

	let parts: Array<string> = this.value.split (".");

	if (parts.length == 1) parts.push (String.Empty); // No decimals. Add it.
	if (parts [0].trim ().length == 0) parts [0] = "0";

	while (parts [1].length < quantity) parts [1] += "0";
	this.value = parts.join (".");

}// pad_decimals;


HTMLInputElement.prototype.set_commas = function () {

	let number = String.Empty;
	let parts = this.value.split (".");
	let negative = parts [0][0] == "-";

	if (negative) parts [0] = parts [0].substring (1);

	for (let i = 0; i < parts [0].length; i++) {
		number = `${parts [0][parts [0].length - (i + 1)]}${((i > 0) && ((i % 3) == 0)) ? comma : String.Empty}${number}`;
	}// for;

	this.value = `${negative ? "-" : String.Empty}${number}${(parts.length > 1) ? "." + parts [1] : String.Empty}`;
	
}// set_commas;


HTMLInputElement.prototype.clear_commas = function () {

	let parts = this.value.split (".");
	let negative = parts [0][0] == "-";

	if (negative) parts [0] = parts [0].substring (1);

	this.value = `${negative ? "-" : String.Empty}${parts [0].parseNumeric ()}${(parts.length > 1) ? "." + parts [1] : String.Empty}`;

}// clear_commas;


HTMLInputElement.prototype.valid_keystroke = function (event: KeyboardEvent) {

	let decimal_places: number = (this.getAttribute ("type") == "currency") && !this.hasAttribute ("decimalPlaces") ? currency_decimals : (this.getAttribute ("decimalPlaces")?.integerValue () ?? 0);
	let leading_zeros: number = this.getAttribute ("leadingZeros")?.integerValue () ?? 0;
	let negative_numbers: boolean = this.getAttribute ("negativeNumbers")?.toLowerCase () == "true";

	let value = `${this.value.substring (0, this.selectionStart)}${event.key}${this.value.substring (this.selectionEnd)}`;

	if (action_keys.contains (event.key)) return true; // allow permissable control keys: tab, delete, backspace etc. (see control keys in Globals.tsx for details)
	if (control_keys.contains (event.key) && event.ctrlKey) return true; // allow copy/paste/select all

	if (value.trim () != value) return event.preventDefault (); // leading or trailing spaces are not allowed
	if (!digits.includes (parseInt (value [0])) && (value [0] != "-")) return event.preventDefault (); // leading garbage
	if ((value [0] == "-") && !negative_numbers) return event.preventDefault (); // negative numbers not allowed

	let parts = value.split (".");

	if ((parts.length > 2) || ((parts.length > 1) && (decimal_places == 0))) return event.preventDefault (); // too many decimal points or decimals not allowed
	if ((parts.length == 2) && (((parts [1] != String.Empty) && !parts [1].isInteger) || (parts [1].length > decimal_places))) return event.preventDefault (); // garbage in decimal section or too many decimal places

	if (parts [0][0] == "-") parts [0] = parts [0].substring (1);

	if ((parts [0] != "0") && (parts [0].leadingCharacters ("0") > leading_zeros)) return event.preventDefault (); // too many leading zeros
	if ((parts [0] != String.Empty) && !parts [0].isInteger ()) return event.preventDefault (); // garbage in number section

	return true;

}// valid_keystroke;


/**** Number Prototype Functions ****/


Object.defineProperties (Number.prototype, {
	length: {
		get: function () { return this.toString ().length }
	}// length;
});


Number.isNumber = function (candidate: any) {
	return typeof (candidate) == "number";
}// isNumber;


Number.prototype.number_format = function (decimal_places: number): string {
	let parts = this.toString ().split (".");
	if (parts.length == 1) parts.push ("00");
	parts [1] = parts [1].padEnd (decimal_places, "0").substring (0, decimal_places).toString ();
	return parts.join (".");
}// number_format;


Number.prototype.round_to = function (decimal_places: number): number {
	return Math.round ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// round_to;


Number.prototype.truncate_to = function (decimal_places: number): number {
	return Math.trunc ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// truncate_to;


/**** Object Prototype Functions ****/


Object.prototype.copy = function (...candidates: Object []): Object {

	candidates.forEach (candidate => {
		Object.assign (this, candidate);
	});

	return this;

}// copy;


Object.prototype.matches = function (candidate: Object) { return JSON.stringify (this) == JSON.stringify (candidate) }


Object.prototype.merge = function (...candidates: Object []): Object {

	candidates.forEach (item => {
		Object.keys (this).forEach (key => {
			if (not_set (item [key])) return;
			this [key] = item [key];
		});
	});

	return this;

}// merge;


Object.defineProperties (Object.prototype, {

	isCurrency: { 
		get: function () {
			return ((this instanceof HTMLInputElement) && (this.getAttribute ("type").toLowerCase () == "currency"));
		}// get;
	},// isCurrency;

	isNumeric: {
		get: function () {
			return ((this instanceof HTMLInputElement) && (this.getAttribute ("type").toLowerCase () == "numeric"));
		}// get;
	}// isNumeric;

});


/**** String Prototype Functions ****/


String.Empty = "";
String.Space = " ";


String.isString = function (candidate: any) { return typeof candidate == "string" }


String.prototype.contains = function (substring: string) { return this.indexOf (substring) > -1 }


String.prototype.integerValue = function () {
	let result = parseInt (this.toString ());
	return (result.toString () == this) ? result : 0;
} // integer_value;


String.prototype.isInteger = function () { 

	for (let char of this) {
		if (!digits.includes (parseInt (char))) return false;
	}// for;

	return true;

}// isInteger;


String.prototype.leadingCharacters = function (char: string): number {

	let result: number = 0;
	let value: String = this;

	while ((value.length > 0) && (value [0] == char)) {
		result++;
		value = value.substring (1);
	}// while;

	return result;

}// leadingCharacters;


String.prototype.matches = function (candidate: string) {
	return this.toLowerCase ().trim () == candidate.toLowerCase ().trim ();
}// matches;


String.prototype.parseNumeric = function () {

	let result: string = String.Empty;

	for (let char of this) {
		if (digits.includes (parseInt (char))) result += char;
	}// for;

	return result;

}// parseNumeric;


String.prototype.parts = function (delimiter: string, minimum: number = null, maximum: number = null): Array<string> {

	let result: Array<string> = this.split (delimiter);

	if (is_null (minimum)) return result;
	if (is_null (maximum)) maximum = minimum;

	if ((result.length < minimum) || (result.length > maximum)) {
		let expectation = (minimum == maximum) ? minimum : `at least ${minimum} and as many as ${maximum}`;
		throw `Invalid number of parts for ${this}. Expected ${expectation}. Found ${result.length}`;
	}// if;

	return result;

}// parts;


String.prototype.strip_non_numeric = function (): String {

	let result = String.Empty;

	for (let index = 0; index < this.length; index++) {
		if ((this [index] == "-") && (index == 0)) { result += this [index]; continue; }
		if ((this [index] == ".") && (!result.contains ("."))) { result += this [index]; continue; }
		if (digits.contains (parseInt (this [index]))) result += this [index];
	}// for;

	return result;

}// strip_non_numeric;


String.prototype.titleCase = function (strip_spaces: boolean = false): string {

	let words: String [] = this.replace (underscore, String.Space).split (String.Space);
	let result: String [] = new Array ();

	words.forEach (word => {
		word = word.trim ();
		result.push (`${word.substring (0, 1).toUpperCase ()}${word.substring (1).toLowerCase ()}`);
	});

	return result.join (strip_spaces? String.Empty : String.Space);

}// titleCase;


String.prototype.trimmedEnd = function (value: string): string {

	let new_value = this.toString ();

	while (new_value.endsWith (value)) new_value = new_value.substring (0, new_value.lastIndexOf (value) - 1);
	return new_value;

}// trimmedEnd;