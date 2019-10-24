// Internal Imports
import { PieChart } from "./pie";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	PieChartOptions
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Donut,
	// the imports below are needed because of typescript bug (error TS4029)
	Legend,
	LayoutComponent,
	Tooltip
} from "../components/index";

export class DonutChart extends PieChart {
	constructor(holder: Element, chartConfigs: ChartConfig<PieChartOptions>) {
		super(holder, chartConfigs, true);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.merge(
				Tools.clone(Configuration.options.donutChart),
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new Donut(this.model, this.services)
		];

		const components: any[] = this.getChartComponents(graphFrameComponents);
		components.push(new Tooltip(this.model, this.services));
		return components;
	}
}
