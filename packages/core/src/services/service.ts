import { ChartModel } from '../model/model';

export class Service {
	protected model: ChartModel;
	protected services: any;

	constructor(model: ChartModel, services: any) {
		this.model = model;
		this.services = services;

		this.init();
	}

	init() {}

	update() {}

	// Used to pass down information to the components
	setModel(newObj) {
		this.model = newObj;
	}

	// Used to pass down services to the components
	setServices(newObj) {
		this.services = newObj;
	}
}
