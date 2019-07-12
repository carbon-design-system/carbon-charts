// Internal Imports
import { DOMUtils } from "./dom-utils";
import { ChartConfig, BaseChartOptions, AxisChartOptions } from "./interfaces";

export class ChartEssentials {
	holder: Element;
	svg: Element;
	domUtils: DOMUtils;

	// DOM Event target
	events: any;

	constructor(holder: Element, options: AxisChartOptions) {
		// Setup the event fragment on the DOM
		this.events = document.createDocumentFragment();

		this.domUtils = new DOMUtils(holder, options);
	}
}
