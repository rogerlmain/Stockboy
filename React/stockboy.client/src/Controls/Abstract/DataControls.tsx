import BasePage from "Pages/Abstract/BasePage";
import BaseComponent, { BaseProps, BaseState } from "Controls/BaseComponent";

import DataTable from "Controls/DataTable";

import { ReactElement } from "react";
import { NameValueCollection } from "Classes/Collections";
import { IBaseModel } from "Models/Abstract/BaseModel";


export interface IDataPage extends DataControl {
	edit_form (row?: any): ReactElement;
	data_table: DataTable;
}// IDataPage;


export class DataProps<model = {}> extends BaseProps {}


export class DataState<model = {}> extends BaseState {
	data: Array<model> = null;
	broker_id: string = null;
	ticker_id: string = null;
}// DataState;


export abstract class DataControl<TProps extends DataProps = DataProps, TState extends DataState = DataState> extends BasePage<TProps, TState> {
	protected load_screen: JSX.Element = <div>Loading...</div>
}// DataControl;