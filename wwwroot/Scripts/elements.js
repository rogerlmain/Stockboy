function verify_keystroke (event) {

	let textbox = event.target;

	let decimal_places = (textbox.getAttribute ("type") == "currency") ? 2 : (textbox.getAttribute ("decimal-places")?.integerValue ?? 0);
	let leading_zeros = textbox.getAttribute ("leading-zeros")?.integerValue ?? 0;
	let negative_numbers = textbox.getAttribute ("negative-numbers")?.toLowerCase () == "true";

	let value = `${textbox.value.substring (0, textbox.selectionStart)}${event.key}${textbox.value.substring (textbox.selectionEnd)}`;

	if (value.trim () != value) return event.preventDefault (); // leading or trailing spaces are not allowed
	if (!digits.includes (parseInt (value [0])) && (value [0] != "-")) return event.preventDefault (); // leading garbage
	if ((value [0] == "-") && !negative_numbers) return event.preventDefault (); // negative numbers not allowed

	let parts = value.split (".");

	if ((parts.length > 2) || ((parts.length > 1) && (decimal_places == 0))) return event.preventDefault (); // bad decimals
	if ((parts.length == 2) && (((parts [1] != blank) && !parts [1].isNumber) || (parts [1].length > decimal_places))) return event.preventDefault (); // garbage in decimal section

	if (parts [0][0] == "-") parts [0] = parts [0].substring (1);

	if ((value != "0") && (parts [0].leadingCharacters ("0") > leading_zeros)) return event.preventDefault (); // too many leading zeros
	if ((parts [0] != blank) && !parts [0].isNumber) return event.preventDefault (); // garbage in number section

	return true;

}// verify_keystroke;


function set_commas (event) {

	let number = blank;
	let parts = event.target.value.split (".");
	let negative = parts [0][0] == "-";

	if (parts [0][0] == "-") parts [0] = parts [0].substring (1);

	for (let i = 0; i < parts [0].length; i++) {
		number = `${parts [0][parts [0].length - (i + 1)]}${((i > 0) && ((i % 3) == 0)) ? comma : blank}${number}`;
	}

	event.target.value = `${negative ? "-" : blank}${number}${(parts.length > 1) ? "." + parts [1] : blank}`;
	
}


function clear_commas (event) {

	let parts = event.target.value.split (".");
	let negative = parts [0][0] == "-";

	if (negative) parts [0] = parts [0].substring (1);

	event.target.value = `${negative ? "-" : blank}${parts [0].parseNumeric}${(parts.length > 1) ? "." + parts [1] : blank}`;

}


document.addEventListener ("DOMContentLoaded", () => execute_custom_handlers (document));
