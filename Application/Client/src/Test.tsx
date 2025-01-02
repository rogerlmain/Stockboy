import { Component, RefObject, createRef } from "react";

import StockboyAPI from "Classes/StockboyAPI";
import PopupWindow from "Controls/Common/Windows/PopupWindow";


class TestState {
	public data: String = null;
}// TestState;


type SomeArray = Array<SomeThing>
type AnotherArray = Array<AnotherThing>


class SomeThing {

	public name: string = null;
	public values: AnotherArray = null;

	public constructor (name: string, values: AnotherArray) {
		this.name = name;
		this.values = values;
	}

}


class AnotherThing {

	public name: string = null;
	public value: string = null;

	public constructor (name: string, value: string) {
		this.name = name;
		this.value = value;
	}

}


export default class TestPage extends Component<Object, TestState> {

	public the_array: SomeArray = null;

	public render () {
		return <div className="centered full-page">
		</div>
	}// render;

	public constructor (props: Object) {

		super (props);

		let first_nested_array: AnotherArray = new Array<AnotherThing> ();
		first_nested_array.push (new AnotherThing ("one", "first"));
		first_nested_array.push (new AnotherThing ("two", "second"));

		let second_nested_array: AnotherArray = new Array<AnotherThing> ();
		second_nested_array.push (new AnotherThing ("three", "third"));
		second_nested_array.push (new AnotherThing ("four", "fourth"));

		let the_array: SomeArray = new Array<SomeThing> ();
		the_array.push (new SomeThing ("uno", first_nested_array));
		the_array.push (new SomeThing ("dos", second_nested_array));

		let my_array = the_array.duplicate;

		let x = 0;

	}

}// TestPage;