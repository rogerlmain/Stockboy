import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import ListModel from "Models/ListModel"


export class SelectListProps extends BaseProps {
	items?: Array<ListModel> = null;
	selected_item?: string = "two";
	header?: string = "Select one";
	name: string = null;
}// SelectListProps;

	 {/*defaultValue=this.props.selected_item || header"}*/}

export default class SelectList extends BaseComponent<SelectListProps> {

	state = { sel: "two " }



	//public render = () => <select id={this.props.id} name={this.props.name} defaultValue={"header"} value={"header"}>
	//	{/*{(not_set (this.props.selected_item) && isset (this.props.header)) ? */}<option key={this.next_key} value="header">{this.props.header}</option>{/* : null}*/}
	//	{this.props.items?.map ((item: ListModel) => <option key={this.next_key} value={item.id}>{item.name}</option>)}
	//</select>;

	render = () => <select value={this.state.sel}>
		<option value="one">One</option>
		<option value="two">Two</option>
	</select>

}// SelectList;