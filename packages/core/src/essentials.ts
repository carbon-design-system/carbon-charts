// Internal Imports
import { DOMUtils } from "./dom-utils";

export class ChartEssentials {
	holder: Element;
	svg: Element;
	domUtils: DOMUtils;

	// DOM Event target
	events: any;

	constructor() {
		// Setup the event fragment on the DOM
		this.events = document.createDocumentFragment();
	}
}
