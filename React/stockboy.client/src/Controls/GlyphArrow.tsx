import React from "react"

import BaseComponent from "Controls/BaseComponent";
import StylesheetList from "../Classes/StylesheetList";


class GlyphArrowProps { direction: direction_type = direction_type.forwards }


export enum direction_type {
	forwards,
	backwards
}// direction_type;


const rotated = { transform: "rotate(180deg)" }


export default class GlyphArrow extends BaseComponent<GlyphArrowProps> {


	private static styles: String = `
		width: 0;
		height: 0;
		border: solid 0.5rem transparent;
		border-bottom-width: solid 0.5rem var(--glyph-arrow-color);
		border-top-color: var(--sort-arrow-color);
		cursor: pointer;
		margin-left: 0.5rem;
	`;


	private rotation = ():String => (this.props.direction == direction_type.forwards) ? "0" : "180";


	/********/


	public defaultProps: GlyphArrowProps;


	public constructor (props: GlyphArrowProps) { 
		super (props);
		StylesheetList.add_stylesheet ("div.glyph-arrow", GlyphArrow.styles);
	}// constructor;


	public render = () => <div className="glyph-arrow" style={this.props.direction == direction_type.forwards ? null : rotated} />


}// GlyphArrow;