import { Component } from "react";

import NameValueCollection from "Classes/Collections";


/**** Interfaces ****/

export interface IBaseProps { id?: string }


export interface IBaseState {}


/**** Classes ****/


export class BaseProps implements IBaseProps { id?: string = null }


export class BaseState implements IBaseState {}


export class BaseComponent<props_model = BaseProps, state_model = BaseState> extends Component<props_model, state_model> {

	private key: number = 0;


	/********/

	protected get next_key () { return this.key++ }


}// BaseComponent;
