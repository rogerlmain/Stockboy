import BaseControl from "Controls/Abstract/BaseControl";

import { ReactElement } from "react";


class StylesheetListProps {}


class StylesheetListState {
	list: Map<String, String> = null;
}// StylesheetListState;


export default class StylesheetList extends BaseControl<StylesheetListProps> {


	private static instance: StylesheetList = null;


	private static update_stylesheet (name: String, value: String, add: Boolean) {

		let list = StylesheetList.instance.state.list;

		if (is_null (list)) list = new Map<String, String> ();
		if (list.has (name)) return;

		if (add) {
			list.set (name, value);
		} else {
			list.delete (name);
		}// if;

		if (list.size == 0) list = null;

		StylesheetList.instance.setState ({ list });

	}// update_stylesheet;


	private render_stylesheets (): ReactElement {

		let styles: String = String.Empty;

		if (is_null (this.state.list)) return null;

		for (let [key, value] of this.state.list.entries ()) {
			styles = `
				${styles}

				${key} {
					${value}
				}/* ${key} */
			`
		}// for;

		return <>{styles}</>

	}// render_stylesheets;


	/********/


	public state = new StylesheetListState ();


	public constructor (props: StylesheetListProps) {
		super (props)
		StylesheetList.instance = this;
	}// constructor;


	public static add_stylesheet = (name: String, value: String) => StylesheetList.update_stylesheet (name, value, true);
	public static remove_stylesheet = (name: String, value: String) => StylesheetList.update_stylesheet (name, value, false);


	public render = () => this.render_stylesheets ();

}// StylesheetList