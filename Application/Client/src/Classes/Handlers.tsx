new MutationObserver ((mutations: Array<MutationRecord>) => {
	mutations.forEach (() => {

		let items: FormFieldList = document.querySelectorAll (form_fields);

		items.forEach ((element: FormField) => {
			if (not_empty (element.getAttribute ("name"))) return;
			element.setAttribute ("name", element.getAttribute ("id"));
		});

	});
}).observe (document, { childList: true, subtree: true });
