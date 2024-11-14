/**** Decorator Functions ****/

export function Invisible (target: any, key: any) {
	if (is_null (target.constructor.invisible_fields)) target.constructor.invisible_fields = new Array<string> ();
	target.constructor.invisible_fields.push (key);
}// Invisible;


export function TypeSafe (object_type: any = null) {
	return function (target: any, key: any) {

		if (object_type == Date) {

			let date_value: Date = null;
			
			return Object.defineProperty (target, key, {
				get: function (): string {
					return date_value.format ("MMMM d, yyyy");
				},
				set: function (new_value: string) {
					date_value = new Date (new_value);
				}
			});

		}// if;

		let prototype: any = target.constructor.prototype;

		if (not_set (prototype.properties)) prototype.properties = new Array<Object> ();
		prototype.properties [key] = object_type;
		return null;
	};
}// TypeSafe;


/**** Types ****/


export type BaseModelArray = Array<IBaseModel>
export type StockModelArray = Array<IStockModel>
export type DateType = Date | string;


/**** Interfaces ****/


export interface IBaseModel { id?: string }


export interface IStockModel extends IBaseModel {
	broker_id: string;
	ticker_id: string;
}// IStockModel;


// DEPRECATED
export interface IStockDataModel extends IStockModel {
	data?: IStockModel;
}// IStockDataModel;


/**** Classes ****/


export abstract class BaseModel implements IBaseModel {

	@Invisible
	public id?: string = null;

	public static invisible_fields: StringArray = null;

}// BaseModel;


export class DataModel extends BaseModel {

	@Invisible
	public deleted?: boolean = null;
	
}// DataModel;


export class BasicStockModel {
	public broker_id: string;
	public ticker_id: string;
}// StockModel;


export class StockModel extends DataModel {

	@Invisible
	public broker_id: string;

	@Invisible
	public ticker_id: string;

}// StockModel;
