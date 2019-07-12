// Internal Imports
import { ChartConfig, BaseChartOptions, ChartData } from "./interfaces/index";
import errorHandler from "./services/error-handling";

// Misc
import { ChartEssentials } from "./essentials";
import { ChartModel } from "./model";
import { ChartComponent } from "./components/base-component";

export class Chart {
	components: Array<ChartComponent>;

	model: ChartModel;
	essentials: ChartEssentials;

	constructor(holder: Element, chartConfigs: ChartConfig<BaseChartOptions>) {
		// Create a new model
		this.model = new ChartModel(this.update.bind(this));

		// Put together the essential references of this chart for all components to use
		this.essentials = new ChartEssentials(holder, {});

		// Grab all of the chart's components and store them
		this.components = this.getComponents();

		// Add the model to all components
		this.components.forEach(component => {
			component.setEssentials(this.essentials);
			component.setModel(this.model);
		});

		// Set model data & options
		this.model.setDataAndOptions(chartConfigs.data, chartConfigs.options);
	}

	getComponents(): Array<ChartComponent> {
		errorHandler.INTERNAL.CHART.MISSING_METHOD("getComponents");

		return null;
	}

	update() {
		if (this.components) {
			this.components.forEach(component => {
				component.render();
			});
		}
	}
}
