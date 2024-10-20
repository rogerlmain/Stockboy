import BasePage from "Pages/Abstract/BasePage";
import LookupPage from "Controls/LookupPage";


export default class BrokersPage extends BasePage {
	public render () {
		return <LookupPage name="broker">
			<input type="text" name="name" placeholder="Name" />
		</LookupPage>
	}// render;

}// BrokersPage;