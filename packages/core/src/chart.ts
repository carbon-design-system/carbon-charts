// Internal Imports
import { ChartConfig, BaseChartOptions, LayoutGrowth, LayoutDirection, LegendOrientations, ChartTheme } from "./interfaces/index";

// Misc
import { ChartModel } from "./model";
import { Component, Title, Legend, LayoutComponent, Tooltip } from "./components";
import { Tools } from "./tools";

// Services
import { DOMUtils, Events, Transitions } from "./services/index";
import { select } from "d3-selection";

export class Chart {
	components: Array<Component>;
	model: ChartModel = new ChartModel();
	protected services: any = {
		domUtils: DOMUtils,
		events: Events,
		transitions: Transitions
	};

	constructor(holder: Element, chartConfigs: ChartConfig<BaseChartOptions>) {
		setTimeout(() => {
			this.init(holder, chartConfigs);
		});
	}

	// Contains the code that uses properties that are overridable by the super-class
	init(holder: Element, chartConfigs: ChartConfig<BaseChartOptions>) {
		// Set model update callback
		this.model.setUpdateCallback(this.update.bind(this));

		this.model.set({
			holder
		});

		// Set model data & options
		this.model.setData(chartConfigs.data);

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

		this.setTheme();
	}

	getComponents(): Array<any> {
		console.error("getComponents() method is not implemented");

		return null;
	}

	setTheme() {
		const theme = Tools.getProperty(this.model.getOptions(), "theme") ?
			Tools.getProperty(this.model.getOptions(), "theme") : ChartTheme.WHITE;
		const holder = select(this.model.get("holder"));

		holder.classed(`carbon--theme--${theme}`, true);
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


	protected getChartComponents(graphFrameComponents: Array<any>) {
		const titleComponent = {
			id: "title",
			components: [
				new Title(this.model, this.services)
			],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const legendComponent = {
			id: "legend",
			components: [
				new Legend(this.model, this.services)
			],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const graphFrameComponent = {
			id: "graph-frame",
			components: graphFrameComponents,
			growth: {
				x: LayoutGrowth.STRETCH,
				y: LayoutGrowth.FIXED
			}
		};

		// TODORF - REUSE BETWEEN AXISCHART & CHART
		// Decide the position of the legend in reference to the chart
		let fullFrameComponentDirection = LayoutDirection.COLUMN;
		const legendPosition = Tools.getProperty(this.model.getOptions(), "legend", "position");
		if (legendPosition === "left") {
			fullFrameComponentDirection = LayoutDirection.ROW;

			if (!this.model.getOptions().legend.orientation) {
				this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL;
			}
		} else if (legendPosition === "right") {
			fullFrameComponentDirection = LayoutDirection.ROW_REVERSE;

			if (!this.model.getOptions().legend.orientation) {
				this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL;
			}
		} else if (legendPosition === "bottom") {
			fullFrameComponentDirection = LayoutDirection.COLUMN_REVERSE;
		}

		const fullFrameComponent = {
			id: "full-frame",
			components: [
				new LayoutComponent(
					this.model,
					this.services,
					[
						legendComponent,
						graphFrameComponent
					],
					{
						direction: fullFrameComponentDirection
					}
				)
			],
			growth: {
				x: LayoutGrowth.STRETCH,
				y: LayoutGrowth.FIXED
			}
		};

		// Add chart title if it exists
		const topLevelLayoutComponents = [];
		if (this.model.getOptions().title) {
			topLevelLayoutComponents.push(titleComponent);
		}
		topLevelLayoutComponents.push(fullFrameComponent);

		return [
			new LayoutComponent(
				this.model,
				this.services,
				topLevelLayoutComponents,
				{
					direction: LayoutDirection.COLUMN
				}
			)
		];
	}
}
