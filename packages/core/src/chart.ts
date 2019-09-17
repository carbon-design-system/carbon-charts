// Internal Imports
import { ChartConfig, BaseChartOptions } from "./interfaces/index";

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
		console.error("getComponents() method is not implemented");

		return null;
	}

	update(animate = true) {
		if (this.components) {
			console.log("UPDATE");

			// Render all components
			this.components.forEach(component => {
				component.render(animate);

				console.log("RENDER", ++window["ccount"]);
			});

			// Asynchronously dispatch a "render-finished" event
			// This is needed because of d3-transitions
			// Since at the start of the transition
			// Elements do not hold their final size or position
			setTimeout(() => {
				this.services.events.dispatchEvent("render-finished");
			});
		}
	}

	destroy() {
		// Call the destroy() method on all components
		this.components.forEach(component => {
			component.destroy();
		});

		// Remove the chart holder
		this.services.domUtils.getHolder().remove();

		this.model.set({ destroyed: true }, true);
	}
}
