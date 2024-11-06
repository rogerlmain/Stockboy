import StylesheetList from "Classes/StylesheetList";

import { Component } from "react";


export enum direction_type {
	forwards,
	backwards
}// direction_type;


const rotated = { transform: "rotate(180deg)" }


class GlyphArrowProps { direction: direction_type }


export default class GlyphArrow extends Component<GlyphArrowProps> {


	public static defaultProps: GlyphArrowProps = {
		direction: direction_type.forwards,
	}// defaultProps;


	public render = () => <div className="glyph-arrow" style={this.props.direction == direction_type.forwards ? null : rotated} />


}// GlyphArrow;