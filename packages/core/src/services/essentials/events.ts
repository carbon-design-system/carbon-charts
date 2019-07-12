// Internal Imports
import { Service } from "../service";
import { ChartModel } from "src/model";

export class Events extends Service {
	// DOM Event target
	documentFragment: DocumentFragment;

	init() {
		// Setup the event fragment on the DOM
		this.documentFragment = document.createDocumentFragment();
	}
}
