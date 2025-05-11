import StockboyAPI from "Classes/StockboyAPI";
import { CompanyPercentages, DateRangeParameters, DividendTotalsParameters, GraphDataList } from "Models/Dividends";


export default class Database {

	public static get_dividend_totals = (parameters: DividendTotalsParameters): Promise<GraphDataList> => new StockboyAPI ().fetch_data ("GetDividendTotals", parameters);
	public static get_dividend_percentages = (parameters: DateRangeParameters): Promise<GraphDataList> => new StockboyAPI ().fetch_data ("GetDividendPercentages", parameters);
	public static get_company_percentages = (parameters: DateRangeParameters): Promise<CompanyPercentages> => new StockboyAPI ().fetch_data ("GetCompanyPercentages", parameters);

}// MigrationDatabase;