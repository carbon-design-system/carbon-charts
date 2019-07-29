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

	private services: any = {
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

		// Put together the essential references of this chart for all components to use
		this.initializeServices();

		// Grab all of the chart's components and store them
		this.components = this.getComponents();

		// Add the model to all components
		this.components.forEach(component => {
			component.setServices(this.services);
			component.setModel(this.model);
		});

		this.update();

		this.services.events
			.getDocumentFragment()
			.addEventListener("chart-resize", () => {
				this.update(false);
			});
	}

	initializeServices() {
		Object.keys(this.services).forEach(serviceName => {
			const serviceObj = this.services[serviceName];

			this.services[serviceName] = new serviceObj(this.model, this.services);
		});
	}

	getComponents(): Array<Component> {
		errorHandler.INTERNAL.CHART.MISSING_METHOD("getComponents");

		return null;
	}

	update(animations = true) {
		if (this.components) {
			this.model.set({
				animations
			}, true);

			console.log("RE RENDER STUFF");
			this.components.forEach(component => {
				component.render();

				console.log("RENDER", ++window["ccount"]);
			});
		}
	}
}
