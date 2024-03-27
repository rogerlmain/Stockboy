const blank = "";
const comma = ",";
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


let is_null = item => (item == null);
let not_null = item => !is_null (item);

let isset = item => (not_null (item) && (item != "undefined"));
let not_set = item => !isset (item);


let update_holdings = () => fetch ("UpdateHoldings").then (response => response.text ()).then (response => document.getElementById ("current_holdings").innerHTML = response);


/********/


function load_popup (popup) {
	popup.addEventListener ("transitionend", event => {
		if (event.propertyName != "opacity") return;
		if (event.target.style.opacity == 1) {
			let content_path = event.target.getAttribute ("content_path");
			if (isset (content_path)) fetch (content_path).then (response => response.text ()).then (response => {
				event.target.innerHTML = response;
				execute_custom_handlers (event.target);
			});
			return;
		}
		event.target.style.display = "none";
	});
}


function show_popup (popup_id, content_path) {
	let popup = document.getElementById (popup_id);
	popup.setAttribute ("content_path", content_path);
	popup.style.display = null;
	setTimeout (() => popup.style.opacity = 1);
}


var hide_popup = popup_id => setTimeout (() => document.getElementById (popup_id).style.opacity = 0);
var close_popup = hide_popup;
var open_popup = show_popup;


/********/


function submit_ticker () {
	let ticker_form = document.getElementById ("ticker_form");
	fetch ("SaveTicker", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify ({ text: ticker_form.querySelector ("[name='ticker']").value })
	}).then (response => response.text ()).then (response => document.getElementById ("popup_window").innerHTML = response);
}


function submit_broker () {
	let brokerage_form = document.getElementById ("brokerage_form");
	fetch ("SaveBroker", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify ({ text: brokerage_form.querySelector ("[name='broker']").value })
	}).then (response => response.text ()).then (response => document.getElementById ("popup_window").innerHTML = response);
}


function submit_form (form, target, response_process = null) {

	if (form.reportValidity ()) {

		let form_data = new FormData (form);

		fetch (target, {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify (Object.fromEntries (form_data))
		}).then (response => response.text ()).then (response => {
			document.getElementById ("popup_window").innerHTML = response;
			if (isset (response_process)) response_process ();
		});

	}

	event.stopPropagation ();
	event.preventDefault ();

}


/********/


function execute_custom_handlers (target) {

	let load_handlers = target.querySelectorAll ("[onload]");

	for (let handler of load_handlers) {
		new Function (handler.getAttribute ("onload")).bind (handler)();
	}

	for (let input of target.querySelectorAll ("input[type='numeric'], input[type='currency']")) {
		input.addEventListener ("keypress", event => verify_keystroke (event));
		input.style.textAlign = "right";
		if (input.getBoolean ("commas")) {
			input.addEventListener ("focus", event => clear_commas (event));
			input.addEventListener ("blur", event => set_commas (event));
		}
	}

	for (let input of target.querySelectorAll ("input[type='datetime-local']")) {
		input.changed = false;
		input.addEventListener ("change", event => event.target.changed = true);
		setTimeout (function update_time () {
			if (input.changed) return;
			timestamp = new Date ();
			input.value = timestamp.now;
			setTimeout (update_time, 60000 - ((timestamp.getSeconds () * 1000) + timestamp.getMilliseconds ()));
		});
	}

	for (let input of target.querySelectorAll ("input[type='date']")) {
		input.value = new Date ().today;
	}

	for (let input of target.querySelectorAll ("[required]")) {
		let message = input.getAttribute ("required");

		if (message.isEmpty) message = `${document.querySelector (`label[for='${input.id}']`).innerHTML} is a required field`;

		input.addEventListener ("invalid", () => input.setCustomValidity (message));
		input.addEventListener ("change", () => input.setCustomValidity (blank));
	}

}


document.addEventListener ("DOMContentLoaded", event => {
	if (document.readyState != "complete") return;
	execute_custom_handlers (document);
});