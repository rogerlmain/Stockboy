import { ChangeEvent } from "react";


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

		
		document.querySelectorAll ("input").forEach ((field: HTMLInputElement) => {

			if (!(field.isCurrency || field.isNumeric)) return;

			if (!(field.onpaste)) field.onpaste = (event: Event) => setTimeout (() => {

				let value: string = field.value.strip_non_numeric ();

				let decimal_places: number = (field.getAttribute ("type") == "currency") ? currency_decimals : (field.getAttribute ("decimalPlaces")?.integerValue () ?? 0);
				let leading_zeros: number = field.getAttribute ("leadingZeros")?.integerValue () ?? 0;
				let negative_numbers: boolean = field.getAttribute ("negativeNumbers")?.toLowerCase () == "true";

				if ((value [0] == "-") && !negative_numbers) value = value.substring (1);

				let parts = value.split (".");

				if (decimal_places == 0) return field.value = parts [0];

				if (parts [1].length > decimal_places) {
					parts [1] = parts [1].substring (0, decimal_places);
					value = `${parts [0]}.${parts [1]}`;
				}// if;

				field.value = value;

			});

			if (!field.onfocus) field.onfocus = () => {
				if (field.getAttribute ("commas") == "true") field.clear_commas ();
			}// onfocus;

			if (!field.onblur) field.onblur = () => {
				if (field.getAttribute ("commas") == "true") field.set_commas ();
				if (field.isCurrency) field.pad_decimals (currency_decimals);
			}// onblur;

		});

	});

}).observe (document, { childList: true, subtree: true });

