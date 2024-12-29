import ErrorWindow from "Controls/Common/Windows/ErrorWindow";


window.addEventListener ("unhandledrejection", (event) => {
	alert ("unhandled rejection caught");
	event.preventDefault ();
});


export default abstract class APIClass {

	private base_url: string = null;


	/********/


	protected fetch (url: RequestInfo, body: any = null): Promise<any> {
		return new Promise (resolve => {

			const parameters: RequestInit = {
				credentials: "include",
				method: is_null (body) ? "get" : "post",
				headers: { "content-type": "application/json; charset=utf-8" }
			};

			if (body instanceof FormData) body = body.sanitized;

			if (isset (body)) parameters ["body"] = JSON.stringify (body);

			fetch (url, parameters).then (response => {
				try {
					if (response.ok) return response.json ();
					throw { message: "Bad request" };
				} catch (except: any) {
					return { error: except.message };
				}// try;
			}).then (response => {
				if (is_null (response)) return resolve (null);
				if (isset (response ["error"])) {
					popup_window.show (<ErrorWindow text={response ["error"]} />);
					return resolve (null);
				}// if;
				resolve (response);
			}).catch ((except) => {
				console.log (except);
				setTimeout (() => resolve (this.fetch (url, body)), 1000);
			});

		});
	}// fetch;


	/********/


	public fetch_data (url: string, body: any = null): Promise<any> {
		return this.fetch (`${this.base_url}/${url}`, body);
	}// fetch_data;
	

	constructor (base_url: string) {
		this.base_url = base_url;
	}// constructor;


}// APIClass;