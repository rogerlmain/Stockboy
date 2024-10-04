import React from "react";


export class BaseProps { id?: string = null }


export class BaseState {}


export default class BaseComponent<props_model = BaseProps, state_model = BaseState> extends React.Component<props_model, state_model> {

	private key: number = 0;

	protected get next_key () { return this.key++ }


}// BaseComponent;