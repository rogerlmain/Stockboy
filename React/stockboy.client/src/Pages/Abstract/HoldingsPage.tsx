import CheckboxPanel from "Controls/CheckboxPanel";
import HoldingsData from "Classes/HoldingsData";

import { DataControl, DataProps, DataState } from "Controls/Abstract/DataControl";
import { RefObject, createRef } from "react";


export class HoldingsProps extends DataProps {
	holdings: HoldingsData = null;
}// HoldingsProps;


export default abstract class HoldingsPage<TProps extends HoldingsProps, TState extends DataState> extends DataControl<TProps, TState> {

	protected checkbox_panel: RefObject<CheckboxPanel> = createRef ();

	/********/


	public update_list (filters: HoldingsFilterList) {
		this.setState ({ data: this.props.holdings.list (filters) });
	}// componentDidUpdate;


	public componentDidUpdate (props: TProps) {
		if (this.props.holdings != props?.holdings) this.update_list (this.checkbox_panel.current.state.filters);
	}// componentDidUpdate;


	public componentDidMount = () => this.componentDidUpdate (null);


}// HoldingsPage;