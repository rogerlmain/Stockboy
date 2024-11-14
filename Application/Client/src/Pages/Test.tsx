import { Component } from "react";
import { DateType } from "Models/Abstract/BaseModels";


type InnerObjectArray = Array<InnerObject>


function TypeSafe (object_type: any = null) {
	return function (target: any, key: any) {

		if (object_type == Date) {

			let date_value: Date = null;
			
			return Object.defineProperty (target, key, {
				get: function (): string {
					return date_value.format ("MMMM d, yyyy");
				},
				set: function (new_value: string) {
					date_value = new Date (new_value);
				}
			});

		}// if;

		let prototype: any = target.constructor.prototype;

		if (not_set (prototype.properties)) prototype.properties = new Array<Object> ();
		prototype.properties [key] = object_type;
		return null;
	};
}// TypeSafe;


class InnerObject {
	public string_value: string;

	@TypeSafe (Date)
	public date_value: DateType;
}


class OuterObject {

	@TypeSafe (InnerObject)
	public inner_objects: InnerObjectArray = null;
	public something_else: String = null;

	@TypeSafe (InnerObject)
	public some_object: InnerObject = null;
}

declare global {
	interface Object {
		properties: StringArray;
		assign_stuff (template: any);
	}
}

Object.prototype.assign_stuff = function (template: any): void {

	function create_element (element_type: any, template: any) {

		if (Object.notObject (template)) return template;
		if (not_set (element_type)) element_type = typeof template;

		let new_element = new element_type ();

		new_element.assign_stuff (template);
		return new_element;

	}// create_element;


	for (let item of Object.getOwnPropertyNames (template)) {

		let element = this.properties?.[item];

		if (not_defined (template [item])) return;

		if (Array.isArray (template [item])) {

			this [item] = new Array<typeof element> ();

			for (let child of template [item]) {
				this [item].push (create_element (element, child));
			}// for;

			continue;

		}// if;

		this [item] = create_element (element, template [item]);

	}// for;
}// assign_stuff;

export default class TestPage extends Component {

	private test_object: OuterObject = new OuterObject ();


	public render () {
		return <div className="full-page column-centered column-block">
{/*
			{this.test_object.inner_objects [0].string_value}
			{this.test_object.inner_objects [0].date_value as string}<br />
			<br />
			{JSON.stringify (this.test_object)}
*/}
		</div>;
	}// render;


	public constructor () {

		super (null, null);

		let outer_object = new OuterObject ();
		let inner_object = new InnerObject ();

		inner_object.string_value = "The most significant date in history: ";
		inner_object.date_value = "1967-04-13T00:00:00";

		outer_object.inner_objects = new Array<InnerObject> ();
		outer_object.inner_objects.push (inner_object);

		outer_object.something_else = "more information";
		outer_object.some_object = new InnerObject ();

		outer_object.some_object.string_value = "Another significant date: ";
		outer_object.some_object.date_value = "1776-07-14T00:00:00";

		this.test_object.assign_stuff (JSON.parse (JSON.stringify (outer_object)));

	}

}// TestPage;