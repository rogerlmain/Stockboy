const blank = "";
const comma = ",";
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


var is_null = item => (item == null);
var not_null = item => !is_null (item);

var isset = item => (not_null (item) && (item != "undefined"));
var not_set = item => !isset (item);

var is_empty = item => not_set (item) || (Array.isArray (item) && (item.length == 0));


var update_holdings = () => fetch ("UpdateHoldings").then (response => response.text ()).then (response => document.getElementById ("current_holdings").innerHTML = response);


/********/


function load_popup (popup) {
	popup.addEventListener ("transitionend", event => {
		if (event.propertyName != "opacity") return;
		if (event.target.style.opacity == 1) {
			var content_path = event.target.getAttribute ("content_path");
			if (isset (content_path)) {
				var data = event.target.getAttribute ("data");
				parameters = not_null (data) ? {
					method: "post",
					headers: { "content-type": "application/json" },
					body: data
				} : null;
				fetch (content_path, parameters).then (response => response.text ()).then (response => {
					event.target.innerHTML = response;
					load_custom_handlers (event.target);
				});
			}
			return;
		}
		event.target.style.display = "none";
	});
}


function show_popup (popup_id, content_path, data = null) {
	var popup = document.getElementById (popup_id);
	if (isset (data)) popup.setAttribute ("data", JSON.stringify (data));
	popup.setAttribute ("content_path", content_path);
	popup.style.display = null;
	setTimeout (() => popup.style.opacity = 1);
}


var hide_popup = popup_id => setTimeout (() => document.getElementById (popup_id).style.opacity = 0);
var close_popup = hide_popup;
var open_popup = show_popup;


/********/


function submit_ticker () {
	var ticker_form = document.getElementById ("ticker_form");
	fetch ("SaveTicker", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify ({ text: ticker_form.querySelector ("[name='ticker']").value })
	}).then (response => response.text ()).then (response => document.getElementById ("popup_window").innerHTML = response);
}


function submit_broker () {
	var brokerage_form = document.getElementById ("brokerage_form");
	fetch ("SaveBroker", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify ({ text: brokerage_form.querySelector ("[name='broker']").value })
	}).then (response => response.text ()).then (response => document.getElementById ("popup_window").innerHTML = response);
}


function submit_form (form, target, response_process = null) {

	if (form.reportValidity ()) {

		var form_data = new FormData (form);

		fetch (target, {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify (Object.fromEntries (form_data))
		}).then (response => response.text ()).then (response => {
			document.getElementById ("popup_window").innerHTML = response;
			if (isset (response_process)) response_process ();
		});

	}

}


/********/


function update_sort_fields (table, field) {

	if (not_set (table.sort_fields)) return table.sort_fields = [field];

	table.sort_fields.bump (field);
	table.sort_fields.bump (`${field} desc`);

	if (table.sort_fields [0] == field) return table.sort_fields [0] = `${field} desc`;
	if (table.sort_fields [0] == `${field} desc`) return table.sort_fields [0] = field;

	if (!table.sort_fields.includes (field)) table.sort_fields.unshift (field);

}


function sort_and_filter_table (table) {
	fetch (table.getAttribute ("endpoint"), {
		method: "post",
		headers: { "content-type": "application/json"},
		body: JSON.stringify ({ 
			sort_fields: table.sort_fields,
			filters: table.filters
		})
	}).then (response => response.text ()).then (response => {
		table.innerHTML = response;
		load_custom_handlers (table);
	});
}


function table_item_selected (table_id) {
	for (var row of document.getElementById (table_id).querySelectorAll ("div.table-row")) {
		if (row.getBoolean ("selected")) return true;
	}
	return false;
}


/********/


function load_custom_handlers (target) {

	var load_handlers = target.querySelectorAll ("[onload]");

	for (var handler of load_handlers) {
		new Function (handler.getAttribute ("onload")).bind (handler)();
	}

	for (var input of target.querySelectorAll ("input[type='numeric'], input[type='currency']")) {
		input.addEventListener ("keypress", event => verify_keystroke (event));
		input.style.textAlign = "right";
		if (input.getBoolean ("commas")) {
			input.addEventListener ("focus", event => clear_commas (event));
			input.addEventListener ("blur", event => set_commas (event));
		}
	}

	for (var input of target.querySelectorAll ("input[type='datetime-local']")) {

		input.changed = false;
		if (input.value != blank) continue;
		input.addEventListener ("change", event => event.target.changed = true);

		setTimeout (function update_time () {
			if (input.changed) return;
			timestamp = new Date ();
			input.value = timestamp.now;
			setTimeout (update_time, 60000 - ((timestamp.getSeconds () * 1000) + timestamp.getMilliseconds ()));
		});

	}

	for (var input of target.querySelectorAll ("input[type='date']")) {
		if (input.value != blank) return;
		input.value = new Date ().today;
	}

	for (var input of target.querySelectorAll ("[required]")) {
		var message = input.getAttribute ("required");

		if (message.isEmpty) message = `${document.querySelector (`label[for='${input.id}']`).innerHTML} is a required field`;

		input.addEventListener ("invalid", () => input.setCustomValidity (message));
		input.addEventListener ("change", () => input.setCustomValidity (blank));
	}

	for (var item of document.querySelectorAll ("div.data-table div.header > div")) {
		if (not_set (item.closest ("div.table-container"))) throw new Error ("Data table must be contained in a div with class 'table-container'");
		item.addEventListener ("click", event => {
			let table = event.target.closest ("div.table-container");
			update_sort_fields (table, event.target.parentNode.getAttribute ("field"));
			sort_and_filter_table (table);
		});
	}

}


document.addEventListener ("readystatechange", event => {
	if (document.readyState != "compvare") return;
	load_custom_handlers (document);
});