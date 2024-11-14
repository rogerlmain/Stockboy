/**** Decorator Functions ****/

export function Invisible (target: any, key: any) {
	if (is_null (target.constructor.invisible_fields)) target.constructor.invisible_fields = new Array<string> ();
	target.constructor.invisible_fields.push (key);
}// Invisible;

/*
export function DataType (data_type: string) {
	return (target: any, key: any) => {

		Object.defineProperty (target, key, {
			set: function (new_value: string) {
				if (data_type.matches ("Date")) target [key] = new Date (new_value);
			}
		})

	}
}// DataType;
*/

/**** Types ****/


export type BaseModelArray = Array<IBaseModel>
export type StockModelArray = Array<IStockModel>


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
