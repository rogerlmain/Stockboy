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

}// DataControl;