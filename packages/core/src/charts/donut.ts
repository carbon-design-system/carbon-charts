// Internal Imports
import { PieChartModel } from "../model-pie";
import { PieChart } from "./index";
import { Donut } from "../components/index";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	PieChartOptions
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Pie,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent
} from "../components/index";

export class DonutChart extends PieChart {
	constructor(holder: Element, chartConfigs: ChartConfig<PieChartOptions>) {
		super(holder, chartConfigs);

		if (chartConfigs.options) {
			// Merge the default options for this chart
			// With the user provided options
			this.model.setOptions(
				Tools.merge(
					Tools.clone(Configuration.options.donutChart),
					chartConfigs.options
				)
			);
		}
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new Donut(this.model, this.services)
		];

		// Grab base chart components from AxisChart
		return this.getChartComponents(graphFrameComponents);
	}
}
