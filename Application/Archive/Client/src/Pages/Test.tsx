import { Component } from "react";
//import { DataType } from "Models/Abstract/BaseModels";


export function DataType (data_type: string) {
	return (target: Object, key: any) => {

		Object.defineProperty (target, key, {

			get: function () { 
				return this.format ("MMMM d, yyyy") 
			},
			set (new_value: string) {
				if (data_type.matches ("Date")) target [key] = new Date (new_value);
			}
		})

	}// return function;
}// DataType;

class TestModel {
	@DataType ("date")
	mydate: any;
}

export default class TestPage extends Component {

	public render () {

		let model = new TestModel ();
		model.mydate = "1967-04-13T00:00:00";

		return <div className="column-centered full-page flex-block">
			<label>Poignant Date:</label>
			<div>{model.mydate}</div>
		</div>

	}// render;

}// TestPage;