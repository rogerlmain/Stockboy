import TypedArray from "Classes/TypedArray";

import { GraphData, GraphDataList } from "Models/Dividends";
import { Component, createRef, CSSProperties, RefObject } from "react";


class PieChartDataList extends TypedArray { public constructor () { super (PieChartData) } }


class PieChartData extends GraphData {
	public percentage: number = null;
	public previous_angle: number = null;
	public next_angle: number = null;
	public color_allocation: string = null;
}// PieChartData;


class PieChartProps {
	public size: string;
	public values: GraphDataList;
	public index_field: string;
	public value_field: string
}// PieChartProps;


class PieChartState {
	public pieces: CSSProperties = null;
	public values: PieChartDataList = null;
}// PieChartState;


export default class PieChart extends Component<PieChartProps> {

	private pie_reference: RefObject<HTMLDivElement> = createRef ();

	private get pie_chart (): HTMLDivElement { return this.pie_reference.current }


	private get legend () { return this.state.values.map ((value: PieChartData) => <div className="slightly-spaced-out row-block">
		<div className="legend-color-block" style={{ backgroundColor: value.color_allocation }} />
		<div>{value.description} ({Math.round (value.percentage * 100)}%)</div>
	</div>) }


	private get pie_chart_style (): CSSProperties {

		return {
			height: this.props.size,
			borderRadius: "50%",
			border: "solid 1px black",
		}// style;
	}// pie_chart_style;


	private dividing_line_style (item: PieChartData): CSSProperties {
		return {
			position: "absolute",
			width: "0",
			height: "100px",
			borderLeft: "solid 1px black",
			top: 0,
			left: "50%",
			transformOrigin: "0 100%",
			transform: `rotate(${item.next_angle}deg)`,
		}// style;
	}// dividing_line_style;


	private HSBToRGB (hue, saturation = 100, brightness = 100) {
		saturation /= 100;
		brightness /= 100;
		const k = (n) => (n + hue / 60) % 6;
		const f = (n) => Math.round (255 * (brightness * (1 - saturation * Math.max (0, Math.min (k (n), 4 - k (n), 1)))));
		return [f (5), f (3), f (1)];
	}// HSBToRGB;


	private next_color (total_items: number, index: number): string {

		let hue = (360 / (total_items + 1)) * (index);
		let rgb = this.HSBToRGB (hue);

		let hex_value = (value: number) => value.toString (16).padStart (2, "0");

		let result: string = `#${hex_value (rgb [0])}${hex_value (rgb [1])}${hex_value (rgb [2])}`;

		return result;

	}// next_color;


	private get_percentages () {

		let total: number = 0;

		this.state.values.forEach ((item: PieChartData) => total += item.value);

		this.state.values.forEach ((item: PieChartData) => {

			let previous_index: number = this.state.values.indexOf (item) - 1;
			let previous_item: PieChartData = (previous_index < 0) ? null : this.state.values [previous_index];

			item.percentage = item.value / total;
			item.previous_angle = (previous_item?.next_angle ?? 0);
			item.next_angle = item.previous_angle + Math.round (360 * item.percentage);
			item.color_allocation = this.next_color (this.state.values.length, this.state.values.indexOf (item));

		});

	}// get_percentages;


	private get_pieces (): CSSProperties {

		let pieces: string = null;

		this.state.values.forEach ((item: PieChartData) => {
			pieces = `${not_null (pieces) ? pieces + comma : String.Empty} ${item.color_allocation} ${item.previous_angle}deg ${item.next_angle}deg`;
		});
		
		return { backgroundImage: `conic-gradient(${pieces})`, }

	}// get_pieces;


	public import_values () {
		this.props.values.forEach ((item: any) => {

			let next_item: PieChartData = new PieChartData ();

			next_item.description = item [this.props.index_field];
			next_item.value = item [this.props.value_field];

			if (is_null (this.state.values)) this.state.values = new PieChartDataList ();
			this.state.values.push (next_item);

		});
	}// import_values;


	/********/


	public state: PieChartState = new PieChartState ();


	public static defaultProps: PieChartProps = {
		size: "200px",
		values: null,
		index_field: null,
		value_field: null,
	}// defaultProps;


	public componentDidUpdate (props: PieChartProps = null, state: PieChartState = null) {
		if (is_null (this.state.pieces) || !this.state.pieces.matches (state.pieces)) this.setState ({ pieces: this.get_pieces () });
	}// componentDidUpdate;


	public componentDidMount () {
		this.pie_chart.style.width = window.getComputedStyle (this.pie_chart).height;
		this.componentDidUpdate ();
	}// componentDidMount;


	public render () {

		let pieces: CSSProperties = this.get_pieces ();

		return <div className="spaced-out row-centered row-block">

			<div className="slightly-spaced-out column-block">{this.legend}</div>

			<div style={{ position: "relative" }}>
				<div style={this.pie_chart_style.assign (pieces)} ref={this.pie_reference} />
					{this.state.values.map ((item: PieChartData) => {
						return <div style={this.dividing_line_style (item)} />
					})}
				{/*</div>*/}
			</div>
		</div>
	}// render;


	public constructor (props: PieChartProps) {
		super (props);
		this.import_values ();
		this.get_percentages ();
	}// constructor;

}// PieChart;