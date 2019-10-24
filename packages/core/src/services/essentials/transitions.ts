// Internal Imports
import { Service } from "../service";
import * as Configuration from "../../configuration";
import { Tools } from "../../tools";

// D3 Imports
import { Transition, transition } from "d3-transition";

export class Transitions extends Service {
	pendingTransitions = {};
	// transitions: Transition<any, any, any, any>[];

	init() {
		this.services.events
			.addEventListener("model-update", () => {
				this.pendingTransitions = {};
			});
	}

	getTransition(name?: string, animate?: boolean): Transition<any, any, any, any> {
		if (this.model.getOptions().animations === false || animate === false) {
			return this.getInstantTransition(name);
		}

		const t: any = transition(name)
			.duration(Tools.getProperty(Configuration.transitions, name, "duration") || Configuration.transitions.default.duration);

		this.pendingTransitions[t._id] = t;
		t.on("end", () => {
			delete this.pendingTransitions[t._id];
		});

		return t;
	}

	getInstantTransition(name?: string): Transition<any, any, any, any>  {
		const t: any =  transition(name).duration(0);

		this.pendingTransitions[t._id] = t;
		t.on("end", () => {
			delete this.pendingTransitions[t._id];
		});

		return t;
	}

	getPendingTransitions() {
		return this.pendingTransitions;
	}
}
