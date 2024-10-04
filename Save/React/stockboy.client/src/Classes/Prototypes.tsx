import React, { Component } from "react";


export {}


declare global {

	interface Array<T> {
		add (value: T): Array<T>;
		append (value: T): Array<T>;
		contains (value: any): boolean;
		empty (): boolean;
	}// Array<T>;


	interface DateConstructor {
		format (date_value: string | Date, readable?: boolean): string;
		today (readable?: boolean): string;
		current_date (): Date;
	}// DateConstructor;


	interface Date {
		timestamp (): number;
	}// Date;


	interface HTMLElement {
		setClass (value: String, condition: Boolean);
	}// HTMLElement;


	interface HTMLDivElement {
		form_data ();
	}// HTMLDivElement;


	interface Number {
		currency_format (): string;
		round_to (decimal_places: number): number;
		truncate_to (decimal_places: number): number;
	}// Number;


	interface Object {
		copy (...candidates: Object []): Object;
		matches (candidate: Object): boolean;
		merge (...candidates: Object []): Object;
	}// Object;


	interface String {
		padded (char: String, size: number, right_padded?: boolean): String;
		titleCase (): String;
	}// String;


	interface StringConstructor {
		Empty: string;
		Space: string;
	}// StringConstructor;

}// declare global;


/**** Array Prototypes ****/


Array.prototype.add = function<T> (value: T): Array<T> {
	return (this.contains (value)) ? this : this.append (value);
}// add;


Array.prototype.append = function<T> (value: T): Array<T> {
	this.push (value);
	return this;
}// append;


Array.prototype.contains = function (value: any) { return this.indexOf (value) > -1 };


Object.defineProperty (Array.prototype, "empty", {
	get: function () { return this.length == 0 }

});


/**** React Component Prototypes ****/


let nativeSetState = Component.prototype.setState;

Component.prototype.setState = function (state: any, callback?: () => void): boolean | Promise<boolean> {
	nativeSetState.call (this, state, callback);
	return true;
}// setState;


/**** Date Prototypes ****/


Date.format = function (date_value: string | Date, readable: boolean = true): string {

	let date: Date = (date_value instanceof Date) ? date_value : new Date (date_value);

	if (readable) return `${(date.getMonth () + 1).toString ().padded ("0", 2)}-${date.getDate ().toString ().padded ("0", 2)}-${date.getFullYear ()}`;
	return `${date.getFullYear ()}-${(date.getMonth () + 1).toString ().padded ("0", 2)}-${date.getDate ().toString ().padded ("0", 2)}`;
}


Date.today = function (readable: boolean = true): string { return Date.format (new Date (), readable); }


Date.current_date = function (): Date { return new Date () }


Date.prototype.timestamp = function (): number { return Math.floor (this.getMinutes () / 1000) }


/**** HTMLElement Prototypes ****/


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;


/**** HTMLElement Prototypes ****/


HTMLDivElement.prototype.form_data = function (): FormData {

	let elements = this.querySelectorAll ("select");
	let result: FormData = new FormData ();

	elements.forEach (element => {
		//if (is_null (result)) result = new FormData ();
		result.append (element.id, element.value);
	});

	return result;

}// form_data;


/**** Number Prototypes ****/


Number.prototype.currency_format = function (): string {
	let parts = this.toString ().split (".");
	if (parts.length == 1) parts.push ("00");
	parts [1] = parts [1].padded ("0", 2, true).toString ();
	return parts.join (".");
}// currency_format;


Number.prototype.round_to = function (decimal_places: number): number {
	return Math.round ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// round_to;


Number.prototype.truncate_to = function (decimal_places: number): number {
	return Math.trunc ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// truncate_to;


/**** Object Prototypes ****/


Object.prototype.copy = function (...candidates: Object []): Object {

	candidates.forEach (candidate => {
		Object.assign (this, candidate);
	});

	return this;

}// copy;


Object.prototype.matches = function (candidate: Object) {

	if (is_null (candidate)) return false;

	for (let key of Object.keys (this)) {
		if (this [key] != candidate [key]) return false;
	}// for;

	return true;

}// matches;


Object.prototype.merge = function (...candidates: Object []): Object {

	candidates.forEach (item => {
		Object.keys (this).forEach (key => {
			if (not_set (item [key])) return;
			this [key] = item [key];
		});
	});

	return this;

}// merge;


/**** String Prototypes ****/


String.Empty = "";
String.Space = " ";


String.prototype.padded = function (char: String, size: number, right_padded: boolean = false): String {
	let result = this;
	while (result.length < size) result = (right_padded ? `${this}${char}` : `${char}${this}`);
	return result;
}// padded;


String.prototype.titleCase = function (): String {

	let words: String [] = this.replace (underscore, String.Space).split (String.Space);
	let result: String [] = new Array ();

	words.forEach (word => {
		word = word.trim ();
		result.push (`${word.substring (0, 1).toUpperCase ()}${word.substring (1).toLowerCase ()}`);
	});

	return result.join (String.Space);

}// titleCase;


