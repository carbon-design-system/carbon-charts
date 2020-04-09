// Internal Imports
import { PieChart } from "./pie";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	GaugeChartOptions
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Gauge,
	// the imports below are needed because of typescript bug (error TS4029)
	Legend,
	LayoutComponent,
	Tooltip
} from "../components/index";

export class GaugeChart extends PieChart {
	constructor(holder: Element, chartConfigs: ChartConfig<GaugeChartOptions>) {
		super(holder, chartConfigs, true);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.gaugeChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new Gauge(this.model, this.services)
		];

		const components: any[] = this.getChartComponents(graphFrameComponents);
		components.push(new Tooltip(this.model, this.services));
		return components;
	}
}
