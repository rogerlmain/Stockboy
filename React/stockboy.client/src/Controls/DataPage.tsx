import NameValueCollection from "Classes/Collections";
import DataTableControl from "Controls/DataTableControl";
import EditFormControl from "Controls/EditFormControl";
import TickerSelector from "Controls/TickerSelector";
import BasePage from "Pages/Abstract/BasePage";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { BaseProps, IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { DeleteForm } from "Forms/DeleteForm";
import { BaseModelArray, IBaseModel, IStockModel, StockModelArray } from "Models/Abstract/BaseModel";
import { ComponentClass, ReactElement, RefObject, createRef } from "react";


class DataPageProps extends BaseProps implements IBaseProps {
	edit_form?: ComponentClass<any> = null;
	children?: ReactElement = null;
	invisible_fields?: Array<string> = null;
	required_parameters?: Array<string> = null;
	table_properties: DataTableProperties = null;
	procedure_name?: string = null;
	blank_label?: string = null;
	editable?: boolean = true;
	name: string = null;
	onDataChange?: DataPageDataChangeFunction = null;
	onCreate?: Function = null;
	onEdit?: Function = null;
}// DataPageProps;


class DataPageState implements IBaseState {
	broker_id: string = null;
	ticker_id: string = null;
	selected_row: IStockModel = null;
	data: Array<IStockModel> = null;
}// TransactionState;


export type DataPageDataChangeFunction = (data: StockModelArray) => void;


export default class DataPage extends BasePage <DataPageProps, DataPageState> {

	private edit_record = (row: IStockModel = null) => popup_window.show (<EditFormControl id={this.props.id} data={row} 
		body={this.props.edit_form} broker_id={this.state.broker_id} ticker_id={this.state.ticker_id} parent={this}>
	</EditFormControl>);


	private delete_record = (row: IStockModel = null) => popup_window.show (<DeleteForm table_name={this.props.name} record={row}
		table={this.data_table_control.current}
		invisible_fields={this.props.invisible_fields}>
	</DeleteForm>);


	private fetch_parameters (): NameValueCollection<any> {

		let parameters: NameValueCollection<any> = new NameValueCollection<any> ();

		if (isset (this.state.broker_id)) parameters ["broker_id"] = this.state.broker_id;
		if (isset (this.state.ticker_id)) parameters ["ticker_id"] = this.state.ticker_id;

		return parameters;

	}// fetch_parameters;


	private required_parameters_provided (): boolean {

		if (not_null (this.props.required_parameters)) for (let parameter of this.props.required_parameters) {
			if (!Object.keys (this.state).contains (parameter)) return false;
			if (not_set (this.state [parameter])) return false;
		}// for;

		return true;

	}// required_parameters_provided;


	/********/


	public state: DataPageState = new DataPageState ();
	public data_table_control: RefObject<DataTableControl> = createRef ();


	public componentDidUpdate (props: DataPageProps, state: DataPageState) {
		if (isset (state.data) && (!state.data.matches (this.state?.data))) this.props.onDataChange (state.data);
	}// componentDidUpdate;


	public render = () => <div className="page-layout">

		<form>
			<div className="wide-column-spaced column-margin row-block">
				<TickerSelector id="ticker_selector" selectable_header={true}
					broker_id={this.state.broker_id} ticker_id={this.state.ticker_id}
					onBrokerChange={(value: string) => this.setState ({ broker_id: value })}
					onTickerChange={(value: string) => this.setState ({ ticker_id: value })}>
				</TickerSelector>
			</div>
		</form>

		{this.required_parameters_provided () ? <DataTableControl name={this.props.name} ref={this.data_table_control}
			table_properties={this.props.table_properties}
			procedure_name={isset (this.props.procedure_name) ? this.props.procedure_name : `Get${this.props.name}s`} 
			parameters={this.fetch_parameters ()}
			blank_label={this.props.blank_label}
			editable={this.props.editable}
			onCreate={this.edit_record}
			onEdit={(selected_row: IStockModel) => this.edit_record (selected_row)}
			onDelete={(selected_row: IStockModel) => this.delete_record (selected_row)}
			onChange={(data: BaseModelArray) => (isset (this.props.onDataChange)) ? this.props.onDataChange (data as StockModelArray) : null}>

			{this.props.children}

		</DataTableControl> : null}

	</div>

}// DataPage;

