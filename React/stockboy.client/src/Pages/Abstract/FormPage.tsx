import BasePage from "Pages/Abstract/BasePage";

import { IBaseState } from "Controls/Abstract/BaseProperties";
import { IStockDataModel, IStockModel, StockDataModel } from "Models/Abstract/BaseModel";


export abstract class FormPage<Props extends IStockDataModel = StockDataModel, State = IBaseState> extends BasePage<Props, State> {

	protected get edit_mode () { return not_null (this.props.data) }

}// FormPage;