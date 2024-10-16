import { StockDataModel } from "Models/Abstract/BaseModel";


export  class SplitListModel extends StockDataModel {
	public broker: string = null;
	public ticker: string = null;
	public company: string = null;
	public previous: number = null;
	public current: number = null;
	public split_date: Date = null;
}// SplitListModel;


export  class SplitDataModel extends StockDataModel {
	public broker: string = null;
	public ticker: string = null;
	public company: string = null;
	public previous: number = null;
	public current: number = null;
	public split_date: Date = null;
}// SplitDataModel;