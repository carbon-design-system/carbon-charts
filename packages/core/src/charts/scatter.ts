// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, ScatterChartOptions } from '../interfaces/index';
import { Tools } from '../tools';
import { Skeletons } from '../interfaces/enums';

// Components
import {
	Grid,
	Ruler,
	Scatter,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	Skeleton,
} from '../components/index';

export class ScatterChart extends AxisChart {
	constructor(
		holder: Element,
		chartConfigs: ChartConfig<ScatterChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.scatterChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Ruler(this.model, this.services),
			new Scatter(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID,
			}),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		return components;
	}
}
