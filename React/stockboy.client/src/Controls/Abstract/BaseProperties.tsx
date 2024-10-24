/**** Interfaces ****/

export interface IBaseProps { id?: string }

export interface IHoldingsProps extends IBaseProps { filters: HoldingsFilterList }

export interface IBaseState {}


/**** Classes ****/


export class BaseProps implements IBaseProps { id?: string = null }


export class BaseState implements IBaseState {}


