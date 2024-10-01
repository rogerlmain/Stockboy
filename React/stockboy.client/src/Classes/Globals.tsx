export {}

declare global {

	var isset: Function;
	var not_set: Function;

	var is_null: Function;
	var not_null: Function;

	var underscore: string;

}// global;


globalThis.isset = (value: any): Boolean => not_null (value) && (value != undefined);
globalThis.not_set = (value: any): Boolean => !isset (value);

globalThis.is_null = (value: any): Boolean => (value == null);
globalThis.not_null = (value: any): Boolean => !is_null (value);

globalThis.underscore = "_";