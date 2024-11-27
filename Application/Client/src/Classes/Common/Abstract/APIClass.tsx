import ErrorWindow from "Controls/Common/Windows/ErrorWindow";


export default abstract class APIClass {

	private base_url: string = null;


	/********/


	protected fetch = (url: RequestInfo, body: any = null): any => new Promise ((resolve, reject) => {

		const parameters = {
			method: is_null (body) ? "get" : "post",
			headers: { "content-type": "application/json" }
		};

		if (body instanceof FormData) body = Object.fromEntries (body);
		if (isset (body)) parameters ["body"] = JSON.stringify (body);

		fetch (url, parameters).then (response => {
			try {
				if (response.ok) return response.json ();
				throw "Bad request";
			} catch (except: any) {
				return { error: except.message };
			}// try;
		}).then (response => {
			if (is_null (response)) return resolve (null);
			if (isset (response ["error"])) {
				popup_window.show (<ErrorWindow text={response ["error"]} />);
				reject ();
			}// if;
			resolve (response);
		}).catch (() => {
			setTimeout (() => resolve (this.fetch (url, body)), 1000);
		});

	});


	/********/


	public fetch_data = (url: string, body: any = null): Promise<any> => this.fetch (`${this.base_url}/${url}`, body);
	

	constructor (base_url: string) {
		this.base_url = base_url;
	}// constructor;


}// APIClass;