export {}


declare global {


	interface Array<T> {
		append (value: T): Array<T>
		empty (): boolean;
	}


	interface DateConstructor {
		today (): string
	}

	interface String {
		padded (char: String, size: number): String;
		titleCase (): String;
	}

	interface StringConstructor {
		Empty: string;
		Space: string;
	}

	interface HTMLElement {
		setClass (value: String, condition: Boolean);
	}

}


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


/**** HTMLElement Prototypes ****/


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;

