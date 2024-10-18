/**** Decorator Functions ****/


export function invisible (target: any, key: any) {

	let prototype = target.constructor.prototype;

	if (not_set (prototype.invisible_fields)) prototype.invisible_fields = new Array<string> ();
	prototype.invisible_fields.push (key);
}// invisible;


/**** Types ****/


export type StockModelArray = Array<IStockModel>


/**** Interfaces ****/


export interface IBaseModel { id?: string }


export interface IStockModel extends IBaseModel {
	broker_id: string;
	ticker_id: string;
}// IStockModel;


export interface IStockDataModel extends IStockModel {
	data?: IStockModel;
}// IStockDataModel


/**** Classes ****/


export abstract class BaseModel implements IBaseModel { 
	@invisible
	public id?: string = null;
}// BaseModel;


export /*abstract*/ class StockModel extends BaseModel {

	@invisible
	public broker_id: string;

	@invisible
	public ticker_id: string;

}// StockModel;


export /*abstract*/ class StockDataModel extends StockModel {
	public data?: IStockModel;
}// StockDataModel;