import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import ListModel from "Models/ListModel"


export class SelectListProps extends BaseProps {
	items?: Array<ListModel> = null;
	selected_item?: string = null;
	name: string = null;
}// SelectListProps;


export default class SelectList extends BaseComponent<SelectListProps> {

	public render = () => <select id={this.props.id} name={this.props.name}>
		{this.props.items?.map ((item: ListModel) => <option value={item.id} selected={item.id == this.props.selected_item}>{item.name}</option>)}
	</select>;

}// SelectList;