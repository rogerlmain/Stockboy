import { IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { Component } from "react";


export default class BaseControl<Props = IBaseProps, State = IBaseState> extends Component<Props, State> {

	protected get_key = (value: any):string => Object.values (value).join ().replace (/\W/g, String.Empty);

}// BaseControl;