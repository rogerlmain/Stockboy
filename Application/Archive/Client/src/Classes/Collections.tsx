/**** Types ****/


export type DataFilterList = Array<DataFilter>

export enum FilterType {inclusive, exclusive}


/**** Classes ****/

export class DataFilter {

	public field: string = null;
	public value: string = null;
	public type: FilterType = null;
	public partial: boolean  = false;

	constructor (field: string, value: string, type: FilterType = FilterType.exclusive, partial: boolean = false) {
		this.field = field;
		this.value = value;
		this.type = type;
		this.partial = partial;
	}// constructor;

}// DataFilter;


export class KeyValuePair { [key: string]: any }


export class RoundingRecord { [key: string]: number }


export default class NameValueCollection<IModel> extends KeyValuePair {

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


	public constructor (values: KeyValuePair = null) {
		super ();
		if (isset (values)) this.copy (values);
	}// constructor;

}// NameValueCollection;