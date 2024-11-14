import { IBaseModel } from "Models/Abstract/BaseModels";
import { Component, MouseEvent } from "react";


type ButtonFunction = (row?: IBaseModel) => void;


class TableButtonProps {

	selected_row: IBaseModel;

	onCreate?: ButtonFunction;
	onEdit?: ButtonFunction;
	onDelete?: ButtonFunction;

}// TableButtonProps;


export default class TableButtons extends Component<TableButtonProps> {

	public render () {
		return <div className="container"> 

			<button id="add_button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
				event.preventDefault ();
				if (isset (this.props.onCreate)) return this.props.onCreate ();
				throw "No create handler defined";
			}}>Add</button>

			<div className="container" style={{display: isset (this.props.selected_row) ? null : "none"}}>

				<button id="edit_button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
					event.preventDefault ();
					if (isset (this.props.onEdit)) return this.props.onEdit (this.props.selected_row);
					throw ("No edit handler defined");
				}}>Edit</button>

				<button id="delete_button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
					event.preventDefault ();
					if (isset (this.props.onDelete)) return this.props.onDelete (this.props.selected_row);
					throw ("No delete handler defined");
				}}>Delete</button>

			</div>

		</div>
	}// render;

}// TableButtons;