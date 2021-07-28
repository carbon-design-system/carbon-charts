// Internal Imports
import { Service } from '../service';
import * as Configuration from '../../configuration';
import { Events } from './../../interfaces';
import { Tools } from '../../tools';

// D3 Imports
import { Transition, transition } from 'd3-transition';
import { Selection } from 'd3-selection';

interface getTransitionSelectionConfigs {
	selection?: Selection<any, any, any, any>;
	name?: string;
	animate?: boolean;
}

interface setupTransitionConfigs {
	transition?: any; // unfortunately d3 types are causing issues here, hence why using `any`
	name?: string;
	animate?: boolean;
}

export class Transitions extends Service {
	pendingTransitions = {};
	// transitions: Transition<any, any, any, any>[];

	init() {
		this.services.events.addEventListener(Events.Model.UPDATE, () => {
			this.pendingTransitions = {};
		});
	}

	getTransition(
		selection?: Selection<any, any, any, any>,
		name?: string,
		animate?: boolean
	): Transition<any, any, any, any> {
		if (this.model.getOptions().animations === false || animate === false) {
			return this.getInstantTransition(name);
		}
		// console.log('non-instant', name);

		// @ts-ignore
		const t: any = transition(selection, name).duration(
			Tools.getProperty(Configuration.transitions, name, 'duration') ||
				Configuration.transitions.default.duration
		);

		// this.pendingTransitions[t._id] = t;
		// t.on('end interrupt cancel', () => {
		// 	delete this.pendingTransitions[t._id];
		// });

		return t;
	}

	getTransitionSelection(
		configs: getTransitionSelectionConfigs = {}
	): Transition<any, any, any, any> {
		if (
			this.model.getOptions().animations === false ||
			configs.animate === false
		) {
			return this.getInstantTransition(configs.name);
		}
		// console.log('non-instant', configs);

		// this.pendingTransitions[t._id] = t;
		// t.on('end interrupt cancel', () => {
		// 	delete this.pendingTransitions[t._id];
		// });

		return configs.selection
			.transition()
			.duration(
				Tools.getProperty(
					Configuration.transitions,
					configs.name,
					'duration'
				) || Configuration.transitions.default.duration
			);
	}

	getInstantTransition(name?: string): Transition<any, any, any, any> {
		console.log('instant');
		const t: any = transition(name).duration(0);

		// this.pendingTransitions[t._id] = t;
		// t.on('end interrupt cancel', () => {
		// 	delete this.pendingTransitions[t._id];
		// });

		return t;
	}

	getTransitionDuration(name: string, animate: boolean): number {
		if (animate !== true) {
			return 0;
		}

		return (
			Tools.getProperty(Configuration.transitions, name, 'duration') ||
			Configuration.transitions.default.duration
		);
	}

	setupTransition({ transition: t, name, animate }: setupTransitionConfigs) {
		this.pendingTransitions[t._id] = t;
		t.on('end interrupt cancel', () => {
			delete this.pendingTransitions[t._id];
		});

		if (animate !== true) {
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
