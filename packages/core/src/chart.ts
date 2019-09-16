// Internal Imports
import { ChartConfig, BaseChartOptions } from "./interfaces/index";
import errorHandler from "./services/error-handling";

// Misc
import { ChartModel } from "./model";
import { Component } from "./components/component";

// Services
import { DOMUtils, Events, Transitions } from "./services/index";

export class Chart {
	components: Array<Component>;
	model: ChartModel;
	protected services: any = {
		domUtils: DOMUtils,
		events: Events,
		transitions: Transitions
	};

	constructor(holder: Element, chartConfigs: ChartConfig<BaseChartOptions>) {
		// Create a new model
		this.model = new ChartModel();

		// Set model update callback
		this.model.setUpdateCallback(this.update.bind(this));

		this.model.set({ holder });

		// Set model data & options
		this.model.setDataAndOptions(chartConfigs.data, chartConfigs.options);

		setTimeout(() => {
			this.init();
		});
	}

	// Contains the code that uses properties that are overridable by the super-class
	init() {
		// Initialize all services
		Object.keys(this.services).forEach(serviceName => {
			const serviceObj = this.services[serviceName];
			this.services[serviceName] = new serviceObj(this.model, this.services);
		});

		// Generate all of the chart's components and store them
		this.components = this.getComponents();

		// Set chart resize event listener
		this.services.events
			.getDocumentFragment()
			.addEventListener("chart-resize", () => {
				this.update(false);
			});

		// Run this.update() after the init() method of components run
		setTimeout(() => {
			this.update();
		});
	}

	getComponents(): Array<any> {
		errorHandler.INTERNAL.CHART.MISSING_METHOD("getComponents");

		return null;
	}

	update(animate = true) {
		if (this.components) {
			console.log("UPDATE");

			this.components.forEach(component => {
				component.render(animate);

				console.log("RENDER", ++window["ccount"]);
			});

			setTimeout(() => {
				this.services.events.dispatchEvent("render-finished");
			});
		}
	}

	destroy() {
		this.components.forEach(component => {
			component.destroy();
		});

		this.services.domUtils.getHolder().remove();

		this.model.set({ destroyed: true }, true);
	}
}
