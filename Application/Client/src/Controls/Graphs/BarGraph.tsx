import Optional from "Controls/Common/Optional";
import { Component, CSSProperties } from "react";


const increments: number = 6;


class BarGraphProps {
	public values: AnyArray;
	public minimum: number;
	public maximum: number;
	public increment: number;
	public index_field: string;
	public value_field: string;
	public width?: string;
	public show_value?: boolean;
	public bar_marker_processor?: Function;
}// BarGraphProps;


export default class BarGraph extends Component<BarGraphProps> {

	private get graph_style (): CSSProperties {
		let result: CSSProperties = {}
		if (isset (this.props.width)) result ["width"] = this.props.width;
		return result;
	}// graph_style;


	private bar_markers () {

		let result: ReactElementList = null;

		this.props.values.forEach ((value: any) => {
			if (is_null (result)) result = new ReactElementList ();
			result.push (<div className="bar-marker" style={this.graph_style}>{value [this.props.index_field]}</div>)
		});

		return result;

	}// bar_markers;


	private increment_markers (maximum_height: number) {

		let increment = Math.round (maximum_height / increments);
		let result: ReactElementList = null;

		for (let index = 0; index <= maximum_height - increment; index += increment) {
			if (is_null (result)) result = new ReactElementList ();
			result.push (<div>{index}</div>);
		}// for;

		result.push (<div>{Math.floor (maximum_height) + 1}</div>);

		return result;

	}// increment_markers;


	private show_bars (maximum_height: number): ReactElementList {

		let result: ReactElementList = null;

		this.props.values.forEach ((value: any) => {

			let height: number = Math.round (((value?.[this.props.value_field] ?? 0) / maximum_height) * 100);

			if (is_null (result)) result = new ReactElementList ();

			result.push (<div className="bar-container" style={this.graph_style}>
				<div className="bar-entry" style={{ height: `${height}%` }}>
					<Optional condition={this.props.show_value}>
						{value?.[this.props.value_field]}
					</Optional>
				</div>
			</div>);

		});

		return result;

	}// show_bars;


	/********/


	public static defaultProps: BarGraphProps = {
		values: null,
		minimum: null,
		maximum: null,
		increment: null,
		index_field: null,
		value_field: null,
		width: null,
		show_value: false,
		bar_marker_processor: null,
	}// defaultProps;


	public render () {

		let maximum_height: number = Math.max (...this.props.values.map ((value: any) => value [this.props.value_field]), 9);

		return <div className="shrink-wrapped two-column-grid">

			<div className="totally-spaced-out fill-height column-block backwards">{this.increment_markers (maximum_height)}</div>

			<div className="shrink-wrapped bar-graph row-block">
				<div className="padded-graph" />
				{this.show_bars (maximum_height)}
				<div className="padded-graph" />
			</div>

			<div />

			<div className="fill-width row-block">
				<div className="padded-graph" />
				{this.bar_markers ()}
				<div className="padded-graph" />
			</div>

		</div>
	}// render;

}// BarGraph;