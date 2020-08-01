// Internal Imports
import { ZoomableChart } from "../zoomable-chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	NetworkChartOptions
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import { Network } from "../components";

export class NetworkChart extends ZoomableChart {
	constructor(holder: Element, chartConfigs: ChartConfig<NetworkChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.merge(
				Tools.clone(Configuration.options.networkChart),
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		const graphFrameComponents = [
			new Network(this.model, this.services)
		];

		const components: any[] = this.getChartComponents(graphFrameComponents);
		return components;
	}
}
