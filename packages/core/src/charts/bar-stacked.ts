// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	ScatterChartOptions
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Grid,
	StackedBar,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	TooltipBar
} from "../components/index";

export class StackedBarChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<ScatterChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.merge(
				Tools.clone(Configuration.options.stackedBarChart),
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
			new StackedBar(this.model, this.services)
		];

		const components: any[] = this.getAxisChartComponents(graphFrameComponents);
		components.push(new TooltipBar(this.model, this.services));
		return components;
	}
}
