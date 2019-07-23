import { ThresholdTheme, LayoutGrowth } from "./enums";
import { Component } from "../components/component";

/**
 * customize the overlay contents
 */
export interface LayoutComponentChild {
	id: string;
	/**
	 * the component that'll be rendered inside layout child
	 */
	components: Array<Component>,
	/**
	 * size of the layout child
	 */
	size?: Number,
	/**
	 * how the layout child will grow or shrink in x & y directions
	 */
	growth?: {
		x: LayoutGrowth,
		y: LayoutGrowth
	}
}


/**
 * customize the overlay contents
 */
export interface OverlayOptions {
	/**
	 * types of overlay states
	 */
	types: {
		loading: string;
		noData: string;
	};
	/**
	 * raw html to be injected into the overlay container
	 */
	innerHTML: {
		loading: string;
		noData: string;
	};
}

/**
 * represents a threshold visually bringing attention to specific values/issues
 */
export interface Threshold {
	/**
	 * range of values the threshold should apply to
	 */
	range: Array<number>;
	/**
	 * theme of the threshold
	 */
	theme: ThresholdTheme;
}
