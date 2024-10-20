import BasePage from "Pages/Abstract/BasePage";
import LookupPageControl from "Controls/LookupPageControl";


export default class BrokersPage extends BasePage {
	public render () {
		return <LookupPageControl name="broker">
			<input type="text" name="name" placeholder="Name" />
		</LookupPageControl>
	}// render;

}// BrokersPage;