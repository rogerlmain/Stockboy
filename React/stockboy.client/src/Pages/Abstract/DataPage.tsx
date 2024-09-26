import BasePage from "Pages/Abstract/BasePage";

import { BaseProps, BaseState } from "Controls/BaseComponent";
import { NameValueCollection } from "Classes/Collections";


export class DataProps<model = {}> extends BaseProps{
	keys?: Array<NameValueCollection>;
}// DataProps;


export class DataState<model = {}> extends BaseState {
	data: Array<model> = null;
}// DataState;


export default abstract class DataPage<props_model extends DataProps = DataProps, state_model extends DataState = DataState> extends BasePage<props_model, state_model> {

	protected load_screen: JSX.Element = <div>Loading...</div>


	protected fetch = (url: RequestInfo, body?: any): any => new Promise ((resolve, reject) => {

		let parameters = {
			method: is_null (body) ? "get" : "post",
			headers: { "content-type": "application/json" }
		};

		if (not_null (body)) parameters ["body"] = JSON.stringify (body);

		fetch (`${api_url}/${url}`, parameters).then (response => response.json ()).then (response => resolve (response));

	});

}// DataPage;