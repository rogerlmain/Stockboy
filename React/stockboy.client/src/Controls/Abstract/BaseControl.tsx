import { Component } from "react";
import { IBaseProps, IBaseState } from "./BaseProperties";

export default class BaseControl<Props = IBaseProps, State = IBaseState> extends Component<Props, State> {}