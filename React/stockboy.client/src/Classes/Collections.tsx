export interface KeyValuePair<IModel> { [key: string]: IModel }


export class NameValueCollection<IModel> {

	[key: string]: IModel;

	public constructor (values: KeyValuePair<IModel> = null) {
		if (isset (values)) this.copy (values);
	}// constructor;

}// NameValueCollection;
