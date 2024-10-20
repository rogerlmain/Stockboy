import NameValueCollection from "Classes/Collections";
import DataTableControl from "Controls/DataTableControl";
import EditFormControl from "Controls/EditFormControl";
import TickerSelector from "Controls/TickerSelector";
import BasePage from "Pages/Abstract/BasePage";

import DataTable, { DataTableProperties } from "Controls/Tables/DataTable";

import { BaseProps, IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { DeleteForm } from "Forms/DeleteForm";
import { IBaseModel, IStockModel } from "Models/Abstract/BaseModel";
import { ComponentClass, RefObject, createRef } from "react";


class DataPageProps extends BaseProps implements IBaseProps {
	edit_form?: ComponentClass<any> = null;
	invisible_fields?: Array<string> = null;
	table_properties: DataTableProperties = null;
	name: string = null;
	onCreate?: Function = null;
	onEdit?: Function = null;
}// DataPageProps;


class DataPageState implements IBaseState {
	broker_id: string = null;
	ticker_id: string = null;
	selected_row: IStockModel = null;
	data: Array<IStockModel> = null;
}// TransactionState;


export default class DataPage extends BasePage <DataPageProps, DataPageState> {

	private edit_record = (row: IStockModel = null) => main_page.popup_window.show (<EditFormControl id={this.props.id} data={row} 
		body={this.props.edit_form} broker_id={this.state.broker_id} ticker_id={this.state.ticker_id} parent={this}>
	</EditFormControl>);


	private delete_record = (row: IStockModel = null) => main_page.popup_window.show (<DeleteForm table_name={this.props.name} record={row}
		table={this.table_control_ref.current}
		invisible_fields={this.props.invisible_fields}>
	</DeleteForm>);


	/********/


	public state: DataPageState = new DataPageState ();
	public table_control_ref: RefObject<DataTableControl> = createRef ();


	public fetch_parameters (): NameValueCollection<any> {

		let parameters: NameValueCollection<any> = new NameValueCollection<any> ();

		if (isset (this.state.broker_id)) parameters ["broker_id"] = this.state.broker_id;
		if (isset (this.state.ticker_id)) parameters ["ticker_id"] = this.state.ticker_id;

		return parameters;

	}// fetch_data;


	public render = () => <div className="page-layout">

		<form>
			<div className="wide-column-spaced column-margin row-block">
				<TickerSelector id="ticker_selector" data={this.state.data} selectable_header={true}
					broker_id={this.state.broker_id} ticker_id={this.state.ticker_id}
					onBrokerChange={(value: string) => this.setState ({ broker_id: value })}
					onTickerChange={(value: string) => this.setState ({ ticker_id: value })}>
				</TickerSelector>
			</div>
		</form>

		<DataTableControl name={this.props.name} ref={this.table_control_ref}
			table_properties={this.props.table_properties}
			procedure_name={`Get${this.props.name}s`} parameters={this.fetch_parameters ()}
			onCreate={this.edit_record}
			onEdit={(selected_row: IStockModel) => this.edit_record (selected_row)}
			onDelete={(selected_row: IStockModel) => this.delete_record (selected_row)}>
		</DataTableControl>

	</div>

}// DataPage;

