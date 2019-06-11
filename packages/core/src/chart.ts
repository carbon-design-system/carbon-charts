// Internal Imports
import { ChartConfig, BaseChartOptions, ChartData } from "./interfaces/index";
import errorHandler from "./services/error-handling";

// Misc
import { ChartEssentials } from "./essentials";
import { DOMUtils } from "./dom-utils";
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

	// Event target
	// events: any;
	// eventHandlers = {
	// 	tooltips: null
	// };

	// Misc
	// chartOverlay: Overlay;
	// tooltip: ChartTooltip;

	essentials: ChartEssentials;

	components: Array<ChartComponent>;

	model: ChartModel;

	constructor(holder: Element, configs: ChartConfig<BaseChartOptions>) {
		// Put together the essential references of this chart for all components to use
		this.setupEssentials(holder, configs);

		this.setComponents();

		// Create a new model
		this.model = new ChartModel(configs.data);

		// Add the model to all components
		this.components.forEach(component => {
			component.setModel(this.model);
			component.setEssentials(this.essentials);
		});

		// Notify all components on data updates
		this.model.setUpdateCallback(this.modelUpdated.bind(this));
	}

	setupEssentials(holder: Element, configs: ChartConfig<BaseChartOptions>) {
		this.essentials = new ChartEssentials(holder, configs);

		// Generate DOM utilies instance
		const domUtils = new DOMUtils(this.essentials.holder, this.essentials.options);

		// Save DOM utilities object reference to the chart essentials
		this.essentials.domUtils = domUtils;
	}

	setData(data: ChartData) {
		return this.model.setData(data);
	}

	getComponents(): Array<ChartComponent> {
		errorHandler.INTERNAL.CHART.MISSING_METHOD("getComponents");

		return null;
	}

	modelUpdated() {
		this.components.forEach(component => {
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
