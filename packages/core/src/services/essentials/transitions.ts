import { getProperty } from '@/tools'
import { transitions } from '@/configuration'
import { Service } from '@/services/service'
import { Events } from '@/interfaces/enums'
import type { Transition } from 'd3'

export interface setupTransitionConfigs {
	transition?: any // d3 types are causing issues here, hence why using `any`
	name?: string
	animate?: boolean
}

export class Transitions extends Service {
	pendingTransitions: Record<number, Transition<any, any, any, any>> = {}

	init() {
		this.services.events?.addEventListener(Events.Model.UPDATE, () => {
			this.pendingTransitions = {}
		})
	}

	setupTransition({ transition: t, name, animate }: setupTransitionConfigs) {
		this.pendingTransitions[t._id] = t
		t.on('end interrupt cancel', () => {
			delete this.pendingTransitions[t._id]
		})

		if (this.model.getOptions().animations === false || animate === false) {
			return t.duration(0)
		}

		return t.duration(getProperty(transitions, name, 'duration') || transitions.default.duration)
	}

	getPendingTransitions() {
		return this.pendingTransitions
	}
}
