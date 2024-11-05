import { IBaseModel } from "Models/Abstract/BaseModels";


/**** Interfaces ****/

export interface IBaseProps { id?: string }

export interface IHoldingsProps extends IBaseProps { filters: HoldingsFilterList }

export interface IFormProps extends IBaseProps { data?: IBaseModel }

export interface IBaseState {}

export interface IFormState {}


/**** Classes ****/


export class BaseProps implements IBaseProps { public id?: string = null }

export class BaseState implements IBaseState {}


