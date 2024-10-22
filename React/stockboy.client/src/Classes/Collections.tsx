/**** Types ****/


export type ListItemArray = Array<ListItem>


/**** Classes ****/


export class ListItem {
	public id: string = null;
	public name: string = null;
}// ListModelItem;


export class KeyValuePair<IModel> { [key: string]: any }


export class RoundingRecord { [key: string]: number }


export default class NameValueCollection<IModel> extends KeyValuePair<IModel> {

	public hasKey? = (key: string): boolean => Object.keys (this).contains (key);


	public constructor (values: KeyValuePair<IModel> = null) {
		super ();
		if (isset (values)) this.copy (values);
	}// constructor;

}// NameValueCollection;