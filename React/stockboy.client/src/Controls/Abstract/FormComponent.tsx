import NameValueCollection from "Classes/Collections";

import { BaseComponent, BaseProps, BaseState } from "Controls/BaseComponent";


export abstract class FormComponent<props_model = BaseProps, state_model = BaseState> extends BaseComponent<props_model, state_model> {
	public rounded_fields?: NameValueCollection<number> = null;
}// FormComponent;