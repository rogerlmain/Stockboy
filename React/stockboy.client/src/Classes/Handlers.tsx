document.addEventListener ("readystatechange", () => {

	if (document.readyState != "complete") return;

	document.addEventListener ("keydown", (event: KeyboardEvent) => {
		
		let active_element: HTMLInputElement = document.activeElement as HTMLInputElement;

		if (!active_element.numericInput ()) return true; // this is not for you
		return active_element.valid_keystroke (event);

	});

});


new MutationObserver ((mutations: Array<MutationRecord>, observer: MutationObserver) => {

	mutations.forEach ((mutation: MutationRecord) => {

		
		document.querySelectorAll ("input").forEach ((field: Element) => {

			let element = (field as HTMLInputElement);

			if (!(element.isCurrency || element.isNumeric)) return;

			if (!element.onfocus) element.onfocus = () => {
				if (element.getAttribute ("commas") == "true") element.clear_commas ();
			}// onfocus;

			if (!element.onblur) element.onblur = () => {
				if (element.getAttribute ("commas") == "true") element.set_commas ();
				if (element.isCurrency) element.pad_decimals (2);
			}// onblur;

		});

	});

}).observe (document, { childList: true, subtree: true });

