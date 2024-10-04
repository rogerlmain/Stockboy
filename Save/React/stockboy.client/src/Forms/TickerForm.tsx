import BaseComponent from "Controls/BaseComponent";


export default class TickerForm extends BaseComponent {

	public render = () => <form>
		<div className="two-column-grid">
			<label htmlFor="company_name">Company</label>
			<input type="text" id="company_name" name="name" />

			<label htmlFor="symbol">Ticker Symbol</label>
			<input type="text" id="symbol" name="symbol" />

			<label htmlFor="dividend_date">Dividend Date</label>
			<input type="date" id="dividend_date" name="dividend_date" />

			<label htmlFor="dividend_frequency">Dividend Frequency</label>
			<input type="numeric" id="dividend_frequency" name="dividend_frequency" />
		</div>
	</form>

}// TickerForm;