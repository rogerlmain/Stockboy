import BasePage from "Pages/Abstract/BasePage";
import LookupPage from "Controls/LookupPage";

export default class TickersPage extends BasePage {

	public render () {
		return <LookupPage name="ticker" fields={["symbol"]}>
			<div className="two-column-grid">
				<input type="text" name="name" placeholder="Name" />
				<input type="text" name="symbol" placeholder="Symbol" style={{ width: "4rem" }} />
				<select name="dividend_frequency">
					<option value={String.Empty}>Dividend Frequency</option>
					<option value="1">Monthly</option>
					<option value="3">Quarterly</option>
					<option value="12">Annually</option>
				</select>
				<input type="date" name="dividend_date" placeholder="Dividend Date" />
			</div>
		</LookupPage>
	}// render;

}// TickersPage;