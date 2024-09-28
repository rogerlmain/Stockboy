export interface KeyValuePair { [key: string]: any }


export class NameValueCollection {

	[key: string]: any;


	public constructor (values: KeyValuePair = null) {
		if (isset (values)) this.merge (values);
	}// constructor;

}// NameValueCollection;
