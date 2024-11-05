import HoldingsData, { HoldingsModel } from "Classes/HoldingsData";

//import { StockModel } from "Models/Abstract/BaseModels";


//type DividendSummaryArray = Array<DividendSummary>;


//class DividendSummary extends StockModel {
//	public payout: number;
//}// DividendSummary;


export class ProfitLossModel extends HoldingsModel {
	public dividend_payout: number;
	public value_profit: number;
	public overall_profit: number;
}// ProfitLossModel;

export default class ProfitLossData extends HoldingsData {

/*
	protected override master_list: ProfitLossArray = null;

	public constructor () {

		super (false);

		event_handler.addEventListener ("profit-loss", ((event: CustomEvent<HoldingsData>) => {
			Object.assign (this, event.detail);

			APIClass.fetch_data ("GetDividendTotals").then ((result: DividendSummaryArray) => {

				result.forEach ((summary: DividendSummary) => {

					let model: ProfitLossModel = this.master_list.find (item => (item.broker_id == summary.broker_id) && (item.ticker_id == summary.ticker_id));

					if (is_null (model)) return;
					model.dividend_payout = summary.payout;

				});

				this.master_list.forEach ((item: ProfitLossModel) => {
					item.value_profit = item.value - item.current_purchase_cost;
					item.overall_profit = (item.sales_profit ?? 0) + (item.dividend_payout ?? 0) + (item.value_profit ?? 0);
				});

				event_handler.dispatchEvent (new CustomEvent<ProfitLossData> ("dividends", { detail: this }));

			});

		}) as EventListener)
	}// constructor;
*/
}// ProfitLossData;



