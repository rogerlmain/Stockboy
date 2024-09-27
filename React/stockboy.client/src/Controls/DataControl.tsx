import BasePage from "Pages/Abstract/BasePage";

import { BaseProps, BaseState } from "Controls/BaseComponent";
import { NameValueCollection } from "Classes/Collections";


export class DataProps<model = {}> extends BaseProps{
	keys?: Array<NameValueCollection> = null;
}// DataProps;


export class DataState<model = {}> extends BaseState {
	data: Array<model> = null;
}// DataState;


export default abstract class DataControl<props_model extends DataProps = DataProps, state_model extends DataState = DataState> extends BasePage<props_model, state_model> {

	protected load_screen: JSX.Element = <div>Loading...</div>


	protected fetch = (url: RequestInfo, body: any = null): any => new Promise ((resolve, reject) => {

		let parameters = {
			method: is_null (body) ? "get" : "post",
			headers: { "content-type": "application/json" }
		};

		if (not_null (body)) {
			if (body instanceof FormData) body = Object.fromEntries (body);
			parameters ["body"] = JSON.stringify (body);
		}// if;

		fetch (`${api_url}/${url}`, parameters).then (response => response.json ()).then (response => resolve (response));

	});

}// DataControl;