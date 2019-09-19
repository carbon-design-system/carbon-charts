// Internal Imports
import { Service } from "../service";
import * as Configuration from "../../configuration";
import { Tools } from "../../tools";

// // Carbon motion package
// import { easings, motion } from "@carbon/motion";

// D3 Imports
import { Transition, transition } from "d3-transition";

export class Transitions extends Service {
	getTransition(name?: string, animate?: boolean): Transition<any, any, any, any> {
		if (this.model.getOptions().animations === false || animate === false) {
			return this.getInstantTransition(name);
		}

		return transition(name)
			.duration(Tools.getProperty(Configuration.transitions, name, "duration") || Configuration.transitions.default.duration);
	}

	getInstantTransition(name?: string): Transition<any, any, any, any>  {
		return transition(name).duration(0);
	}
}
