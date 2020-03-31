// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import { ChartConfig, AreaChartOptions } from "../interfaces/index";
import { Tools } from "../tools";

// Components
import { Grid, Area, TwoDimensionalAxes } from "../components/index";

export class AreaChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<AreaChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.areaChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Area(this.model, this.services)
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		// TODO add tooltip
		// components.push(new TooltipArea(this.model, this.services));
		return components;
	}
}
