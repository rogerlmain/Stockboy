import { BaseModel } from "Models/Abstract/BaseModels";


/**** Types ****/


export type DataFilterList = Array<DataFilter>
export type NameValueArray = Array<NameValuePair>

export enum FilterType {inclusive, exclusive, boundary, date_range}
export enum BoundaryType {lower, upper}


/**** Classes ****/


export class NameValuePair<IModel = string> {

	public name: string = null;
	public value: IModel = null;

	public constructor (name: string = null, value: IModel = null) {
		this.name = name;
		this.value = value;
	}// constructor;

}// NameValuePair;


export class DataFilter extends BaseModel {

	public field: string = null;
	public value: StringDate = null;
	public type: FilterType = FilterType.exclusive;
	public partial: boolean  = false;
	public boundary: BoundaryType = null;

	public constructor (value?: Object | string, field?: string) {

		super ();

		if (Object.isObject (value)) {
			value.Keys.forEach ((key: string) => {
				if (this.Keys.contains (key)) this [key] = value [key];
			});
			return;
		}// if;

		this.field = field;
		this.value = (value as string);

	}// constructor;

}// DataFilter;


export default class NameValueCollection<IModel = string> {

	[key: string]: any;


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


}// NameValueCollection;