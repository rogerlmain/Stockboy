import BaseModel from "Models/Abstract/BaseModel";
import { IDataPageModel } from "Pages/DataPage";


export default class SplitModel extends BaseModel implements IDataPageModel {
	public broker_id: string = null;
	public ticker_id: string = null;
	public broker: string = null;
	public company: string = null;
	public symbol: string = null;
	public previous: number = null;
	public current: number = null;
	public split_date: Date = null;
}// SplitModel;