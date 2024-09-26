export {}


declare global {

	interface String {
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


String.Empty = "";
String.Space = " ";


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

