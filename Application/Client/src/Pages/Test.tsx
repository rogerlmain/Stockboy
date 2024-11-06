import { Component } from "react";


type StringThing = String | Number;


class athing {
	public value: string = null;
}


export default class TestPage extends Component {

	public render () {

		let the_thing = new athing ().assign ({ value: "some text" });

		let first_thing = new athing ();
		let second_thing = new athing ();

		first_thing.value = "first thing";
		second_thing.value = "second thing";

		let the_array: Array<athing> = new Array<athing> ().assign ([first_thing.Duplicate, second_thing.Duplicate]).Duplicate;

		return <div>
			{`${the_thing.GetType}: ${JSON.stringify (the_thing)}`}<br />
			<br />
			{`${the_array.GetType}: ${JSON.stringify (the_array)} - ${the_array.map (item => <div>{`${item.GetType}: ${JSON.stringify (item)}`}</div>)}`}
		</div>
	}// render;

}// TestPage;