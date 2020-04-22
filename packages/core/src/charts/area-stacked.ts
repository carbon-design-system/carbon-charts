// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import { ChartConfig, StackedAreaChartOptions } from "../interfaces/index";
import { Tools } from "../tools";

// Components
import { Grid, StackedArea, TwoDimensionalAxes, Line } from "../components/index";

export class StackedAreaChart extends AxisChart {
	constructor(
		holder: Element,
		chartConfigs: ChartConfig<StackedAreaChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.stackedAreaChart,
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
			new StackedArea(this.model, this.services),
			new Line(this.model, this.services, { stacked: true })
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		// TODO add tooltip
		// components.push(new TooltipArea(this.model, this.services));
		return components;
	}
}
