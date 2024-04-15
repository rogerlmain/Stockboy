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

	if ((parts [0] != "0") && (parts [0].leadingCharacters ("0") > leading_zeros)) return event.preventDefault (); // too many leading zeros
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


/**** GridTable ****/


function toggle_row_highlight (row, color = null) {
	for (let item of row.querySelectorAll ("div")) {
		if (is_null (color)) {
			item.style.removeProperty ("background-color");
			continue;
		}
		item.style.backgroundColor = color;
	}
}


function toggle_row_selection (row) {
	let selected = row.getBoolean ("selected");
	for (let next_row of row.parentNode.querySelectorAll ("div.table-row")) {
		next_row.removeAttribute ("selected");
		toggle_row_highlight (next_row);
	}
	if (!selected) {
		row.setAttribute ("selected", "true");
		toggle_row_highlight (row, "var(--selected-color)");
	}

	document.broadcastEvent (new CustomEvent ("TableRowSelected", {
		detail: {
			id: row.querySelector ("input[type='hidden']").value,
			selected: row.getBoolean ("selected")
		}
	}));
}


function highlight_row (row) {
	if (!row.getBoolean ("selected")) toggle_row_highlight (row, "var(--highlight-color)");
}


function remove_highlight (table_name) {
	for (let row of document.getElementById (table_name).querySelectorAll ("div.table-row")) {
		if (row.getBoolean ("selected")) continue;
		toggle_row_highlight (row);
	}
}


/**** Checkbox Select List ****/


function open_dropdown (select_list) {

	let list = select_list.querySelector ("div.list");
	let glyph = select_list.querySelector ("div.glyph");

	glyph.style.transform = "rotate(180deg)";
	return list.style.removeProperty ("height");

}


function close_dropdown (select_list) {

	let list = select_list.querySelector ("div.list");
	let glyph = select_list.querySelector ("div.glyph");

	glyph.style.removeProperty ("transform");
	list.style.height = 0;

}


function toggle_dropdown (select_list) {
	if (parseInt (select_list.querySelector ("div.list").style.height) == 0) return open_dropdown (select_list);
	close_dropdown (select_list);
}


/**** Load Handlers ****/


document.addEventListener ("readystatechange", () => {

	if (document.readyState != "complete") return;

	load_custom_handlers (document);

	for (let item of document.querySelectorAll("div.checkbox-select-list")) {
		item.style.width = `${item.querySelector ("div.list").offsetWidth}px`;
	}

	document.body.addEventListener ("click", () => {
		let checkbox_lists = document.body.querySelectorAll ("div.checkbox-select-list");
		for (let list of checkbox_lists) {
			close_dropdown (list);
		}
	});

});
