// Internal Imports
import { Service } from "../service";

// // Carbon motion package
// import { easings, motion } from "@carbon/motion";

// D3 Imports
import { Transition, transition } from "d3-transition";

export class Transitions extends Service {
	// DOM Event target
	documentFragment: DocumentFragment;

	init() {
		// Setup the event fragment on the DOM
		this.documentFragment = document.createDocumentFragment();
	}

	getDefaultTransition(): Transition<any, any, any, any> {
		if (this._model.getOptions().animations === false || this._model.get("animations") === false) {
			return this.getInstantTransition();
		}

		return transition().duration(400);
			// .ease();
	}

	getInstantTransition(): Transition<any, any, any, any>  {
		return transition().duration(0);
	}
}
