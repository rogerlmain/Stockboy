import { Component, createRef, ReactElement, RefObject } from "react";


class ScrollBlockProps { public children: ReactElement }


class ScrollBlockState { public scrolling: boolean = false }


export default class ScrollBlock extends Component<ScrollBlockProps, ScrollBlockState> {

	private scrollbox_ref: RefObject<HTMLDivElement> = createRef ();
	private get scrollbox () { return this.scrollbox_ref.current }


	/********/


	public state: ScrollBlockState = new ScrollBlockState ();


	public componentDidMount () {

		new ResizeObserver (() => {
			if (not_set (this.scrollbox)) return;
			this.setState ({ scrolling: (this.scrollbox.scrollHeight > this.scrollbox.parentElement.offsetHeight) });
		}).observe (this.scrollbox.parentElement);

	}// componentDidMount;


	public render () {
		return <div ref={this.scrollbox_ref} style={{ 
			overflowY: this.state.scrolling ? "scroll" : "visible"
		}}>{this.props.children}</div>
	}// render;

}// ScrollBlock;