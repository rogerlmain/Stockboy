import Database from "Classes/Data/Database";
import Loading from "Controls/Common/Loading";
import Optional from "Controls/Common/Optional";
import BarGraph from "Controls/Graphs/BarGraph";
import PieChart from "Controls/Graphs/PieChart";

import { Container } from "Controls/Common";
import { CompanyPercentages, DividendTotalsParameters, GraphData, GraphDataList, Period } from "Models/Dividends";
import { Component } from "react";


class DividendDetailsState {
	public periodic_payout: GraphDataList = null;
	public dividend_percentages: GraphDataList = null;
	public company_percentages: CompanyPercentages = null;
}// DividendDetailsState;


export default class DividendDetails extends Component<Object, DividendDetailsState> {

	private monthly_dividends (title: string, data: GraphDataList) {

		if (not_set (data)) return String.Empty;

		return <Container>

			<div className="column-centered column-block with-headspace">
				<div className="title" style={{ marginBottom: 0 }}>{title}</div>
				<div>Total payout: ${data.reduce ((accumulator: number, item: GraphData) => accumulator + item.value, 0).round_to (2).padFractions (2)}</div>
			</div>

			<BarGraph values={data} minimum={0} maximum={100} increment={1} show_value={true} 
				index_field="description" value_field="value" width="3rem">
			</BarGraph>

		</Container>

	}// monthly_dividends;


	public state: DividendDetailsState = new DividendDetailsState ();


	public render () {
		return <div className="spaced-out column-centered full-page scrolling column-block with-elbow-padding" style={{ overflowY: "auto" }}>

			<Loading condition={this.state.Pristine}>
				<Container>

					<Optional condition={isset (this.state.dividend_percentages)}>
						<div className="title">Percentage earnings</div>
						<PieChart values={this.state.dividend_percentages} index_field="description" value_field="value" />
					</Optional>
					
					{this.monthly_dividends ("Total monthly dividends", this.state.periodic_payout)}
					{this.state.company_percentages?.Keys.map ((key: string) => {
						return this.monthly_dividends (`Monthly dividends for ${key}`, this.state.company_percentages [key]);
					})}

				</Container>
			</Loading>

		</div>
	}// render;


	public constructor (props: Object) {
		super (props);

		let parameters: DividendTotalsParameters = new DividendTotalsParameters ().assign ({ increment: Period.monthly });

		Database.get_dividend_totals (parameters).then ((response: GraphDataList) => this.setState ({ periodic_payout: new GraphDataList ().assign (response) }));
		Database.get_dividend_percentages (null).then ((response: GraphDataList) => this.setState ({ dividend_percentages: new GraphDataList ().assign (response) }));
		Database.get_company_percentages (null).then ((response: CompanyPercentages) => this.setState ({ company_percentages: new CompanyPercentages ().assign (response) }));

	}// constructor;

}// DividendDetails;