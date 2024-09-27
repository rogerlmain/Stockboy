export {}


declare global {


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


Date.today = function (): string {
	let date = new Date ();
	return `${date.getFullYear ()}-${date.getMonth ().toString ().padded ("0", 2)}-${date.getDay ().toString ().padded ("0", 2)}`;
}// today;



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


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;

