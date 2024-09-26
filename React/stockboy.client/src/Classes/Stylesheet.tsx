export default class Stylesheet {


	private sheet_tag: HTMLStyleElement = null;


	constructor (stylesheet_id: String) {
		this.sheet_tag = document.getElementById (stylesheet_id.toString ()) as HTMLStyleElement;
	}// constructor;

}// Stylesheet;