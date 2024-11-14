import { StockModel } from "Models/Abstract/BaseModels";


export  class SplitListModel extends StockModel {
	public broker: string = null;
	public ticker: string = null;
	public company: string = null;
	public previous: number = null;
	public current: number = null;
	public split_date: Date = null;
}// SplitListModel;


export  class SplitDataModel extends StockModel {
	public broker: string = null;
	public ticker: string = null;
	public company: string = null;
	public previous: number = null;
	public current: number = null;
	public split_date: Date = null;
}// SplitDataModel;