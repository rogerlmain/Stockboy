import BaseComponent, { BaseProps, BaseState } from "Controls/BaseComponent";


export default abstract class BasePage<props_model = BaseProps, state_model = BaseState> extends BaseComponent<props_model, state_model> {}