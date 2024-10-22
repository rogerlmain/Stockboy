import { Component } from "react";
import { IBaseProps, IBaseState } from "./BaseProperties";

export default class BaseControl<Props = IBaseProps, State = IBaseState> extends Component<Props, State> {

	protected get_key = (value: any):string => Object.values (value).join ().replace (/\W/g, String.Empty);

}// BaseControl;