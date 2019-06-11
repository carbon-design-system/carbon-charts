// D3 Imports
import {
	event,
	mouse,
	select,
	selectAll
} from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import { transition, Transition } from "d3-transition";

// Internal Imports
import * as Configuration from "./configuration";
import { ChartConfig, BaseChartOptions, ChartData } from "./configuration";
import { Tools } from "./tools";
import PatternsService from "./services/patterns";
import { Overlay, ChartTooltip } from "./components/index";
import errorHandler from "./services/error-handling";

// Misc
import { ChartEssentials } from "./essentials";
import { DOMUtils } from "./dom-utils";
import { Axis } from "./components/Axis";
import { ChartModel } from "./model";
import { ChartComponent } from "./components/base-component";

export class Chart {
	static chartCount = 1;

	id = "";
	chartContainerID = "";

	// Chart element references
	container: any;
	svg: any;
	innerWrap: any;

	// Data
	data: ChartData;
	displayData: ChartData;
	fixedDataLabels;

	// Fill scales & fill related objects
	patternScale = {};
	colorScale = {};
	patternsService: PatternsService;

	// Event target
	events: any;
	eventHandlers = {
		tooltips: null
	};

	// Misc
	chartOverlay: Overlay;
	tooltip: ChartTooltip;

	essentials: ChartEssentials;

	components: Array<ChartComponent>;

	model: ChartModel;

	constructor(holder: Element, configs: ChartConfig<BaseChartOptions>) {
		// Put together the essential references of this chart for all components to use
		this.setupEssentials(holder, configs);

		this.setComponents();

		this.model = new ChartModel(configs.data);
		// Notify all components on data updates
		this.model.setCallback(() => {
			this.modelUpdated();
		});
	}

	setupEssentials(holder: Element, configs: ChartConfig<BaseChartOptions>) {
		this.essentials = new ChartEssentials(holder, configs);

		// Generate DOM utilies instance
		const domUtils = new DOMUtils(this.essentials.holder, this.essentials.options);

		// Save DOM utilities object reference to the chart essentials
		this.essentials.domUtils = domUtils;
	}

	setData(data: any) {
		return this.model.setData(data);
	}

	getComponents(): Array<ChartComponent> {
		errorHandler.INTERNAL.CHART.MISSING_METHOD("getComponents");

		return null;
	}

	modelUpdated() {
		this.components.forEach(component => {
			component.setModel(this.model);

			component.updateOrInitialize();
		});
	}

	setComponents() {
		const baseComponents = this.getComponents();
		// const componentsToRender = baseComponents.concat(this.getComponents());

		this.components = baseComponents;

		// componentsToRender.forEach(component => component.render());
	}
}
