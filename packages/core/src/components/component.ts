// Internal Imports
import { ChartModel } from "../model";
import errorHandler from "../services/error-handling";

// D3 Imports
import { select } from "d3-selection";

export class Component {
	public type: string;

	protected parent: any;

	protected options: any = {};

	protected model: ChartModel;
	protected services: any;

	constructor(model: ChartModel, services: any, options?: any) {
		this.model = model;
		this.services = services;
		this.options = options;

		// Set parent element to shell SVG if no parent exists for component
		if (!this.parent) {
			this.setParent(
				select(this.services.domUtils.getMainSVG())
			);
		}

		// Call init() asynchronously after constructor runs
		setTimeout(() => {
			this.init();
		});
	}

	init() {
	}

	render(animate = true) {
		errorHandler.INTERNAL.COMPONENT.MISSING_METHOD("render");
	}

	destroy() {
	}

	// Used to pass down information to the components
	setModel(newObj) {
		this.model = newObj;
	}

	// Used to pass down information to the components
	setServices(newObj) {
		this.services = newObj;
	}

	setParent(parent) {
		const oldParent = this.parent;
		this.parent = parent;

		if (this.type) {
			this.parent.classed(`cc-${this.type}`, true);

			if (oldParent) {
				oldParent.classed(`cc-${this.type}`, false);
			}
		}
	}

	getParent() {
		return this.parent;
	}

	getContainerSVG() {
		if (this.type) {
			return this.services.domUtils.appendOrSelect(this.parent, `g.cc-${this.type}`);
		}

		return this.parent;
	}
}
