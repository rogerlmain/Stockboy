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


	public matches (candidate: NameValueCollection<IModel>): boolean {

		if (not_set (candidate)) return false;

		for (let key of Object.keys (this)) {
			if (this [key] instanceof Function) continue;
			if ((this [key] instanceof Object) && (isset (this [key].matches)) && !this [key].matches (candidate [key])) return false;
			if (this [key] != candidate [key]) return false;
		}// for;

		return true;

	}// matches;


	public constructor (values: KeyValuePair<IModel> = null) {
		super ();
		if (isset (values)) this.copy (values);
	}// constructor;

}// NameValueCollection;