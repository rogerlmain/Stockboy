import { DateFormats } from "Classes/Common/Globals";
import { Component } from "react";


export { };


declare global {

	interface Array<T> {

		add (value: T): Array<T>
		append (value: T): Array<T>
		assign (template: AnyArray, data_type?: any): Array<T>
		contains (value: any): boolean
		getDates (fieldname: string): Array<Date>
		list (fieldname: string): AnyArray
		remove (value: T): Array<T>
		sorted (fieldname: string): Array<T>
		update<TModel> (value: TModel, fieldname: string): Array<T>

		get duplicate (): Array<T>
		get empty (): boolean

	}// Array<T>;


	interface DateConstructor {
		current_date (): Date;
		earlier (value: Date);
		format (date_value: StringDate, format?: DateFormats): string;
		isDate (candidate: any): boolean;
		later (value: Date);
		month_name (month: number): string;
		today (format?: DateFormats): string;
		weekday_name (day: number): string;
	}// DateConstructor;


	interface Date {
		appended_day (): string;
		format (template: string): string;
		timestamp (): number;
		toUnix (): number;
	}// Date;


	interface Element{
		hasClass (class_name: string): boolean;
	}// Element;


	interface FormData {
		get sanitized (): Object;
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
		padded (digits: number): string;
		padFractions (decimal_places: number);
		round_to (decimal_places: number): number;
		truncate_to (decimal_places: number): number;

		get length (): number;

	}// Number;


	interface ObjectConstructor {

		isFunction (candidate: any): boolean;
		isObject (candidate: any): boolean;
		isObjectLike (candidate: any): boolean;

		notObject (candidate: any): boolean;
		notObjectLike (candidate: any): boolean;

	}// ObjectConstructor;


	interface Object {

		assign (template: any): any;
		copy (...candidates: Object []): Object;
		hasKey (key_name: string): boolean;
		matches (candidate: any): boolean;
		merge (...candidates: Object []): Object;
		toJson (): string;

		get duplicate (): any;
		get GetType (): Function;
		get GetTypeName (): string;
		get Keys (): StringArray;
		get NoData (): boolean;
		get Pristine (): boolean;
		get Replica (): any;

	}// Object;


	interface StringConstructor {

		Empty: string;
		Space: string;
		Comma: string;

		isString (candidate: any): boolean;

	}// StringConstructor;


	interface String {

		contains (candidate: string): boolean;
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

		get cleaned (): string;
		get null_value (): string;
		get isBoolean (): boolean;
		get isNumeric (): boolean;
		get isInteger (): boolean;
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
	let new_array: Array<T> = this.duplicate;
	new_array.push (value);
	return new_array;
}// append;


Array.prototype.assign = function (template: AnyArray, data_type: any /* Deprecated - use TypedArray instead */): AnyArray {

	let result: AnyArray = null;

	if (is_null (data_type)) data_type = this ["type"];

	if (isset (template)) template.forEach (item => {
		if (is_null (result)) result = new Array<any> ();
		result.push (not_set (data_type) ? new Object ().assign (item) : new data_type ().assign (item));
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


Array.prototype.list = function (fieldname: string): AnyArray {

	let result = null;

	this.forEach ((item: any) => {
		if (is_null (result)) result = new Array<any> ();
		result.push (item [fieldname]);
	});

	return result;

}// list;


Array.prototype.remove = function<T> (value: T): Array<T> {
	if (isset (value)) this.splice (this.indexOf (value), 1);
	return this;
}// remove;


Array.prototype.sorted = function<T> (fieldname: string): Array<T> {
	let result: Array<T> = this.toSorted ((previous: Object, next: Object) => next [fieldname] < previous [fieldname] ? 1 : -1);
	return result;
}// sorted;


Array.prototype.update = function<TModel> (value: TModel, fieldname: string = "id"): Array<TModel> {

	let item: TModel = null;

	for (item of this) {
		if (item [fieldname] == value [fieldname]) {
			this.splice (this.indexOf (item), 1);
			break;
		}// if;
	}// for;

	this.push (value);
	return this;

}// update;


Object.defineProperties (Array.prototype, {
	duplicate: { get: 
		function () {
	
			let new_array: Array<any> = null;

			this.forEach ((item: any) => {
				if (is_null (new_array)) new_array = new Array<any> ();
				new_array.push (item.duplicate);
			});

			return new_array;

		}// duplicate;
	},

	empty: { get: function () { return this.length == 0 } },
});


/**** React Component Prototype Functions ****/


let nativeSetState = Component.prototype.setState;

Component.prototype.setState = function (state: any, callback?: Callback): boolean | Promise<boolean> {
	nativeSetState.call (this, state, callback);
	return true;
}// setState;


/**** Date Extension Functions ****/


Date.current_date = function (): Date { return new Date () }

Date.earlier = function (value: StringDate): boolean {
	if (typeof value == "string") value = new Date (value as string);
	let result: boolean = (value as Date) < new Date ();
	return result;
}// earlier;


Date.format = function (date_value: StringDate, format: DateFormats = DateFormats.readable): string {

	if (is_null (date_value)) return null;

	let date: Date = (date_value instanceof Date) ? date_value : new Date (date_value);

	if (format == DateFormats.readable) return `${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}-${date.getFullYear ()}`;
	if (format == DateFormats.database) return `${date.getFullYear ()}-${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}`;

	return date.toDateString ();

}// Date.format;


Date.later = function (value: StringDate): boolean {
	if (typeof value == "string") value = new Date (value as string);
	let result: boolean = (value as Date) > new Date ();
	return result;
}// later;


Date.month_name = (month: number) => { return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month - 1] }

Date.today = function (format: DateFormats = DateFormats.readable): string { return Date.format (new Date (), format); }


Date.weekday_name = (day: number) => { return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day - 1] }


/**** Date Prototype Functions ****/


Date.prototype.appended_day = function () {

	let day = this.getDate ();

	switch (day) {
		case 1: return `${day}st`;
		case 2: return `${day}nd`;
		case 3: return `${day}rd`;
		default: return `${day}th`;
	}// switch;
	
}// appended_day;


Date.isDate = function (candidate: any): boolean { return candidate instanceof Date }


Date.prototype.format = function (template) {

	let hours = this.getHours ();
	let month = this.getMonth ();

	let result = (template.replace ? template : String.Empty);

	function replace_months (template: string) {
		if (template.indexOf ("MMMM") >= 0) return template.replace ("MMMM", Date.month_name (month + 1));
		if (template.indexOf ("MM") >= 0) return template.replace ("MM", (month + 1).padded (2));
		if (template.indexOf ("M") >= 0) return template.replace ("M", (month + 1).toString ());
	}// replace_months;

	result = replace_months (result);

	return result.
		replace ("yyyy", this.getFullYear ().toString ()).
		replace ("dd", this.getDate ().padded (2)).
		replace ("HH", hours.padded (2)).
		replace ("mm", this.getMinutes ().padded (2)).
		replace ("ss", this.getSeconds ().padded (2)).
		replace ("ad", this.appended_day ()).
		replace ("d", this.getDate ().toString ()).
		replace ("H", ((hours % 12) || 12).toString ()).
		replace ("ap", (hours < 12) ? "am" : "pm").
		replace ("w", Date.weekday_name [this.getDay ()]);

}// format;


Date.prototype.timestamp = function (): number { return this.valueOf () }


Date.prototype.toUnix = function (): number { return this.getTime () / 1000 }


/**** Element Prototype Functions ****/


Element.prototype.hasClass = function (class_name: string): boolean { return this.classList.contains (class_name); }


/**** FormData Prototype Functions ****/


Object.defineProperties (FormData.prototype, {
	sanitized: { 
		get: function (): Object {

			let result: Object = null;

			this.forEach ((form_value: FormDataEntryValue, key: string) => {

				let value: string = form_value as string;

				if (!key.matches ("null") && not_empty (value)) {
					if (is_null (result)) result = new Object ();
					result [key] = (value.isNumeric ? Number (value) : (value.isBoolean ? value.matches ("true") : value));
				}// if;
			});

			return result;

		}// get;
	}// data;
});


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


HTMLDivElement.prototype.form_data = function (): Object {

	let elements = this.querySelectorAll ("select");
	let result: FormData = new FormData ();

	elements.forEach (element => {
		result.append (element.id, element.value);
	});

	return result.sanitized;

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


Number.prototype.padded = function (digits: number) { return this.toString ().padStart (digits - this.toString ().length, "0") }


Number.prototype.padFractions = function (decimal_places: number): string {

	let parts: StringArray = this.toString ().parts (".", 1, 2);

	if (parts.length == 1) parts.push ("0");
	parts [1] = parts [1].padEnd (decimal_places, "0");

	return `${parts [0]}.${parts [1]}`;

}// padFractions;


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


/**** Object Extension Functions ****/


Object.isFunction = function (candidate: any): boolean {
	return (typeof candidate == "function");
}// isFunction;


Object.isObject = function (candidate: any): boolean {
	return (typeof candidate == "object");
}// isObject;


Object.isObjectLike = function (candidate: any): boolean {
	return Object.isObject (candidate) || Object.isFunction (candidate);
}// isObjectLike;


Object.notObject = function (candidate: any): boolean {
	return !Object.isObject (candidate);
}// notObject;


Object.notObjectLike = function (candidate: any): boolean {
	return !Object.isObjectLike (candidate);
}// notObjectLike;


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


Object.prototype.toJson = function () { return JSON.stringify (this) }


Object.defineProperties (Object.prototype, {

	duplicate: { get: 
		function () { 

			let duplicate = this.Replica;

			for (let index = 0; index < this.Keys.length; index++) {

				let key: string = this.Keys [index];

				if (Array.isArray (this [key]) || (typeof this [key] == "object")) {
					duplicate [key] = this [key].duplicate;
					continue;
				}// if;

				if ((typeof this [key]) == "function") continue;
				duplicate [key] = this [key];

			}// for;

			return duplicate;

		}// duplicate;
	},

	GetType: { get: function (): Function { return Object.getPrototypeOf (this).constructor } },
	GetTypeName: { get: function (): string { return Object.getPrototypeOf (this).constructor.name } },

	Keys: { get: function (): StringArray { return Object.keys (this) } },
	NoData: { get: function (): boolean { return this.hasKey ("data") && (this.data == no_data) } },

	Pristine: { get: function (): boolean {

		for (let key of this.Keys) {
			if (Object.isObject (key) && is_assigned (this [key])) return false;
		}// for;

		return true;

	}},

	Replica: { get: function (): any { return new (Object.getPrototypeOf (this).constructor) () } },

});


/**** String Prototype Functions ****/


String.Empty = "";
String.Space = " ";
String.Comma = ",";


String.isString = function (candidate: any) { return typeof candidate == "string" }


String.prototype.contains = function (candidate: string) { return this.indexOf (candidate) > -1 }


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
	return this.cleaned == candidate.cleaned;
}// matches;


String.prototype.parseInt = function (): number {
	return (~~this).toString () == this ? ~~this : null;
}// parseInt;


String.prototype.parseNumeric = function (allow_negatives: boolean = true, allow_decimals: boolean = true) {

	let result = String.Empty;

	for (let index = 0; index < this.length; index++) {
		if (allow_negatives && (this [index] == "-") && (index == 0)) { result += this [index]; continue; }
		if (allow_decimals && (this [index] == ".") && (!result.includes ("."))) { result += this [index]; continue; }
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
		result.push (`${word.trim ().substring (0, 1).toUpperCase ()}${word.substring (1).toLowerCase ()}`);
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


Object.defineProperties (String.prototype, {

	cleaned: { get: function () { return this.toLowerCase ().trim () } },
	null_value: { get: function (): string { return (this.trim () == String.Empty) ? null : this } },

	isBoolean: { get: function (): boolean { return this.matches ("true") || this.matches ("false") } },
	isNumeric: { get: function (): boolean { return !isNaN (Number (this)) } },
	isInteger: { get: function (): boolean { return this.isNumeric && ((Number (this) % 1) == 0) } }		

});