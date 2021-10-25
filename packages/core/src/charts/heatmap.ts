// Internal Imports
import { HeatmapModel } from '../model/heatmap';
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, HeatmapChartOptions } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	Heatmap,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	ColorScaleLegend,
	LayoutComponent,
} from '../components/index';

export class HeatmapChart extends AxisChart {
	model = new HeatmapModel(this.services);

	constructor(
		holder: Element,
		chartConfigs: ChartConfig<HeatmapChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.heatmapChart,
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
			new Heatmap(this.model, this.services),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		return components;
	}
}
