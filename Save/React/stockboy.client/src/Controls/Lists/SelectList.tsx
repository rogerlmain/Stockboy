import BaseComponent, { BaseProps } from "Controls/BaseComponent";
import ListModel from "Models/ListModel"


export class SelectListProps extends BaseProps {
	items?: Array<ListModel> = null;
	selected_item?: string = null;
	header?: string = "Select one";
	name: string = null;
	onChange?: React.ChangeEventHandler<HTMLSelectElement> = null;
	disabled?: boolean = false;
}// SelectListProps;


		/*defaultValue={this.props.selected_item/* || "header"*/



export default class SelectList extends BaseComponent<SelectListProps> {

	public render = () => {

		return <select id={this.props.id} name={this.props.name} 

		onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.props.onChange (event)}

		disabled={this.props.disabled}>

		{(not_set (this.props.selected_item) && isset (this.props.header)) ? <option key={this.next_key} value="header">{this.props.header}</option> : null}
		{this.props.items?.map ((item: ListModel) => <option key={this.next_key} value={item.id} selected={item.id == this.props.selected_item}>{item.name}</option>)}

	</select>};

}// SelectList;