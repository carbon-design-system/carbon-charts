// Internal Imports
import { ChartModel } from "../model";
import { DOMUtils } from "../services";
import { Tools } from "../tools";

// D3 Imports
import { select } from "d3-selection";

// import the settings for the css prefix
import settings from "carbon-components/src/globals/js/settings";


export class Component {
	public type: string;

	protected parent: any;

	protected configs: any = {};

	protected model: ChartModel;
	protected services: any;

	constructor(model: ChartModel, services: any, configs?: any) {
		this.model = model;
		this.services = services;

		if (configs) {
			this.configs = configs;
		}

		// Set parent element to shell SVG if no parent exists for component
		if (!this.parent) {
			this.setParent(
				select(this.services.domUtils.getMainSVG())
			);
		}
	}

	init() {
	}

	render(animate = true) {
		console.error("render() method is not implemented");
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

		if (oldParent && oldParent.node() === parent.node()) {
			return;
		}

		if (this.type) {
			const chartprefix = Tools.getProperty(this.model.getOptions(), "style", "prefix");
			this.parent.classed(`${settings.prefix}--${chartprefix}--${this.type}`, true);

			if (oldParent) {
				oldParent.classed(`${settings.prefix}--${chartprefix}--${this.type}`, false);
			}
		}
	}

	getParent() {
		return this.parent;
	}

	getContainerSVG() {
		if (this.type) {
			const chartprefix = Tools.getProperty(this.model.getOptions(), "style", "prefix");
			return DOMUtils.appendOrSelect(this.parent, `g.${settings.prefix}--${chartprefix}--${this.type}`);
		}

		return this.parent;
	}
}
