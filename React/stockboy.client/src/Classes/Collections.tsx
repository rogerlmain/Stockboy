export interface KeyValuePair { [key: string]: any }


export class NameValueCollection {

	[key: string]: any;

	public merge (values: NameValueCollection | KeyValuePair): NameValueCollection {

		Object.keys (values).forEach (key => {
			this [key] = values [key];
		});

		return this;

	}// merge;


	public constructor (values: KeyValuePair = null) {
		if (isset (values)) this.merge (values);
	}// constructor;

}// NameValueCollection;
