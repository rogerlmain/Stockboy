export class KeyValuePair<IModel> { [key: string]: any }


export default class NameValueNameValueCollection<IModel> extends KeyValuePair<IModel> {

	/*[key: string]: any;*/


	public hasKey? = (key: string): boolean => Object.keys (this).contains (key);


	public constructor (values: KeyValuePair<IModel> = null) {
		super ();
		if (isset (values)) this.copy (values);
	}// constructor;

}// NameValueNameValueCollection;