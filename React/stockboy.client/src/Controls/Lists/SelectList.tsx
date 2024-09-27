import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import ListModel from "Models/ListModel"


export class SelectListProps extends BaseProps {
	items?: Array<ListModel> = null;
	selected_item?: string = null;
	header?: string = "Select one";
	name: string = null;
}// SelectListProps;


export default class SelectList extends BaseComponent<SelectListProps> {

	public render = () => <select id={this.props.id} name={this.props.name} defaultValue={this.props.selected_item}>
		{(not_set (this.props.selected_item) && isset (this.props.header)) ? <option key={this.next_key} disabled selected>{this.props.header}</option> : null}
		{this.props.items?.map ((item: ListModel) => <option key={this.next_key} value={item.id}>{item.name}</option>)}
	</select>;

}// SelectList;