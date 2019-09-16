// Internal Imports
import { ChartModel } from "../model";
import errorHandler from "../services/error-handling";

// D3 Imports
import { select } from "d3-selection";

export class Component {
	public type: string;

	protected _parent: any;

	protected options: any = {};

	protected _model: ChartModel;
	protected _services: any;

	constructor(model: ChartModel, services: any, options?: any) {
		this._model = model;
		this._services = services;
		this.options = options;

		// Set parent element to shell SVG if no parent exists for component
		if (!this._parent) {
			this.setParent(
				select(this._services.domUtils.getMainSVG())
			);
		}

		// Call init() asynchronously after constructor runs
		setTimeout(() => {
			this.init();
		});
	}

	init() {
	}

	render() {
		errorHandler.INTERNAL.COMPONENT.MISSING_METHOD("render");
	}

	destroy() {
	}

	// Used to pass down information to the components
	setModel(newObj) {
		this._model = newObj;
	}

	// Used to pass down information to the components
	setServices(newObj) {
		this._services = newObj;
	}

	setParent(parent) {
		const oldParent = this._parent;
		this._parent = parent;

		if (this.type) {
			this._parent.classed(`cc-${this.type}`, true);

			if (oldParent) {
				oldParent.classed(`cc-${this.type}`, false);
			}
		}
	}

	getParent() {
		return this._parent;
	}

	getContainerSVG() {
		if (this.type) {
			return this._services.domUtils.appendOrSelect(this._parent, `g.cc-${this.type}`);
		}

		return this._parent;
	}
}
