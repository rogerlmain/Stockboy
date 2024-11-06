import { DateFormats } from "Classes/Globals";
import { Component } from "react";


export { };


declare global {

	interface Array<T> {

		add (value: T): Array<T>
		append (value: T): Array<T>
		assign (template: Array<any>, data_type: any): Array<T>
		contains (value: any): boolean
		getDates (fieldname: string): Array<Date>
		getIntegers (allow_non_numeric?: boolean): Array<number>
		remove (value: T): Array<T>
		sorted (fieldname: string): Array<T>

		//get duplicate (): Array<T>
		get empty (): boolean

	}// Array<T>;


	interface DateConstructor {
		format (date_value: string | Date, format?: DateFormats): string;
		today (format?: DateFormats): string;
		current_date (): Date;
		earlier (value: Date);
		later (value: Date);
	}// DateConstructor;


	interface Date {
		timestamp (): number;
		toUnix (): number;
	}// Date;


	interface Element{
		hasClass (class_name: string): boolean;
	}// Element;


	interface FormData {
		get_data (): FormData;
	}// FormData;


	interface HTMLElement {

		setClass (value: String, condition: Boolean): void;
		styleSelector (style: string, value: string): HTMLElement;

		get tagType (): string;
		get totalWidth (): number;
		get totalHeight (): number;

	}// HTMLElement;


	interface HTMLDivElement {
		form_data ();
	}// HTMLDivElement;


	interface NumberConstructor {
		isNumber (candidate: any): boolean;
	}// NumberConstructor;


	interface Number {

		format (decimal_places: number): string;
		round_to (decimal_places: number): number;
		truncate_to (decimal_places: number): number;

		get length (): number;

	}// Number;


	interface Object {

		assign (template: any): any;
		copy (...candidates: Object []): Object;
		hasKey (key_name: string): boolean;
		matches (candidate: any): boolean;
		merge (...candidates: Object []): Object;

		get Duplicate (): any;
		get GetType (): string;
		get Keys (): StringArray;
		get NoData (): boolean;
		get Replica (): any;

	}// Object;


	interface StringConstructor {

		Empty: string;
		Space: string;
		Comma: string;

		isString (candidate: any): boolean;

	}// StringConstructor;


	interface String {

		contains (substring: string): boolean;
		isInteger (): boolean;
		leadingCharacters (char: string)
		matches (candidate: string): boolean;
		parseInt (): number;
		parseNumeric (): string;
		parts (delimiter: string, minimum: number, maximum: number): StringArray;
		plural (count: number): string;
		titleCase (strip_spaces?: boolean): string;
		trimmedStart (value: string);
		trimmedEnd (value: string);
		trimmed (value: string): string;
		get null_value (): string;

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


Array.prototype.add = function<T> (value: T): Array<T> {
	if (!this.contains (value)) this.push (value);
	return this;
}// add;


Array.prototype.append = function<T> (value: T): Array<T> {
	let new_array = this.Duplicate;
	new_array.push (value);
	return new_array;
}// append;


Array.prototype.assign = function (template: Array<any>, data_type: any): Array<any> {

	let result: Array<any> = null;

	template.forEach (item => {
		if (is_null (result)) result = new Array<any> ();
		result.push (new data_type ().assign (item));
	});

	return result;

}// assign;


Array.prototype.contains = function (value: any) { return this.indexOf (value) > -1 };


Array.prototype.getDates = function (fieldname: string): Array<Date> {

	let result: Array<Date> = null;

	this.forEach (item => {
		if (not_set (item [fieldname])) return;
		if (is_null (result)) result = new Array<Date> ();
		if (!["string", "Date"].contains (typeof item [fieldname])) throw ("Invalid data type in getDates");
		result.push ((typeof (item [fieldname]) == "string") ? new Date (item [fieldname]) : item [fieldname]);
	});

	return result;

}// getDates;


Array.prototype.getIntegers = function (allow_non_numeric: boolean = false): Array<number> {

	let result: Array<number> = null;

	this.forEach ((value: string) => {

		if (value == String.Empty) value = "0";
		if (!value.isInteger () && !allow_non_numeric) {
			throw `Invalid value in Array.prototype.getIntegers: ${value}`;
		}
		if (is_null (result)) result = new Array<number> ();

		result.push (value.parseInt () ?? 0);

	});

	return result;

}// getIntegers;


Array.prototype.remove = function<T> (value: T): Array<T> {
	this.splice (this.indexOf (value), 1);
	return this;
}// remove;


Array.prototype.sorted = function<T> (fieldname: string): Array<T> {
	let result: Array<T> = this.toSorted ((previous: Object, next: Object) => next [fieldname] < previous [fieldname] ? 1 : -1);
	return result;
}// sorted;


Object.defineProperties (Array.prototype, {
	//duplicate: { get: function () { return JSON.parse (JSON.stringify (this)) } },
	empty: { get: function () { return this.length == 0 } },
});


/**** React Component Prototype Functions ****/


let nativeSetState = Component.prototype.setState;

Component.prototype.setState = function (state: any, callback?: () => void): boolean | Promise<boolean> {
	nativeSetState.call (this, state, callback);
	return true;
}// setState;


/**** Date Extension Functions ****/


Date.format = function (date_value: string | Date, format: DateFormats = DateFormats.readable): string {

	if (is_null (date_value)) return null;

	let date: Date = (date_value instanceof Date) ? date_value : new Date (date_value);

	if (format == DateFormats.readable) return `${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}-${date.getFullYear ()}`;
	if (format == DateFormats.database) return `${date.getFullYear ()}-${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}`;

	return date.toDateString ();

}// Date.format;


Date.today = function (format: DateFormats = DateFormats.readable): string { return Date.format (new Date (), format); }


Date.current_date = function (): Date { return new Date () }


Date.earlier = function (value: String | Date): boolean {
	if (typeof value == "string") value = new Date (value as string);
	let result: boolean = (value as Date) < new Date ();
	return result;
}// earlier;


Date.later = function (value: String | Date): boolean {
	if (typeof value == "string") value = new Date (value as string);
	let result: boolean = (value as Date) > new Date ();
	return result;
}// later;


/**** Date Prototype Functions ****/


Date.prototype.timestamp = function (): number { return this.valueOf () }


Date.prototype.toUnix = function (): number { return this.getTime () / 1000 }


/**** Element Prototype Functions ****/


Element.prototype.hasClass = function (class_name: string): boolean { return this.classList.contains (class_name); }


/**** FormData Prototype Functions ****/


// Removes empty elements from FormData
FormData.prototype.get_data = function (): FormData {

	let form_data = null;

	this.forEach ((value: FormDataEntryValue, key: string) => {
		if (is_defined (value)) {
			if (is_null (form_data)) form_data = new FormData ();
			form_data.append (key, value);
		}// if;
	});

	return form_data;

}// get_data;


/**** HTMLElement Prototype Functions ****/


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;


HTMLElement.prototype.styleSelector = function (style: string, value: string): HTMLElement {

	for (let child of this.childNodes) {

		let next_child: HTMLElement = (child as HTMLElement);

		if (next_child.style [style].matches (value)) return next_child;
		return next_child.styleSelector (style, value);

	}// for;

	return null;

}// styleSelector;


Object.defineProperties (HTMLElement.prototype, {
	tagType: {
		get: function (): string {
			if (this.tagName == "INPUT") return this.getAttribute ("type").toLowerCase ();
			return this.tagName.toLowerCase ();
		}// tagType;
	},

	totalWidth: {
		get: function (): number { 
			let style = window.getComputedStyle (this);
			return this.offsetWidth + parseInt (style.marginLeft) + parseInt (style.marginRight)
		}
	},

	totalHeight: {
		get: function (): number { 
			let style = window.getComputedStyle (this);
			return this.offsetWidth + parseInt (style.marginTop) + parseInt (style.marginBottom)
		}
	}

});


/**** HTMLDivElement Prototype Functions ****/


HTMLDivElement.prototype.form_data = function (): FormData {

	let elements = this.querySelectorAll ("select");
	let result: FormData = new FormData ();

	elements.forEach (element => {
		result.append (element.id, element.value);
	});

	return result;

}// form_data;


/**** Number Prototype Functions ****/


Number.isNumber = function (candidate: any) {
	return typeof (candidate) == "number";
}// isNumber;


Number.prototype.format = function (decimal_places: number): string {
	let parts = this.toString ().split (".");
	if (parts.length == 1) parts.push ("00");
	parts [1] = parts [1].padEnd (decimal_places, "0").substring (0, decimal_places).toString ();
	return parts.join (".");
}// format;


Number.prototype.round_to = function (decimal_places: number): number {
	return Math.round ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// round_to;


Number.prototype.truncate_to = function (decimal_places: number): number {
	return Math.trunc ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// truncate_to;


Object.defineProperties (Number.prototype, {
	length: {
		get: function () { return this.toString ().length }
	}// length;
});


/**** Object Prototype Functions ****/


Object.prototype.assign = function (template: any): any {
	return Object.assign (this, template);
}// assign;


Object.prototype.copy = function (...candidates: Object []): Object {

	candidates.forEach (candidate => {
		Object.assign (this, candidate);
	});

	return this;

}// copy;


Object.prototype.hasKey = function (key_name: string): boolean {
	return Object.keys (this).contains (key_name);
}// hasKey;


Object.prototype.matches = function (candidate: any) { return JSON.stringify (this) == JSON.stringify (candidate) }


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

	Duplicate: { get: function (): any { return this.Replica.assign (this) } },
	GetType: { get: function (): string { return Object.getPrototypeOf (this).constructor.name } },
	Keys: { get: function (): StringArray { return Object.keys (this) } },
	NoData: { get: function (): boolean { return this.hasKey ("data") && (this.data == no_data) } },
	Replica: { get: function (): any { return Object.create (Object.getPrototypeOf (this)) } },

});


/**** String Prototype Functions ****/


String.Empty = "";
String.Space = " ";
String.Comma = ",";


String.isString = function (candidate: any) { return typeof candidate == "string" }


String.prototype.contains = function (substring: string) { return this.indexOf (substring) > -1 }


String.prototype.isInteger = function () {

	for (let char of this) {
		if (char == "-") continue;
		if (!digits.contains (parseInt (char))) return false;
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


String.prototype.parseInt = function (): number {
	return (~~this).toString () == this ? ~~this : null;
}// parseInt;


String.prototype.parseNumeric = function (allow_negatives: boolean = true, allow_decimals: boolean = true) {

	let result = String.Empty;

	for (let index = 0; index < this.length; index++) {
		if (allow_negatives && (this [index] == "-") && (index == 0)) { result += this [index]; continue; }
		if (allow_decimals && (this [index] == ".") && (!result.contains ("."))) { result += this [index]; continue; }
		if (digits.contains (parseInt (this [index]))) result += this [index];
	}// for;

	return result;

}// parseNumeric;


String.prototype.parts = function (delimiter: string, minimum: number = null, maximum: number = null): StringArray {

	let result: StringArray = this.split (delimiter);

	if (is_null (minimum)) return result;
	if (is_null (maximum)) maximum = minimum;

	if ((result.length < minimum) || (result.length > maximum)) {
		let expectation = (minimum == maximum) ? minimum : `at least ${minimum} and as many as ${maximum}`;
		throw `Invalid number of parts for ${this}. Expected ${expectation}. Found ${result.length}`;
	}// if;

	return result;

}// parts;


String.prototype.plural = function (count: number): string { return (count != 1 ? `${this}s` : this.toString ()) }


String.prototype.titleCase = function (strip_spaces: boolean = false): string {

	let words: String [] = this.replaceAll (underscore, String.Space).split (String.Space);
	let result: String [] = new Array ();

	words.forEach (word => {
		word = word.trim ();
		result.push (`${word.substring (0, 1).toUpperCase ()}${word.substring (1).toLowerCase ()}`);
	});

	return result.join (strip_spaces ? String.Empty : String.Space);

}// titleCase;


String.prototype.trimmedStart = function (value: string = String.Empty): string {

	let new_value = this.toString ();

	while (new_value.startsWith (value)) new_value = new_value.substring (1);
	return new_value;

}// trimmedStart;


String.prototype.trimmedEnd = function (value: string = String.Empty): string {

	let new_value = this.toString ();

	while (new_value.endsWith (value)) new_value = new_value.substring (0, new_value.lastIndexOf (value));
	return new_value;

}// trimmedEnd;


String.prototype.trimmed = function (value: string = String.Empty) {
	return this.trimmedStart (value).trimmedEnd (value);
}// trimmed;


Object.defineProperty (String.prototype, "null_value", {
	get: function (): string { return (this.trim () == String.Empty) ? null : this }
})