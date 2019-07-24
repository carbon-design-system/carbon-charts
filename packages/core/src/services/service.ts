import { ChartModel } from "../model";

export class Service {
	protected _model: ChartModel;
	protected _services: any;

	constructor(model: ChartModel, services: any) {
		this._model = model;
		this._services = services;

		this.init();
	}

	// Used to pass down information to the components
	setModel(newObj) {
		this._model = newObj;
	}

	// Used to pass down services to the components
	setServices(newObj) {
		this._services = newObj;
	}

	init() {

	}
}
