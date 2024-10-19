import BasePage from "Pages/Abstract/BasePage";
import LookupPage from "Controls/LookupPage";

export default class TickersPage extends BasePage {

	public render () {
		return <LookupPage name="ticker" fields={["symbol"]}>
			<input type="text" name={"symbol"} placeholder="Symbol" style={{ width: "4rem" }} />
		</LookupPage>
	}// render;

}// TickersPage;