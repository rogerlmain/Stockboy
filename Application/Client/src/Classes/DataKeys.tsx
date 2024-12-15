import NameValueCollection from "Classes/Common/Collections";
import { ReactNode } from "react";


type DataKeyType = String | NameValueCollection;
type DataKeyArrayMapFunction = (value: DataKey, index: number, array: Array<DataKey>) => ReactNode;

export class DataKey {

	private key_value: DataKeyType = null;

	public get id (): string { return String.isString (this.key_value) ? (this.key_value as string) : Object.keys (this.key_value) [0] }
	public get name (): string { return String.isString (this.key_value) ? this.key_value as string : this.key_value [this.id] }

	constructor (value: DataKeyType) {
		this.key_value = value;
	}// constructor;

}// DataKey;


export class DataKeyArray {

	private key_values: Array<DataKey> = null;

	private get_values (type: string): StringArray {

		let result = null;

		this.key_values.forEach ((value: DataKey) => {
			if (is_null (result)) result = new Array<String> ();
			result.push (value [type]);
		});

		return result;

	}// get_values;


	/********/


	public get ids () { return this.get_values ("id") }
	public get names () { return this.get_values ("name") }
	public get length () { return this.key_values.length }


	public get titleCase () { 

		let result: DataKeyArray = null;

		this.names.forEach ((name: String) => {
			if (is_null (result)) result = new DataKeyArray ();
			result.push (new DataKey (name.titleCase ()));
		});

		return result;

	}// titleCase;


	public has = (value: string): boolean => this.indexOf (value) > -1;


	public indexOf (value: string) {

		for (let index = 0; index < this.key_values.length; index++) {
			if (this.key_values [index].id == value) return index;
		}// indexOf;

		return -1;

	}// indexOf;


	public insert = (value: DataKey, position: number = 0) => this.key_values.splice (position, 0, value);


	public remove = (value: string) => this.key_values.splice (this.indexOf (value), 1);


	public map = (handler: DataKeyArrayMapFunction): Array<ReactNode> => this.key_values.map<ReactNode> (handler);


	public push = (value: DataKey): void => {
		if (is_null (this.key_values)) this.key_values = new Array<DataKey> ();
		this.key_values.push (value);
	}// push;


	constructor (values: StringObjectArray = null, keys: StringPair = null) {

		if (not_set (values)) return;

		values.forEach ((value: StringObject) => {

			if (is_null (this.key_values)) this.key_values = new Array<DataKey> ();
			if (String.isString (value)) return this.key_values.push (new DataKey (value));

			switch (isset (keys)) {
				case true: this.key_values.push (new DataKey ({ [value [keys [0]]]: value [keys [1]] })); break;
				default: Object.keys (value).forEach ((key: string) => this.key_values.push (new DataKey ({ [key]: value [key] }))); break;
			}// switch;

		});

	}// constructor;

}// DataKeyArray;

