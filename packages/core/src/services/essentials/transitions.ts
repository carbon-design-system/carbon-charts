// Internal Imports
import { Service } from '../service';
import * as Configuration from '../../configuration';
import { Events } from './../../interfaces';
import * as Tools from '../../tools';

// D3 Imports
import { Transition, transition } from 'd3-transition';

interface setupTransitionConfigs {
	transition?: any; // d3 types are causing issues here, hence why using `any`
	name?: string;
	animate?: boolean;
}

export class Transitions extends Service {
	pendingTransitions = {};

	init() {
		this.services.events.addEventListener(Events.Model.UPDATE, () => {
			this.pendingTransitions = {};
		});
	}

	setupTransition({ transition: t, name, animate }: setupTransitionConfigs) {
		this.pendingTransitions[t._id] = t;
		t.on('end interrupt cancel', () => {
			delete this.pendingTransitions[t._id];
		});

		if (this.model.getOptions().animations === false || animate === false) {
			return t.duration(0);
		}

		return t.duration(
			Tools.getProperty(Configuration.transitions, name, 'duration') ||
				Configuration.transitions.default.duration
		);
	}

	getPendingTransitions() {
		return this.pendingTransitions;
	}
}
