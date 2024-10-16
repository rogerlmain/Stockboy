import { BaseProps, BaseState } from "Controls/Abstract/BaseProperties";
import { ReactElement } from "react";

import DataTable from "Controls/Tables/DataTable";
import BaseControl from "./BaseControl";



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


export abstract class DataControl<TProps extends DataProps = DataProps, TState extends DataState = DataState> extends BaseControl<TProps, TState> {
	protected load_screen: JSX.Element = <div>Loading...</div>
}// DataControl;