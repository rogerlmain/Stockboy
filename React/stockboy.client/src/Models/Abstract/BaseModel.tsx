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


export abstract class BaseModel implements IBaseModel { public id?: string = null }


export abstract class StockModel extends BaseModel implements IStockModel {
	broker_id: string;
	ticker_id: string;
}// StockModel;


export abstract class StockDataModel extends StockModel implements IStockDataModel {
	data?: IStockModel;
}// StockDataModel;