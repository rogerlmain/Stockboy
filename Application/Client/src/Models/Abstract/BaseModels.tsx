/**** Decorator Functions ****/

export function invisible (target: any, key: any) {
	if (is_null (target.constructor.invisible_fields)) target.constructor.invisible_fields = new Array<string> ();
	target.constructor.invisible_fields.push (key);
}// invisible;


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

	@invisible
	public id?: string = null;

	public static invisible_fields: StringArray = null;

}// BaseModel;


export class DataModel extends BaseModel {

	@invisible
	public deleted?: boolean = null;
	
}// DataModel;


export class StockModel extends DataModel {

	@invisible
	public broker_id: string;

	@invisible
	public ticker_id: string;

}// StockModel;
