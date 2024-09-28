import React from "react";


export {}


declare global {


	interface Array<T> {
		append (value: T): Array<T>
		empty (): boolean;
	}// Array<T>;


	interface ElementCSSInlineStyle {

	}


	interface DateConstructor {
		today (): string
	}// DateConstructor;


	interface HTMLElement {
		setClass (value: String, condition: Boolean);
	}// HTMLElement;


	interface Object {
		matches (candidate: Object);
		merge (...objects: Object []);
	}// Object;


	interface String {
		padded (char: String, size: number): String;
		titleCase (): String;
	}// String;


	interface StringConstructor {
		Empty: string;
		Space: string;
	}// StringConstructor;

}// declare global;


/**** Array Prototypes ****/


Array.prototype.append = function<T> (value: T): Array<T> {
	this.push (value);
	return this;
}// append;


Object.defineProperty (Array.prototype, "empty", {
	get: function () { return this.length == 0 }

});


/**** Date Prototypes ****/


Date.today = function (): string {
	let date = new Date ();
	return `${date.getFullYear ()}-${date.getMonth ().toString ().padded ("0", 2)}-${date.getDay ().toString ().padded ("0", 2)}`;
}// today;



/**** HTMLElement Prototypes ****/


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;


/**** Object Prototypes ****/


Object.prototype.matches = function (candidate: Object) {

	if (is_null (candidate)) return false;

	for (let key of Object.keys (this)) {
		if (this [key] != candidate [key]) return false;
	}// for;

	return true;

}// matches;


Object.prototype.merge = function (...objects: Object []): Object {

	objects.forEach (item => {
		Object.keys (item).forEach (key => {
			this [key] = item [key];
		});
	});

	return this;

}// merge;


/**** String Prototypes ****/


String.Empty = "";
String.Space = " ";


String.prototype.padded = function (char: String, size: number): String {
	let result = this;
	while (result.length < size) result = `${char}${this}`;
	return result;
}


String.prototype.titleCase = function (): String {

	let words: String [] = this.replace (underscore, String.Space).split (String.Space);
	let result: String [] = new Array ();

	words.forEach (word => {
		word = word.trim ();
		result.push (`${word.substring (0, 1).toUpperCase ()}${word.substring (1).toLowerCase ()}`);
	});

	return result.join (String.Space);

}// titleCase;


