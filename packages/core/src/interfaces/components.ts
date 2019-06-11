import { ThresholdTheme } from "./enums";

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
