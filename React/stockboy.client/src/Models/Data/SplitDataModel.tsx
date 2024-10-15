import { StockDataModel } from "Models/Abstract/BaseModel";


export default class SplitDataModel extends StockDataModel {
	public broker: string = null;
	public company: string = null;
	public symbol: string = null;
	public previous: number = null;
	public current: number = null;
	public split_date: Date = null;
}// SplitDataModel;