// Internal Imports
import { Service } from '../service'

export class Events extends Service {
	// DOM Event target
	documentFragment: DocumentFragment

	init() {
		// Setup the event fragment on the DOM
		this.documentFragment = document.createDocumentFragment()
	}

	addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
		this.documentFragment.addEventListener(type, listener)
	}

	removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
		this.documentFragment.removeEventListener(type, listener)
	}

	dispatchEvent(eventType: string, eventDetail?: object) {
		let newEvent: any
		if (eventDetail) {
			newEvent = new CustomEvent(eventType, {
				detail: eventDetail
			})
		} else {
			newEvent = document.createEvent('Event')
			newEvent.initEvent(eventType, false, true)
		}

		this.documentFragment.dispatchEvent(newEvent)
	}
}
