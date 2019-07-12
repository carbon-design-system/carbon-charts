// Internal Imports
import { Service } from "../service";

export class Events extends Service {
	// DOM Event target
	documentFragment: DocumentFragment;

	init() {
		// Setup the event fragment on the DOM
		this.documentFragment = document.createDocumentFragment();
	}

	getDocumentFragment() {
		return this.documentFragment;
	}

	dispatchEvent(eventType: string, eventDetail?: object) {
		let newEvent;
		if (eventDetail) {
			newEvent = new CustomEvent(eventType, {
				detail: eventDetail
			});
		} else {
			newEvent = document.createEvent("Event");
			newEvent.initEvent(eventType, false, true);
		}

		this.documentFragment.dispatchEvent(newEvent);
	}
}
