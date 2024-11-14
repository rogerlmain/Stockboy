import DataTable from "Controls/Tables/DataTable";

import { BaseProps, BaseState } from "Controls/Abstract/BaseProperties";
import { Component, ReactElement } from "react";


export interface IDataPageControl extends DataControl {
	edit_form (row?: any): ReactElement;
	data_table: DataTable;
}// IDataPageControl;


export class DataProps extends BaseProps {}


export class DataState<model = {}> extends BaseState {
	data: Array<model> = null;
	broker_id: string = null;
	ticker_id: string = null;
}// DataState;


export abstract class DataControl<TProps extends DataProps = DataProps, TState extends DataState = DataState> extends Component<TProps, TState> {
	protected load_screen: JSX.Element = <div>Loading...</div>
}// DataControl;