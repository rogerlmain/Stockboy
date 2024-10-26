import { KeyValuePair } from "Classes/Collections";
import { HoldingsFilter, HoldingsModel } from "Classes/HoldingsData";
import { ProfitLossModel } from "Classes/ProfitLossData";

export { };

declare global {

	type FormInputItem = (HTMLInputElement | HTMLTextAreaElement)
	type FormItem = (FormInputItem | HTMLSelectElement)

	type FormItemList = NodeListOf<FormItem>

	type DataKey = string | KeyValuePair<string>

	type FieldValue = string | number | Date

	type HoldingsFilterList = Array<HoldingsFilter>

	type HoldingsArray = Array<HoldingsModel>
	type ProfitLossArray = Array<ProfitLossModel>

	type StringArray = Array<string>

	type FinancialDataList = HoldingsArray | ProfitLossArray

}// global;