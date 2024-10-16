import { Component } from "react";
import { IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";

import BaseControl from "./BaseControl";

export class ListControl<Props = IBaseProps, State = IBaseState> extends BaseControl<Props, State> {

	private key: number = 0;


	/********/

	protected get next_key () { return this.key++ }

}// BaseComponent;