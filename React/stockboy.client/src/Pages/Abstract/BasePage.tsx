import { IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { Component } from "react";


export default abstract class BasePage<Props = IBaseProps, State = IBaseState> extends Component<Props, State> {}