import type { ChartModel } from '@/model/model'
import type { Services } from '@/interfaces/services'

export class Service {
	protected model: ChartModel
	protected services: Services

	constructor(model: ChartModel, services: Services) {
		this.model = model
		this.services = services

		this.init()
	}

	init() {
		// do nothing.
	}

	update() {
		// do nothing.
	}

	// Used to pass down information to the components
	setModel(newObj: ChartModel) {
		this.model = newObj
	}

	// Used to pass down services to the components
	setServices(newObj: Services) {
		this.services = newObj
	}
}
